/**
 * - `wholeLines`, `plainLines`, `namedLine`, `fenceOf` · a design file
 * - quoted whole, inline, or named with its size and digest
 * - `termsOf`, `distinct`, `Cut` · a pointer's terms, its sections once each
 */
import { bytesOf, sha256 } from './packSources.ts';
import type { Source, SourceReader } from './packSources.ts';
import type { Found } from './sheetSections.ts';
import { MAX_LINES } from './tsSections.ts';

interface Cut {
  readonly reader: SourceReader;
  readonly epic: string | null;
  readonly miss: (text: string) => void;
}

const FENCES: readonly (readonly [RegExp, string])[] = [
  [/\.ts$/, 'ts'],
  [/\.(js|mjs)$/, 'js'],
  [/\.css$/, 'css'],
  [/\.html$/, 'html'],
  [/\.json$/, 'json'],
];

const fenceOf = (file: string): string =>
  FENCES.find(([kind]) => kind.test(file))?.[1] ?? '';

const countOf = (text: string): number => text.split('\n').length;

const quoted = (source: Source): readonly string[] => [
  '```' + fenceOf(source.path),
  source.text,
  '```',
  '',
];

// a file named with its size and whole digest, for the reader to fetch and check
const namedLine = (source: Source): string =>
  `- ${source.path} · ${countOf(source.text)} lines · ${bytesOf(source.text)} B · sha256 ${sha256(source.text)}`;

// a spec file the ticket builds against travels whole, whatever its length
function wholeLines(sources: readonly Source[]): readonly string[] {
  return sources.flatMap((source) => {
    const head = `_${source.path}_ · whole · ${countOf(source.text)} lines · sha256 ${sha256(source.text)} · the pointer says whole, so the file is the read — this side copies it as the fixture`;
    return /\.json$/.test(source.path) || countOf(source.text) <= 900
      ? [head, '', ...quoted(source)]
      : [`${head} (c1)`, ''];
  });
}

// a pointer naming no section: a short file inline, else each file named
function plainLines(
  file: string,
  sources: readonly Source[],
): readonly string[] {
  const [only] = sources;
  if (sources.length > 1)
    return [
      `_files_ · ${file} is ${sources.length} files, its entry and its parts · the pointer names no section, so every one is the read`,
      '',
      ...sources.map(namedLine),
      '',
    ];
  if (!only) return [];
  const said = `_${only.path}_ · ${countOf(only.text)} lines · sha256 ${sha256(only.text)}`;
  return countOf(only.text) <= MAX_LINES
    ? [
        `_${only.path}_ · whole · ${countOf(only.text)} lines · sha256 ${sha256(only.text)} · ${bytesOf(only.text)} B`,
        '',
        ...quoted(only),
      ]
    : [
        `${said} · too long to inline; the pointer names no section, so the whole file is the read`,
        '',
      ];
}

// the terms a pointer asks for: a short id is a term, never dropped
const termsOf = (want: string): readonly string[] =>
  want
    .replace(/(?<![\s(])\s*\([^)]*\)/g, '')
    .split(/(?<!\s)\s+and\s+|,\s*|\s·\s/)
    .map((term) => term.replace(/^the\s+/i, '').trim())
    .filter((term) => term.length > 3 || /[\dA-Z]/.test(term));

// a section inside another of the same source is not cut twice
function distinct(found: readonly Found[]): readonly Found[] {
  let kept: readonly Found[] = [];
  for (const one of found) {
    const inside = (outer: Found, inner: Found): boolean =>
      outer.source.path === inner.source.path &&
      outer.section.from <= inner.section.from &&
      outer.section.to >= inner.section.to;
    if (kept.some((was) => inside(was, one))) continue;
    kept = [...kept.filter((was) => !inside(one, was)), one];
  }
  return kept;
}

export { distinct, fenceOf, namedLine, plainLines, termsOf, wholeLines };
export type { Cut };
