/**
 * - `node tools/applyReports.ts <file> [--write]` · a regression's re-ports, by row
 * - each row found once in its ticket's entry of the tickets' or the edges' part
 * - dry by default: every row is checked, and nothing written until all pass
 */
import fs from 'node:fs';
import ts from 'typescript';
import { entryOfPart, filesOf, sourceOf } from './layout.ts';

interface Row {
  readonly ticket: string;
  readonly file: string;
  readonly where: string;
  readonly cause: string;
  readonly find: string;
  readonly replace: string;
}

interface Reports {
  readonly from?: string;
  readonly causes?: Readonly<Record<string, string>>;
  readonly rows: readonly Row[];
}

interface Entry {
  readonly file: string;
  readonly start: number;
  readonly end: number;
}

const FOLDERS: Readonly<Record<string, string | undefined>> = {
  'tickets.js': 'tickets.ts',
  'edges.js': 'edges.ts',
};

// a written row opens with its id; an edge list with its key; each ends where the next begins
function entryIn(
  text: string,
  { ticket, file }: Row,
): readonly [number, number] | null {
  const open =
    file === 'edges.js' ? `\n  '${ticket}': [` : `\n  ["${ticket}", `;
  const start = text.indexOf(open);
  if (start < 0) return null;
  const close = file === 'edges.js' ? '\n  ],' : '\n  ],\n';
  const end = text.indexOf(close, start + open.length);
  return end < 0 ? null : [start, end];
}

function entryOf(row: Row, texts: Map<string, string>): Entry | null {
  const published = FOLDERS[row.file];
  const entry = published ? sourceOf(published) : null;
  if (!entry) return null;
  for (const file of filesOf().filter((one) => entryOfPart(one) === entry)) {
    const text = texts.get(file) ?? fs.readFileSync(file, 'utf8');
    const span = entryIn(text, row);
    if (span) return { file, start: span[0], end: span[1] };
  }
  return null;
}

// the sheet holds its strings JSON-quoted, so a row's words are quoted the same way
const quoted = (words: string): string => JSON.stringify(words).slice(1, -1);

function applyRow(row: Row, texts: Map<string, string>): string | null {
  if (!FOLDERS[row.file]) return `file ${row.file} is not the sheet’s`;
  if (!row.find || typeof row.replace !== 'string')
    return 'find or replace missing';
  const entry = entryOf(row, texts);
  if (!entry) return `no entry for ${row.ticket} in ${row.file}`;
  const text = texts.get(entry.file) ?? fs.readFileSync(entry.file, 'utf8');
  const body = text.slice(entry.start, entry.end);
  const count = body.split(quoted(row.find)).length - 1;
  if (count !== 1)
    return `find occurs ${count} times in its entry: “${row.find.slice(0, 90)}”`;
  const next = body.split(quoted(row.find)).join(quoted(row.replace));
  texts.set(
    entry.file,
    text.slice(0, entry.start) + next + text.slice(entry.end),
  );
  return null;
}

function parses(file: string, text: string): boolean {
  const { diagnostics } = ts.transpileModule(text, {
    fileName: file,
    reportDiagnostics: true,
  });
  return !diagnostics?.length;
}

function refusedOf(
  reports: Reports,
  texts: Map<string, string>,
): readonly string[] {
  return reports.rows.flatMap((row, at) => {
    const tag = `#${at + 1} ${row.ticket} · ${row.where} · ${row.cause}`;
    const cause =
      reports.causes && !reports.causes[row.cause]
        ? [`${tag} · cause ${row.cause} is not in causes`]
        : [];
    const why = applyRow(row, texts);
    return [...cause, ...(why ? [`${tag} · ${why}`] : [])];
  });
}

function main(): void {
  const [file, flag] = process.argv.slice(2);
  if (!file)
    throw new Error(
      'usage: node tools/applyReports.ts <re-ports.json> [--write]',
    );
  const reports: Reports = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!reports.rows?.length) throw new Error(`re-ports · no rows in ${file}`);
  const texts = new Map<string, string>();
  const refused = refusedOf(reports, texts);
  if (refused.length)
    throw new Error(
      `re-ports · ${refused.length} of ${reports.rows.length} rows refused, nothing written:\n${refused.join('\n')}`,
    );
  console.log(
    `re-ports · ${reports.from ?? '?'} · ${reports.rows.length} rows · ${written(texts, flag === '--write')}`,
  );
}

// every file still parses before any is written
function written(texts: ReadonlyMap<string, string>, write: boolean): string {
  for (const [name, text] of texts)
    if (!parses(name, text))
      throw new Error(`re-ports · ${name} no longer parses, nothing written`);
  if (!write) return 'checked, nothing written';
  for (const [name, text] of texts) fs.writeFileSync(name, text);
  return `applied to ${[...texts.keys()].join(', ')}`;
}

main();
