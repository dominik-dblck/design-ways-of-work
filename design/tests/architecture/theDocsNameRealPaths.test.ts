/**
 * - `docs/rules/one-home.md`: a path a doc names in backticks exists; a pointer's ` · export` is no part
 * - the process (`CLAUDE.md`, a skill, a rule file) names a source, never the bundle the build writes
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ROOT, textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

const A_PATH =
  /`((?:sheet|roadmaps|docs|guards|app|records|legacy|public|fixtures|tools|tests|notes)\/[^`\s]+)(?:\s·[^`]*)?`/g;
// a bundle's name standing alone: `plans.js`, never `project/plans.js` (a published path)
const A_BUNDLE = /(?<![\w/.-])([a-z][\w-]*\.js)\b/g;
const THE_PROCESS = /^(CLAUDE\.md|\.claude\/skills\/|docs\/rules\/)/;
const A_PLACEHOLDER = /[{}*<>…]|\.\.\.(?!\w*\])|\bE?XX\b|EXX/;
const A_TAIL = /(?::\d+(?:[–-]\d+)?|#.*|[.,;:)]+)$/;

// the documents whose paths are history or another repository's, each with why
const NOT_READ: readonly (readonly [RegExp, string])[] = [
  [
    /^(records|legacy|notes|fixtures)\//,
    'an archive, a log or generated output',
  ],
  [
    /^docs\/process\/(ticket-pipeline|agent-instructions)\.md$/,
    "the build side's process: its paths are the build repository's (O13)",
  ],
];

/** The paths a document names that do not exist, given what does. */
function missingIn(
  source: Source,
  exists: (file: string) => boolean,
): readonly string[] {
  return [
    ...new Set([...source.text.matchAll(A_PATH)].map(([, named]) => named)),
  ]
    .map((named) => named.replace(A_TAIL, ''))
    .filter((named) => !A_PLACEHOLDER.test(named) && !exists(named))
    .sort();
}

const bundlesIn = (source: Source): readonly string[] => [
  ...new Set([...source.text.matchAll(A_BUNDLE)].map(([, named]) => named)),
];

const onDisk = (file: string): boolean => fs.existsSync(path.join(ROOT, file));

const theDocuments = (): readonly Source[] =>
  textsUnder('.', ['.md']).filter(
    (source) => !NOT_READ.some(([where]) => where.test(source.path)),
  );

describe('the docs name real paths', () => {
  it('a path that is not there is found; one that is, a placeholder and a line number are not', () => {
    const there = (file: string): boolean => file === 'tools/layout.ts';
    expect(
      missingIn(
        {
          path: 'docs/rules/planted.md',
          text: [
            'Read `sheet/model/directory.ts` first.',
            'Then `tools/layout.ts:56`, `sheet/logic/{capability}/` and `roadmaps/EXX/`.',
          ].join('\n'),
        },
        there,
      ),
    ).toEqual(['sheet/model/directory.ts']);
  });

  it('no doc names a missing path', () => {
    const documents = theDocuments();
    expect(documents.map((source) => source.path)).toContain('CLAUDE.md');
    expect(
      documents.flatMap((source) =>
        missingIn(source, onDisk).map((named) => `${source.path} · ${named}`),
      ),
    ).toEqual([]);
  });

  it('a bundle named alone is found; a published path and a source are not', () => {
    expect(
      bundlesIn({
        path: 'CLAUDE.md',
        text: 'Read `plans.js · RULES`, then `project/tickets.js` and `docs/process/plans.ts`.',
      }),
    ).toEqual(['plans.js']);
  });

  it('the process names a source, never a bundle', () => {
    const process = theDocuments().filter((source) =>
      THE_PROCESS.test(source.path),
    );
    expect(process.map((source) => source.path)).toContain(
      '.claude/skills/design-start/SKILL.md',
    );
    expect(
      process.flatMap((source) =>
        bundlesIn(source).map((named) => `${source.path} · ${named}`),
      ),
    ).toEqual([]);
  });
});
