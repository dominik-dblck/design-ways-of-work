/**
 * - `docs/rules/size.md`: a skill holds at most 2000 words, `CLAUDE.md` at most 1000
 * - a skill is read whole when it loads, `CLAUDE.md` on every turn: both are counted in words
 */
import { describe, expect, it } from 'vitest';
import { claudeMd, theSkills } from './skills.ts';
import type { Source } from './tree.ts';

const SKILL_WORDS = 2000;
const CLAUDE_WORDS = 1000;

const wordsOf = (source: Source): number =>
  source.text.split(/\s+/).filter(Boolean).length;

describe('every skill is short', () => {
  it('counts the words of a text, whitespace of any kind between them', () => {
    expect(wordsOf({ path: 'x.md', text: 'one two\n\nthree\tfour ' })).toBe(4);
  });

  it('no skill passes 2000 words, and CLAUDE.md stays under 1000', () => {
    expect(
      [
        ...theSkills().map((source) => [source, SKILL_WORDS] as const),
        [claudeMd(), CLAUDE_WORDS] as const,
      ]
        .filter(([source, most]) => wordsOf(source) > most)
        .map(([source]) => `${source.path} · ${wordsOf(source)} words`),
    ).toEqual([]);
  });
});
