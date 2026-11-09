/**
 * - `blockEnd` · the last line of the statement or the row a line opens
 * - `rowStart`, `declarationAt`, `keyRowsAt` · where a row opens, a name is declared
 */
const QUOTES = `'"\``;
const OPENERS = '{[(';
const CLOSERS = '}])';
const CLOSES = /^[}\])]/;
const STILL_OPEN = /(?:[{[(=]|=>)$/;

const indentOf = (line: string): number =>
  line.length - line.trimStart().length;

// the index of the quote that closes the string opened at from
function stringEnd(line: string, from: number): number {
  const quote = line[from];
  for (let at = from + 1; at < line.length; at += 1) {
    if (line[at] === '\\') at += 1;
    else if (line[at] === quote) return at;
  }
  return line.length;
}

// a line's brackets, its strings and its trailing comment aside
function depthOf(line: string): number {
  let depth = 0;
  let at = 0;
  while (at < line.length) {
    const char = line[at] ?? '';
    if (char === '/' && line[at + 1] === '/') break;
    if (QUOTES.includes(char)) at = stringEnd(line, at);
    else
      depth += Number(OPENERS.includes(char)) - Number(CLOSERS.includes(char));
    at += 1;
  }
  return depth;
}

// a closing line at the opener's indent ends it, unless it opens again (a signature's return type)
function blockEnd(lines: readonly string[], start: number): number {
  const first = String(lines[start]).trim();
  if (depthOf(first) <= 0 && !STILL_OPEN.test(first)) return start;
  const indent = indentOf(String(lines[start]));
  let last = start;
  for (let at = start + 1; at < lines.length; at += 1) {
    const line = String(lines[at]);
    const isOuter = line.trim() !== '' && indentOf(line) <= indent;
    if (isOuter && !CLOSES.test(line.trim())) return last;
    if (line.trim()) last = at;
    if (isOuter && !STILL_OPEN.test(line.trim())) return at;
  }
  return last;
}

// a row opens on its own line or on the bracket just above it
function rowStart(lines: readonly string[], at: number): number {
  if (/^[{[]/.test((lines[at] ?? '').trim())) return at;
  const above = (lines[at - 1] ?? '').trim();
  return above === '{' || above === '[' ? at - 1 : at;
}

// a function, a constant or a type declared under its own name, a top-level one first
function declarationAt(lines: readonly string[], name: string): number {
  const declared = (indent: string): RegExp =>
    new RegExp(
      `^${indent}(?:export\\s+)?(?:async\\s+)?(?:function\\s*\\*?\\s*${name}\\s*[<(]|(?:const|let|var)\\s+${name}\\s*[:=]|(?:interface|type)\\s+${name}\\b)`,
    );
  const top = declared('');
  const any = declared('\\s*');
  const at = lines.findIndex((line) => top.test(line));
  return at >= 0 ? at : lines.findIndex((line) => any.test(line));
}

// the rows a key opens: ['key', … on one line, or the key alone under its bracket
function keyRowsAt(lines: readonly string[], key: RegExp): readonly number[] {
  const inline = new RegExp(`^\\s*\\['${key.source}`);
  const alone = new RegExp(`^\\s*'${key.source}`);
  return lines.flatMap((line, at) => {
    if (inline.test(line)) return [at];
    const isUnder = (lines[at - 1] ?? '').trim() === '[';
    return alone.test(line) && isUnder ? [at - 1] : [];
  });
}

export { blockEnd, declarationAt, keyRowsAt, rowStart };
