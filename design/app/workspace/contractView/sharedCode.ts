/**
 * - `sharedLines` · what every endpoint uses, bare or with notes: aliases, refusals
 * - `aliasNames` · the names the model's aliases give, in their order
 */
import { modelTypes } from '../../../sheet/contract/blockModel.ts';
import { refusalRows } from '../../../sheet/contract/refusals.ts';
import { docLines } from './codeLines.ts';
import { piecesOf } from './codeTokens.ts';
import { CONTRACT_WORDS } from './contractWords.ts';
import type { CodeLine } from './contractTypes.ts';

const WIDTH = 88;
const A_COMMENT = /\s\/\//;

// a type and the comment that trails it: `type Seq = number   // integer ≥ 0`
function trailingOf(line: string): readonly [string, string] {
  const at = line.search(A_COMMENT);
  if (!line.startsWith('type ') || at < 0) return ['', ''];
  return [line.slice(0, at).trimEnd(), line.slice(at + 3).trimStart()];
}

// an alias's trailing comment goes above it, wrapped, so no line runs off the page; bare, none
function aliasLines(src: string, notes: boolean): readonly string[] {
  return src.split('\n').flatMap((line) => {
    const [type, note] = trailingOf(line);
    if (type && note) return notes ? [...docLines(note, ''), type] : [type];
    return notes || !line.startsWith('//') ? [line] : [];
  });
}

// the keys as one union, as many on a line as fit
function unionLines(name: string, keys: readonly string[]): readonly string[] {
  const lines: string[] = [];
  let line = ' ';
  for (const key of keys.map((one) => ` | '${one}'`)) {
    if (line.length + key.length > WIDTH) {
      lines.push(line);
      line = ' ';
    }
    line += key;
  }
  return [`type ${name} =`, ...lines, line];
}

const ALIAS = /^type (\w+)/;

// the model's aliases as written, one entry a line or a block
function aliasSource(): readonly string[] {
  const aliases = modelTypes.find((type) => type.name === 'Aliases')?.src;
  return typeof aliases === 'string' ? [aliases] : (aliases ?? []);
}

const aliasNames = (): readonly string[] =>
  aliasSource()
    .flatMap((one) => one.split('\n'))
    .flatMap((line) => ALIAS.exec(line)?.[1] ?? []);

function sharedLines(notes: boolean): readonly CodeLine[] {
  const src = aliasSource();
  const words = CONTRACT_WORDS.shared;
  return [
    words.aliases,
    ...src.flatMap((one) => aliasLines(one, notes)),
    '',
    words.refusals,
    ...unionLines(
      'RefusalKey',
      refusalRows().map((row) => row.key),
    ),
  ].map(piecesOf);
}

export { aliasNames, sharedLines };
