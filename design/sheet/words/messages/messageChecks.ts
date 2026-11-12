/**
 * - `check`, `lineFindings` · fills are data, a screen's too; no banned word
 * - `repeats`, `counts` · situations that read alike, and the tables' sizes
 */
import { cells } from './messageCells.ts';
import type { MessageCell } from './messageCells.ts';
import {
  FILLS,
  OUTCOME,
  READERS,
  SCREEN,
  excusesWord,
  VALIDATOR,
  WORD_FORMS,
} from './messageRows.ts';
import { REFUSAL } from './refusals.ts';
import { ROWS } from './situations.ts';
import { HINT } from './words.ts';
import * as GLOSSARY from '../glossary.ts';

const where = (cell: MessageCell): string =>
  `${cell.table} · ${cell.situation} ${cell.reader}`;

// a word and its forms: signatures, taken back
function wordRe(word: string): RegExp {
  const escaped = (text: string): string =>
    text.replace(/[.*+?^{}$()|[\]\\]/g, '\\$&');
  const words = word.split(' ');
  const last = `${escaped(words.pop() ?? '')}(s|es|d|ed|n)?`;
  const head = words.map((part) => WORD_FORMS.get(part) ?? escaped(part));
  return new RegExp(`\\b${[...head, last].join(' ')}\\b`, 'i');
}

const fillFindings = (lines: readonly MessageCell[]): string[] =>
  lines.flatMap((cell) =>
    (String(cell.line).match(/\{(\w+)\}/g) ?? [])
      .filter((found) => !FILLS.includes(found.slice(1, -1)))
      .map((found) => `${where(cell)} · fill ${found} is not data`),
  );

// a screen's lines, a plural's and a keyed line's forms each by its key
function screenLines(): readonly {
  readonly key: string;
  readonly line: string;
}[] {
  const lines: { key: string; line: string }[] = [];
  const walk = (key: string, node: unknown): void => {
    if (typeof node === 'string') lines.push({ key, line: node });
    else if (node && typeof node === 'object')
      for (const [inner, next] of Object.entries(node))
        walk(`${key}.${inner}`, next);
  };
  for (const [key, words] of Object.entries(SCREEN)) walk(key, words);
  return lines;
}

const screenFillFindings = (): string[] =>
  screenLines().flatMap(({ key, line }) =>
    (line.match(/\{(\w+)\}/g) ?? [])
      .filter((found) => !FILLS.includes(found.slice(1, -1)))
      .map((found) => `screen ${key} · fill ${found} is not data`),
  );

// the vocabulary half: each word a screen row bans, outside its exceptions
function wordFindings(lines: readonly MessageCell[]): string[] {
  const rows = GLOSSARY.uiRows();
  return rows.flatMap((row) =>
    row.not
      .filter((word) => word.charAt(0) !== '{')
      .flatMap((word) => {
        const pattern = wordRe(word);
        return lines
          .filter((cell) => {
            const line = String(cell.line);
            return (
              pattern.test(line.replace(/\{\w+\}/g, '·')) &&
              !(row.except ?? []).some((except) => line.includes(except)) &&
              !excusesWord(word, line)
            );
          })
          .map((cell) => `${where(cell)} · “${word}” (${row.term})`);
      }),
  );
}

// every fill is data and no line says a banned word · messagesContent.ts runs it over each type's lines
const lineFindings = (lines: readonly MessageCell[]): string[] => [
  ...fillFindings(lines),
  ...wordFindings(lines),
];

// empty when every rule of the tables holds
function check(): string[] {
  const lines = cells().filter((cell) => cell.line);
  const rowFindings = ROWS.flatMap((row) => [
    ...(row[0] in HINT ? [] : [`${row[0]} · no hint cell`]),
    ...(row.length === 3 + READERS.length
      ? []
      : [`${row[0]} · ${row.length} cells, not ${3 + READERS.length}`]),
    ...(row[2] ? [] : [`${row[0]} · no State`]),
  ]);
  return [...rowFindings, ...lineFindings(lines), ...screenFillFindings()];
}

// never a failure: two situations that read alike in every cell are probably one
function repeats(): string[] {
  const seen = new Map<string, string>();
  return ROWS.flatMap((row) => {
    const key = JSON.stringify(row.slice(2));
    const first = seen.get(key);
    if (first !== undefined) return [`${row[0]} reads as ${first}`];
    seen.set(key, row[0]);
    return [];
  });
}

function counts(): Readonly<Record<string, number>> {
  const all = cells();
  return {
    validators: Object.keys(VALIDATOR).length,
    situations: ROWS.length,
    cells: all.length,
    nulls: all.filter((cell) => cell.line == null).length,
    outcomes: Object.keys(OUTCOME).length,
    refusals: Object.keys(REFUSAL).length,
  };
}

export { check, counts, lineFindings, repeats };
