/**
 * - the process (`CLAUDE.md`, a skill, a rule file) names a source, never a bundle
 */
import { describe, expect, it } from 'vitest';
import { textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

// a bundle's name standing alone: `plans.js`, never `project/plans.js` (a published path)
const A_BUNDLE = /(?<![\w/.-])([a-z][\w-]*\.js)\b/g;
const THE_PROCESS = /^(CLAUDE\.md|\.claude\/skills\/|docs\/rules\/)/;

const bundlesIn = (source: Source): readonly string[] => [
  ...new Set(
    [...source.text.matchAll(A_BUNDLE)].flatMap(([, named]) => named ?? []),
  ),
];

describe('the process names a source, never a bundle', () => {
  it('a bundle named alone is found; a published path and a source are not', () => {
    expect(
      bundlesIn({
        path: 'CLAUDE.md',
        text: 'Read `plans.js · RULES`, then `project/tickets.js` and `docs/process/plans.ts`.',
      }),
    ).toEqual(['plans.js']);
  });

  it('the process names a source, never a bundle', () => {
    const process = textsUnder('.', ['.md']).filter((source) =>
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
