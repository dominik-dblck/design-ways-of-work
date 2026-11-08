/**
 * - `node scripts/move-declarations.ts <map.tsv> [root]` · a file's parts moved out
 * - a row: a file, a name it declares, its new file, the new file's header bullet
 * - the imports a part reads follow it; its source imports it back where it reads it
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import {
  boundIn,
  declaredName,
  namesReadIn,
  statementOf,
} from './declarations.ts';
import {
  importLines,
  importPathOf,
  needsOf,
  targetText,
} from './moved-text.ts';
import type { Row } from './moved-text.ts';
import { mapRows } from './mapRows.ts';
import { HERE, repoAt } from './repos.ts';

interface Edit {
  readonly start: number;
  readonly end: number;
  readonly text: string;
}

const MAP = repoAt('', 0);
const ROOT = repoAt(HERE, 1);

const rows: readonly Row[] = mapRows(MAP).map(
  ([file = '', name = '', target = '', bullet = '']) => ({
    file,
    name,
    target,
    bullet,
  }),
);

const syntaxOf = (file: string): ts.SourceFile =>
  ts.createSourceFile(
    file,
    fs.readFileSync(path.join(ROOT, file), 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );

// one source's new files, refused when a part reads a name that stays
function newFiles(
  file: string,
  own: readonly Row[],
): readonly (readonly [string, string])[] {
  const syntax = syntaxOf(file);
  const parts = own.map((row) => [row, statementOf(syntax, row)] as const);
  const movedTo = new Map(own.map((row) => [row.name, row.target]));
  const stays = new Set(
    syntax.statements
      .filter((one) => !parts.some(([, part]) => part === one))
      .map(declaredName)
      .filter((name) => name !== null),
  );
  return [...new Set(own.map((row) => row.target))].map((target) => {
    const group = parts.filter(([row]) => row.target === target);
    const reads = new Set(group.flatMap(([, one]) => [...namesReadIn(one)]));
    const staying = [...reads].filter((name) => stays.has(name));
    if (staying.length > 0)
      throw new Error(`${file} · ${target} reads ${staying.join(', ')}`);
    const needs = needsOf({
      file,
      target,
      reads,
      bounds: boundIn(syntax.statements),
      movedTo,
    });
    return [target, targetText({ syntax, parts: group, needs })] as const;
  });
}

// the source without its parts: its imports pruned to what stays, the parts imported back
function sourceText(file: string, own: readonly Row[]): string {
  const syntax = syntaxOf(file);
  const moved = own.map((row) => statementOf(syntax, row));
  const staying = syntax.statements.filter(
    (one) => !moved.includes(one) && !ts.isImportDeclaration(one),
  );
  const reads = new Set(staying.flatMap((one) => [...namesReadIn(one)]));
  const imports = syntax.statements.filter(ts.isImportDeclaration);
  const back = own
    .filter((row) => reads.has(row.name))
    .map((row) => ({
      local: row.name,
      module: importPathOf(file, row.target),
      imported: row.name,
      isTypeOnly: false,
    }));
  const edits: readonly Edit[] = [
    ...imports.map((one, at) => {
      const text = importLines([
        ...boundIn([one]).filter((bound) => reads.has(bound.local)),
        ...(at === imports.length - 1 ? back : []),
      ]);
      // an import with nothing left goes with its line
      const end = one.getEnd() + (text === '' ? 1 : 0);
      return { start: one.getStart(syntax), end, text };
    }),
    ...moved.map((one) => ({
      start: one.getFullStart(),
      end: one.getEnd(),
      text: '',
    })),
  ];
  return [...edits]
    .sort((one, other) => other.start - one.start)
    .reduce(
      (text, edit) =>
        `${text.slice(0, edit.start)}${edit.text}${text.slice(edit.end)}`,
      syntax.text,
    );
}

const sources = [...new Set(rows.map((row) => row.file))];
const written = sources.flatMap((file) => {
  const own = rows.filter((row) => row.file === file);
  const files = newFiles(file, own);
  for (const [target] of files)
    if (fs.existsSync(path.join(ROOT, target)))
      throw new Error(`${target} exists: a part moves to a new file`);
  return [[file, sourceText(file, own)] as const, ...files];
});
for (const [file, text] of written) {
  fs.mkdirSync(path.dirname(path.join(ROOT, file)), { recursive: true });
  // a source is written in place, so a link to it keeps its file
  fs.writeFileSync(path.join(ROOT, file), text);
  console.log(file);
}
console.log(`${rows.length} parts moved, ${written.length} files written`);
