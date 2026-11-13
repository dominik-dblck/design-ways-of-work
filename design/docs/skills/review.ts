/**
 * - `skill` · design-review: what it does, when to use it, its sections
 */
import type { SkillFile } from './skillTypes.ts';

const skill: SkillFile = {
  title: 'design-review · a change read against the rules no check holds',
  description:
    'Reads a change against every rule row whose gate is `review`, the rules no lint, test or scan holds, and mends or reports what breaks them. Use when a change to code is about to be committed, or another session sends a sha for review.',
  intro:
    'A rule a tool can hold is held by that tool (`docs/rules/checks.md`); the rows left to `review` are read here, every one, on every change that touches code.',
  sections: [
    {
      heading: 'Steps',
      lead: null,
      first: 1,
      lines: [
        "The rows: ``grep -n '| `review` ' docs/rules/*.md``, each row of this side whose gate is `review`, by its file and line.",
        'The change: `git diff --cached` before a commit, `git show <sha>` for a sha sent.',
        'Each row against each changed file it speaks to; a row that speaks to none of them is passed by its line.',
        'Each finding mended before the commit; on a sha sent, sent back by its file and line with the row it breaks.',
        '`yarn check:chunk` green, then the commit.',
      ],
    },
    {
      heading: 'Never',
      lead: null,
      first: null,
      lines: [
        "A finding kept without the row's own exception, or a reason a reader can check, in the commit's body.",
        'A row a tool could hold left to this reading: its check is written, and the row names the check as its gate.',
      ],
    },
  ],
};

export { skill };
