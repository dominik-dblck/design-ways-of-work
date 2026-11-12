/**
 * - `REPORT_SKILL` · `ticket-report`: the report the design side reads
 */
import type { DocumentSection } from '../documentTypes.ts';
import { cite, citeLines } from '../cited.ts';
import { buildBranch } from '../../../sheet/project.ts';
import { productStack } from '../../process/productStack.ts';

export const REPORT_SKILL: readonly DocumentSection[] = [
  {
    heading: '# `.claude/skills/ticket-report/SKILL.md`',
    lines: [
      '',
      '```',
      'name: ticket-report',
      'description: Block, the last step of every mode. One of three shapes, the receipt, the lessons. Stages and stops — never commits, merges or pushes.',
      '```',
      '',
      '**Purpose.** A claim sent once, in a shape the board can check. Then three separate approvals —',
      'commit, merge, push — each reversible on its own.',
      '',
      "**Input.** The mode's last step before the report done.",
      '',
      '**Tasks.**',
      '',
      '1. Read `ticket/_shared.md`, then `ticket/_code.md`',
      '2. Open with the decisions no criterion asked for (`_shared.md` · Decisions are written), one line',
      '   each with `file:line`',
      '3. `yarn ticket:read` — criteria diffed against the pack one last time.' +
        cite('reportSkill.1'),
      ...citeLines('reportSkill.1+'),
      '4. Grep every contract row against the `it(…)` titles the suite holds.' +
        cite('reportSkill.2'),
      ...citeLines('reportSkill.2+'),
      '5. Write the report, one shape only:',
      '',
      '   ```',
      '   {id} · done            {id} · blocked                  {id} · spec wrong',
      '   tests: {n} green       found: …                        criterion: "…"',
      '   notes: —               where: file · section           contradiction: …',
      '                          need: a decision on …',
      '   ```',
      '',
      '6. Receipt — parsed, never estimated, never copied from a placeholder:',
      "   `'{id}': { criteria, tests, skipped: ['n · why · waits on'], uncovered: [], at: 'YYYY-MM-DD' }`.",
      '   `criteria` is how many the ticket held when read, not how many were built to',
      '6b. **The repository.** Every report, any shape, ends on the repository whole at its commit, each number',
      '   from the repository’s own tools, never estimated; one its tools cannot give is `—`:',
      '   `repository: {sha} · tests {n} ({m} skipped) · e2e {n} · coverage at {sha}: lines {n}% branches {n}% functions {n}% statements {n}%`.',
      '   `tests` is `yarn test`’s passed and skipped, `e2e` the total `yarn e2e --list` gives; coverage is the last row',
      '   of `roadmaps/coverage/history.jsonl` and names its own sha, a fresh `yarn test:coverage` taken at a feature’s end.',
      '   The receipt carries the line as `repository`.',
      '6a. **The spec copy.** A run that moved a component — a new one, a tier, a wrapper, what a row composes —',
      '   attaches `app/styles/componentsSpec.ts`, written on the sheet’s spec as fetched for the run, never on',
      '   an older copy here. The tree writes what it holds: tier and wrapper from the folder, each part’s kind,',
      '   what a row composes from its imports, and a component the run built from its code (' +
        productStack.components.name +
        ' imports, props,',
      '   layout). Every field the tree cannot see stays as the sheet wrote it: words, notes, tokens, `wireframe`,',
      '   `live`, `fingerprints`, `tests`, `changedIn`. Every row added, moved or renamed is named; the sheet',
      '   takes the file whole (SP1).' + cite('reportSkill.3'),
      ...citeLines('reportSkill.3+'),
      '7. **Lessons** — for every `## Notes` entry that names a stage: can it be one rule with a check?',
      '   Yes → one proposed line for that stage, tagged `why: {id}`, in the report under `## Lessons` —',
      "   it goes to the design project's `ticket-pipeline.md` first and reaches SKILL.md by sync, never",
      '   directly. No → it stays in Notes; it is a story. Zero entries → "no lessons"',
      '7a. **The track** — the one the pack names and the one the ticket ended on, each with its points.',
      '  ' + cite('reportSkill.4'),
      '8. Write `roadmaps/{epic}/{id}/report-{id}.md` from `roadmaps/templates/ticket-report.md` — the',
      '   report shape verbatim at the top, then its headings, in order, each filled:',
      '   - `## Receipt` — step 6, and what the count is made of',
      '   - `## Decisions no criterion asked for` — step 2',
      "   - `## Re-ports` — `re-ports-{id}.json` from the regression's `## Re-ports needed`, or `none`",
      '   - `## Lessons` — step 7',
      "   - `## Cost` — per step, what the session showed: context tokens at the stage's end, minutes,",
      '     reads of the sheet. A measurement, not a budget — nothing here fails on a number',
      '   - `## Commit` — branch, staged count, message',
      '   Update `epic-notes.md`',
      '9. `git add -A`, show what is staged, present the commit message',
      '   (`{id}: {one line} · {n} tests green`, at most 72 characters with the id and the count: `checks.md`) and',
      '   the branch. Every test file the receipt counts is staged —',
      '   a test the report names and the commit leaves out is a criterion with no test in the tree.',
      '  ' +
        cite('reportSkill.5') +
        ' Repo-wide changes — skills, docs, patterns',
      '   — ride with this ticket',
      '10. **STOP.** No `git commit`, no `--amend`, no `--no-verify`. Commit, merge into',
      '    `' +
        buildBranch +
        '`, push are three separate yeses, and nothing is pushed mid-ticket',
      '',
      '**Stop.** Always.',
      '',
      '**After the answer.** `done` → wait for the commit yes, then the merge yes, then the push yes; each',
      'arrives on its own. `blocked` → wait for the decision, then back to the stage the block names',
      "(usually the build step). `spec wrong` → the sheet is fixed there; back to the mode's build step for",
      'the affected rows, each test seen red again. Never a second report until the first is answered.',
      '',
      '---',
      '',
    ],
  },
];
