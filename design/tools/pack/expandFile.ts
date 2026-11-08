/**
 * - `expandFile` · a pointer to a design file and the sections it names, each
 * - quoted from the source it was cut from, under that source's own digest
 */
import type { Cut } from './fileLines.ts';
import {
  distinct,
  fenceOf,
  namedLine,
  plainLines,
  termsOf,
  wholeLines,
} from './fileLines.ts';
import { bytesOf, sha256 } from './packSources.ts';
import type { Source } from './packSources.ts';
import { sectionIn } from './sheetSections.ts';
import type { Found } from './sheetSections.ts';
import { MAX_LINES } from './tsSections.ts';

// one source's sections under one line naming their lines and its digest
function groupLines(
  source: Source,
  found: readonly Found[],
): readonly string[] {
  const spans = found.map(
    (one) => `lines ${one.section.from}–${one.section.to}`,
  );
  const head = `_${source.path}_ · ${spans.join(', ')} of ${source.text.split('\n').length} · sha256 ${sha256(source.text)} · ${bytesOf(source.text)} B`;
  return [
    head,
    '',
    ...found.flatMap(({ section }) =>
      section.pointer
        ? [
            `- lines ${section.from}–${section.to} · a whole screen, too long to inline — read it in the file; the spec rows are the criterion`,
            '',
          ]
        : ['```' + fenceOf(source.path), section.text, '```', ''],
    ),
  ];
}

// the sections found, grouped by their source in the order first met
function foundLines(found: readonly Found[]): readonly string[] {
  const sources = [...new Set(found.map((one) => one.source))];
  return sources.flatMap((source) =>
    groupLines(
      source,
      found.filter((one) => one.source === source),
    ),
  );
}

// nothing found: a short file whole, else each file to read
function unfoundLines(
  sources: readonly Source[],
  want: string,
): readonly string[] {
  const [only] = sources;
  if (only && sources.length === 1 && only.text.split('\n').length <= MAX_LINES)
    return [
      `_${only.path}_ · whole (section “${want}” not found by heading) · ${only.text.split('\n').length} lines · sha256 ${sha256(only.text)} · ${bytesOf(only.text)} B`,
      '',
      '```' + fenceOf(only.path),
      only.text,
      '```',
      '',
    ];
  return [
    `_files_ · section “${want}” not found by heading — read the files`,
    '',
    ...sources.map(namedLine),
    '',
  ];
}

function wantLines(
  ref: string,
  {
    sources,
    want,
    cut,
  }: {
    readonly sources: readonly Source[];
    readonly want: string;
    readonly cut: Cut;
  },
): readonly string[] {
  const asked = termsOf(want).map((term) => ({
    term,
    found: sectionIn(sources, { want: term, epic: cut.epic }),
  }));
  const missing = asked.filter((one) => !one.found).map((one) => one.term);
  if (missing.length) cut.miss(`${ref} · not found: ${missing.join(', ')}`);
  const found = distinct(
    asked.flatMap((one) => (one.found ? [one.found] : [])),
  );
  return found.length ? foundLines(found) : unfoundLines(sources, want);
}

function expandFile(
  ref: string,
  {
    file,
    want,
    cut,
  }: {
    readonly file: string;
    readonly want: string | undefined;
    readonly cut: Cut;
  },
): readonly string[] {
  const sources = cut.reader.sourcesOf(file);
  if (!sources.length) {
    cut.miss(`${ref} · file not found`);
    return [`_design file not found here_ · ${file}`, ''];
  }
  if (want && /\bwhole\b/i.test(want)) return wholeLines(sources);
  if (want) return wantLines(ref, { sources, want, cut });
  return plainLines(file, sources);
}

export { expandFile };
