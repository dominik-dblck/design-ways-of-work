import { describe, expect, it } from 'vitest';
import { isRetired } from '../../scripts/retired.ts';

// legacy/dev/claude holds the build side's retired skills (architect, …) and evaluations (plan-eval.md, …)
describe('a build-side `.claude/` path the PM retired', () => {
  it.each([
    ['a retired skill, by its folder', '.claude/skills/architect/', true],
    ['a file of a retired skill', '.claude/skills/architect/SKILL.md', true],
    [
      "a file a retired skill never held: the skill's whole folder goes",
      '.claude/skills/architect/notes.md',
      true,
    ],
    ['a retired file', '.claude/evaluations/plan-eval.md', true],
    ['a kept skill', '.claude/skills/e2e-category/SKILL.md', false],
    ['a kept file beside retired ones', '.claude/evaluations/kept.md', false],
    ['a folder no skill names', '.claude/evaluations/', false],
    ['a path outside `.claude/`', 'skills/architect/SKILL.md', false],
  ] as const)('%s: %s', (_, claudePath, isIt) => {
    expect(isRetired(claudePath)).toBe(isIt);
  });
});
