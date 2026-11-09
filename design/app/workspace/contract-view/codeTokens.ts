/**
 * - `piecesOf`, `ROUTE_LINE` · a code line in coloured pieces; a route's mark
 * - `shapeLines` · a one-line type, `{ a: A; b: B }`, laid out one key a line
 */
import type { CodeLine, CodeToken, TokenKind } from './contractTypes.ts';

// a route line starts with this mark: its method and its path set bold
const ROUTE_LINE = '§';

// a drafted type sits in ⟦…⟧ and is cut like any other code, each piece marked a draft
const PIECE =
  /((?<!⟦)⟦[^⟧]*⟧)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\/\/.*|\/\*\*.*|^\s*\*.*)|\b(type|const|as|true|false|null|number|string|boolean|unknown|never|extends|in)\b|\b(ToType)\b|\b([A-Z][A-Za-z0-9]*)\b|(\b\d+\b)|([^'"⟦/A-Za-z0-9]+|[a-z_][A-Za-z0-9_]*|\/)/g;

// the group a piece matched after the draft's, in the order the pattern lists them
const KINDS: readonly TokenKind[] = [
  'str',
  'com',
  'kw',
  'warn',
  'type',
  'num',
  'txt',
];

const token = (text: string, kind: TokenKind): CodeToken => ({
  text,
  kind,
  strong: kind === 'warn',
  draft: false,
});

function piecesOf(line: string): CodeLine {
  if (line.startsWith(ROUTE_LINE)) {
    const [method = '', ...path] = line.slice(1).split(' ');
    return [
      { text: `${method} `, kind: 'kw', strong: true, draft: false },
      { text: path.join(' '), kind: 'txt', strong: true, draft: false },
    ];
  }
  return [...line.matchAll(PIECE)].flatMap((found): CodeLine => {
    const [whole, drafted] = found;
    if (drafted !== undefined)
      return piecesOf(drafted.slice(1, -1)).map((piece) => ({
        ...piece,
        draft: true,
      }));
    const at = found.slice(2).findIndex((group) => group !== undefined);
    return [token(whole, KINDS[at] ?? 'txt')];
  });
}

interface Layout {
  readonly out: readonly string[];
  readonly depth: number;
  readonly line: string;
  readonly skip: boolean;
}

interface Around {
  readonly char: string;
  readonly next: string;
  readonly last: string;
  readonly pad: string;
}

// one character of the shape: a brace opens or closes a level, a semicolon ends a key
function step(at: Layout, { char, next, last, pad }: Around): Layout {
  if (at.skip && char === ' ') return at;
  const indent = (depth: number): string => pad + '  '.repeat(depth);
  if (char === '{' && next !== '}')
    return {
      out: [...at.out, `${at.line}{`],
      depth: at.depth + 1,
      line: indent(at.depth + 1),
      skip: true,
    };
  if (char === '}' && last !== '{')
    return {
      out: at.line.trim() ? [...at.out, at.line.trimEnd()] : at.out,
      depth: at.depth - 1,
      line: `${indent(at.depth - 1)}}`,
      skip: false,
    };
  if (char === ';' && at.depth > 0)
    return {
      out: [...at.out, `${at.line};`],
      depth: at.depth,
      line: indent(at.depth),
      skip: true,
    };
  return { ...at, line: at.line + char, skip: false };
}

function shapeLines(shape: string, pad: string): readonly string[] {
  const chars = [...shape];
  const start: Layout = { out: [], depth: 0, line: pad, skip: false };
  const end = chars.reduce(
    (at, char, index) =>
      step(at, {
        char,
        next: chars[index + 1] ?? '',
        last: chars[index - 1] ?? '',
        pad,
      }),
    start,
  );
  return end.line.trim() ? [...end.out, end.line] : end.out;
}

export { ROUTE_LINE, piecesOf, shapeLines };
