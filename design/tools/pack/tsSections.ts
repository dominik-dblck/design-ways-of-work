/**
 * - `tsSection` · the block a name asks for in a TS source: a declaration,
 * - a term, a key's rows, a table's entry, a row by its id, preferring the epic's
 * - `Section`, `MAX_LINES` · a cut of a file's lines, at most 160
 */
import { blockEnd, declarationAt, keyRowsAt, rowStart } from './tsBlocks.ts';

interface Section {
  readonly from: number;
  readonly to: number;
  readonly text: string;
  readonly exact?: boolean;
  readonly pointer?: boolean;
}

interface Asked {
  readonly want: string;
  readonly epic: string | null;
}

const MAX_LINES = 160;

const escaped = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// the lines from start through its block's end, at most max of them
function sliceOf(
  lines: readonly string[],
  { start, max }: { readonly start: number; readonly max: number },
): Section {
  const end = Math.min(blockEnd(lines, start), start + max - 1);
  return {
    from: start + 1,
    to: end + 1,
    text: lines.slice(start, end + 1).join('\n'),
    exact: true,
  };
}

// a function or a table named by its own name is that block, never a line that says the word
function byName(lines: readonly string[], want: string): Section | null {
  if (!/^[A-Za-z_]\w*$/.test(want)) return null;
  const at = declarationAt(lines, want);
  return at < 0 ? null : sliceOf(lines, { start: at, max: MAX_LINES });
}

// a glossary term is its row
function byTerm(lines: readonly string[], want: string): Section | null {
  const term = `term: '${want.toLowerCase()}'`;
  const at = lines.findIndex((line) => line.toLowerCase().includes(term));
  if (at < 0) return null;
  return sliceOf(lines, { start: rowStart(lines, at), max: MAX_LINES });
}

// a key's family (field.*) is each of its rows, forty lines at most each
function byWildcard(lines: readonly string[], want: string): Section | null {
  const wild = /^([a-z_]+)\.\*/.exec(want)?.[1];
  if (wild === undefined) return null;
  const starts = keyRowsAt(lines, new RegExp(`${wild}\\.`));
  const first = starts[0];
  if (first === undefined) return null;
  const cuts = starts.map((start) => sliceOf(lines, { start, max: 40 }).text);
  return {
    from: first + 1,
    to: (starts.at(-1) ?? first) + 1,
    text: cuts.join('\n'),
    exact: true,
  };
}

function byKey(lines: readonly string[], want: string): Section | null {
  const key = /^[a-z]+\.[a-z_]+/.exec(want)?.[0];
  if (key === undefined) return null;
  const at = keyRowsAt(lines, new RegExp(`${escaped(key)}'`))[0];
  return at === undefined
    ? null
    : sliceOf(lines, { start: at, max: MAX_LINES });
}

// a table's entry: TABLE key
function byEntry(lines: readonly string[], want: string): Section | null {
  const named = /^([A-Z_]{3,})\s+([\w-]+)$/.exec(want);
  if (!named) return null;
  const table = declarationAt(lines, String(named[1]));
  const entry = new RegExp(`^\\s*'?${escaped(String(named[2]))}'?:`);
  const at = lines.findIndex(
    (line, index) => index > table && entry.test(line),
  );
  if (table < 0 || at < 0) return null;
  return sliceOf(lines, { start: at, max: MAX_LINES });
}

// a row found by its own id, the epic's when two epics number theirs alike
function byId(lines: readonly string[], { want, epic }: Asked): Section | null {
  const id = want.split(/[\s·,(—]+/).find(Boolean) ?? '';
  const held = new RegExp(`\\bid: '${escaped(id)}'`);
  const found = lines.flatMap((line, at) => (held.test(line) ? [at] : []));
  const mine = found.find(
    (at) => epic !== null && String(lines[at]).includes(`epic: '${epic}'`),
  );
  const at = mine ?? found[0];
  if (at === undefined) return null;
  return sliceOf(lines, { start: rowStart(lines, at), max: MAX_LINES });
}

function tsSection(
  text: string,
  { want, epic, glossary }: Asked & { readonly glossary: boolean },
): Section | null {
  const lines = text.split('\n');
  return (
    byName(lines, want) ??
    (glossary ? byTerm(lines, want) : null) ??
    byWildcard(lines, want) ??
    byKey(lines, want) ??
    byEntry(lines, want) ??
    byId(lines, { want, epic })
  );
}

export { MAX_LINES, tsSection };
export type { Asked, Section };
