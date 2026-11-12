/**
 * - `REGRESSION_SKILL` · `ticket-regression`: what the ticket may have broken
 */
import type { DocumentSection } from '../documentTypes.ts';
import { NO_STOP_OF_ITS_OWN } from './noStopOfItsOwn.ts';
import { cite, citeLines } from '../cited.ts';
import { buildBranch } from '../../../sheet/project.ts';

export const REGRESSION_SKILL: readonly DocumentSection[] = [
  {
    heading: '# `.claude/skills/ticket-regression/SKILL.md`',
    lines: [
      '',
      '```',
      'name: ticket-regression',
      'description: Block, called after arch-review. Did the sheet move, did the suite stay green, did this ticket change what a landed ticket does. Every section goes to the report.',
      '```',
      '',
      "**Purpose.** Three measurements. The third is the one a green suite cannot give: a landed ticket's",
      'behaviour that nobody tested and this ticket touched.' +
        cite('regressionSkill.1'),
      ...citeLines('regressionSkill.1+'),
      '',
      '**Input.** Arch-review complete.',
      '',
      '**Tasks.**',
      '',
      '1. Read `ticket/_shared.md`, then `ticket/_code.md`',
      '2. **Spec drift** — `yarn ticket:read` against the pack the run started from. Exit 1 → list which criteria moved and what',
      '   it means for tests already written',
      "3. **Suite** — full `vitest`, all projects. Any red outside this ticket's own tests → listed with the",
      '   owning ticket from `receipts.ts` · a test file the suite excludes is run once here and its result written: every entry of the projects’ `exclude` stands in the pass file with its result.' +
        cite('regressionSkill.2'),
      '   · **coverage** reads the criteria of every part the pack merges, not the ticket’s alone: each meets a passed test by file and title, or stands in that part’s `uncovered`.' +
        cite('regressionSkill.3'),
      '4. **Touched outside scope** — `git diff --name-only ' +
        buildBranch +
        '`; a ticket row has no',
      '   file list, so scope is derived: a file is inside if a criterion or a contract row names it, outside',
      '   otherwise. Every outside file → `git log` names the ticket branch that last wrote it → that',
      "   ticket's criteria on the file re-read against the new code. Each: unchanged / changed (how) /",
      '   needs re-port.' + cite('regressionSkill.4'),
      '4a. **A scan found skipping a file kind or a folder is fixed with every scan that walks the same',
      "   way:** each architecture scan's roots and endings are grepped, and each that lacks the kind is",
      '   named in §3.' + cite('regressionSkill.5'),
      '4b. **A scan over a set the code declares reads the set off its declaration** and asserts each member is',
      '   caught; a hand-typed list of names a source file declares is named in §3.' +
        cite('regressionSkill.6'),
      '5. Write `roadmaps/{epic}/{id}/regression-{id}.md` from `roadmaps/templates/ticket-regression.md`.',
      '   Its headings, in order, each a count or `0`:',
      '   - `## 1 · Spec drift` — step 2',
      '   - `## 2 · Suite` — step 3',
      '   - `## 3 · Touched outside scope` — step 4',
      '   - `## Re-ports needed` — the count, the causes as a legend and the path of `re-ports-{id}.json`, or',
      '     `none`. One row per re-port, `{ ticket, file, where, cause, find, replace }`: `find` copied from',
      "     `.sheet-cache/{file}`, never typed, found once in that ticket's row; `file` is the path from the root,",
      "     a row's epic part `roadmaps/EXX/EXXTickets.ts` — `yarn reports:check`",
      '     checks every row before the report.' + cite('regressionSkill.7'),
      '   - `## 4 · Beyond the suite (when the ticket moved a rendered value)` — the A/B shape',
      '6. Present: `{id} · regression · drift {n} · suite {n} red · touched {n} files, {n} re-ports`',
      '',
      `${NO_STOP_OF_ITS_OWN} A non-zero section goes to the report with`,
      "the re-ports file: the design side applies it by script (`tools/applyReports.ts`), and receipts are the design project's.",
      '',
      "The criteria §3 re-reads are the sheet's at the release's commit (`git cat-file blob <sha>:{path}`), never a cached copy. Check: the digests named in §1." +
        cite('regressionSkill.8'),
      '',
      "A word the ticket renames is grepped in every scan's own word list, and a list behind it is fixed in the same pass. Check: the old word in `tests/architecture/` stands only in quoted criteria." +
        cite('regressionSkill.9'),
      '',
      '---',
      '',
    ],
  },
];
