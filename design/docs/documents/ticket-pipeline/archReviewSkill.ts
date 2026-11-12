/**
 * - `ARCH_REVIEW_SKILL` · `ticket-arch-review`: the diff read against the patterns
 */
import type { DocumentSection } from '../documentTypes.ts';
import { NO_STOP_OF_ITS_OWN } from './noStopOfItsOwn.ts';
import { cite, citeLines } from '../cited.ts';
import { buildBranch } from '../../../sheet/project.ts';

export const ARCH_REVIEW_SKILL: readonly DocumentSection[] = [
  {
    heading: '# `.claude/skills/ticket-arch-review/SKILL.md`',
    lines: [
      '',
      '```',
      'name: ticket-arch-review',
      'description: Block, called by every mode that reviews. Is the code built the way this repository builds things. A finding that is a choice is decided and reported.',
      '```',
      '',
      '**Purpose.** Read the diff against the patterns, not against the specification — that is the',
      "report's reader's question. This stage may change code; regression follows it because of that.",
      ...citeLines('archReviewSkill.1'),
      '',
      "**Input.** The ticket's tests green.",
      '',
      '**Tasks.**',
      '',
      '1. Read `ticket/_shared.md`, then `ticket/_code.md`',
      '2. Run `/architecture-review` on `git diff ' +
        buildBranch +
        '` — its own steps in',
      '   `.claude/commands/architecture-review.md` (layers touched → patterns for those layers only →',
      '   types-tightening sweep first → patterns → rest of types-eval → tests-eval → ux-eval on UI diffs →',
      '   cross-cutting smells → findings with citations → decision table)',
      "   The rule files it reads are the repository's map, `docs/rules/README.md`" +
        cite('archReviewSkill.2') +
        ': the pipeline names none',
      '3. Sort every finding into one of three:',
      '   - **fix** — the pattern is clear and one answer survives → fixed here, `## Notes`',
      '   - **keep** — the pattern does not apply and the reason is a check → kept, `## Notes` with why',
      "   - **decided** — two readings survive, or the fix moves a criterion or a landed ticket's port →",
      '     the pick taken, written “did X because Y” with the cost in code of each option, for the report (rule:feature-run-never-stops)',
      '3a. **A value with two writers is a finding.** A value the server renders and the client also writes',
      '   has two owners, and the later write wins in silence — name the one owner (plans.ts · RULES, one',
      '   owner per value).' + cite('archReviewSkill.3'),
      ...citeLines('archReviewSkill.3+'),
      '3b. **A fix that changes what an endpoint answers is a contract row**, or it goes back as a question',
      '   naming the row it needs.' + cite('archReviewSkill.4'),
      "4. Re-run the ticket's own tests after fixes",
      '5. Write `roadmaps/{epic}/{id}/arch-review-{id}.md` from `roadmaps/templates/ticket-arch-review.md`.',
      "   The file is what the design project reviews, so it carries the command's output whole, not a",
      '   summary. Its headings, in order, each filled:',
      '   - `## Architecture Summary` — layers touched, patterns loaded, context gaps, as the command emits it',
      '   - `## Findings` — every one as the command emits it: Source `[file → Section]`, Severity',
      '     (`CRITICAL` / `HIGH` / `UNCERTAIN`), File `path:line`, Rule, Why, Fix hint. English. Max 25,',
      '     or "No violations found"',
      '   - `## Decision table` — always, in the language of the repository (English), not of the',
      '     conversation: `#` (`⛔` CRITICAL only,',
      '     `❓` UNCERTAIN) · What it is · How it is now (measured number where there is one) · How it will',
      '     be. One line under it: which findings collapse into one change, which are decisions',
      '   - `## Disposition` — per finding: fix / keep + why / question, each pointing at its Decisions or',
      '     Notes entry. `UNCERTAIN` is always decided and named in the report',
      '   - `## Decided` — one “did X because Y” each, or "none"',
      '   - `## Files changed by this stage` — path, and which finding',
      "   - `## Tests after` — the ticket's count, from the runner",
      '   Every count in the file (rows, criteria, assertions, tests) is read from',
      "   the runner's output, never typed." + cite('archReviewSkill.5'),
      ...citeLines('archReviewSkill.5+'),
      '6a. **The row → `it(…)` grep runs here, not only at the report.** This stage renames tests; the',
      "   report is four stages later. After the fixes, every contract row's title is grepped against the",
      '   suite and a stale one is fixed in the same turn.' +
        cite('archReviewSkill.6'),
      ...citeLines('archReviewSkill.6+'),
      '6b. **The fixes run before the stage is presented:** `yarn tsc`, the architecture project and one',
      '   `yarn e2e`; a type import counts as a door.' +
        cite('archReviewSkill.7'),
      '6c. **A component moved between tiers moves its spec row in the same change:** `spec-check` over',
      '   `app/styles/componentsSpec.ts` reads 0 before the stage is presented.' +
        cite('archReviewSkill.8'),
      ...citeLines('archReviewSkill.8+'),
      '7. Hand the file to the calling mode; the report names it',
      '',
      `${NO_STOP_OF_ITS_OWN} The file travels with the report: the code`,
      "differs from the first green by exactly what this step changed. The whole file is in the repository's",
      'language; a half-Polish table is two documents.' +
        cite('archReviewSkill.9'),
      '',
      'A gate that cites a section of a doc is read against that section; a cited heading the doc no longer',
      'holds is a finding (grep the heading).' + cite('archReviewSkill.10'),
      ...citeLines('archReviewSkill.10+'),
      '',
      "The row → title grep of 6a reads a browser row against the catalogue's `name`, not only `it(…)`. Check: every e2e row's title equals one catalogue name." +
        cite('archReviewSkill.11'),
      '',
      '**Template.** `roadmaps/templates/ticket-arch-review.md`, below under Templates.',
      '',
      '---',
      '',
    ],
  },
];
