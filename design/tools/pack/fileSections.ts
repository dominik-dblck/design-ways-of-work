/**
 * - `sectionOf` · the section a term names in one source: a model entry of a
 * - JSON, a TS block, a page's screen, else the heading that says the words
 */
import type { Source } from './packSources.ts';
import { MAX_LINES, tsSection } from './tsSections.ts';
import type { Asked, TsSection } from './tsSections.ts';

// a model entry by its "name", the one that carries "src" (the type) over a level row
function jsonSection(lines: readonly string[], want: string): TsSection | null {
  const name = (want.split(/[\s·,(—]+/).find(Boolean) ?? '').toLowerCase();
  const named = /^(\s*)"(?:name|id)":\s*"([^"]+)"/;
  const hits = lines.flatMap((line, at) =>
    named.exec(line)?.[2]?.toLowerCase() === name ? [at] : [],
  );
  const typed = hits.find((at) =>
    lines.slice(at + 1, at + 4).some((line) => /"src"/.test(line)),
  );
  const at = typed ?? hits[0];
  if (at === undefined) return null;
  const open = at - 1;
  const indent = /^\s*/.exec(String(lines[open]))?.[0] ?? '';
  const closes = new RegExp(`^${indent}\\}`);
  const close = lines.findIndex(
    (line, index) => index > at && closes.test(line),
  );
  const end = Math.min(
    close < 0 ? lines.length - 1 : close,
    open + MAX_LINES - 1,
  );
  return {
    from: open + 1,
    to: end + 1,
    text: lines.slice(open, end + 1).join('\n'),
  };
}

// a screen of a page: a pointer to its lines, too long to inline
function screenSection(
  lines: readonly string[],
  want: string,
): TsSection | null {
  const label = /^screen\s+(\w+)$/i.exec(want)?.[1];
  if (label === undefined) return null;
  const at = lines.findIndex((line) =>
    line.includes(`data-screen-label="${label} `),
  );
  if (at < 0) return null;
  const next = lines.findIndex(
    (line, index) =>
      index > at && /<section\b[^>]*data-screen-label=/.test(line),
  );
  const to = next < 0 ? lines.length : next;
  return { from: at + 1, to, text: '', exact: true, pointer: true };
}

const HEADS: readonly (readonly [RegExp, RegExp])[] = [
  [/\.css$/, /^\s*\/\* =====/],
  [/\.md$/, /^#{1,3} /],
  [/\.dc\.html$/, /<!--\s|data-screen-label=|<section\b/],
  [
    /./,
    /^\s*\/\/ ──|^\s*(?:export\s+)?(?:const|let|var) [A-Z_]+\b|^\s*\/\/ [A-Z]/,
  ],
];

// the heading that says the words, else the line, else the first word's
function headingSection(
  lines: readonly string[],
  { file, want }: { readonly file: string; readonly want: string },
): TsSection | null {
  const head = (HEADS.find(([kind]) => kind.test(file)) ?? HEADS[3])?.[1];
  const heads = lines.flatMap((line, at) => (head?.test(line) ? [at] : []));
  const needle = want.toLowerCase().replace(/[’']/g, "'");
  const word = needle.split(/[\s·,(]+/).find(Boolean) ?? needle;
  const says = (at: number, words: string): boolean =>
    String(lines[at]).toLowerCase().includes(words);
  const near = (words: string): number | undefined => {
    const at = lines.findIndex((line) => line.toLowerCase().includes(words));
    return at < 0 ? undefined : Math.max(0, at - 2);
  };
  const start =
    heads.find((at) => says(at, needle)) ??
    near(needle) ??
    heads.find((at) => says(at, word)) ??
    near(word);
  if (start === undefined) return null;
  const end = Math.min(
    heads.find((at) => at > start) ?? lines.length,
    start + MAX_LINES,
  );
  return { from: start + 1, to: end, text: lines.slice(start, end).join('\n') };
}

function sectionOf(source: Source, asked: Asked): TsSection | null {
  const lines = source.text.split('\n');
  const file = source.path;
  if (/\.json$/.test(file)) return jsonSection(lines, asked.want);
  const exact = /\.ts$/.test(file)
    ? tsSection(source.text, { ...asked, glossary: /^glossary\b/.test(file) })
    : null;
  const screen = /\.dc\.html$/.test(file)
    ? screenSection(lines, asked.want)
    : null;
  return exact ?? screen ?? headingSection(lines, { file, want: asked.want });
}

export { sectionOf };
