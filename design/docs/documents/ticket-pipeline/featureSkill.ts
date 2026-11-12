/**
 * - `FEATURE_SKILL` · `ticket-feature`: one epic in one run
 */
import type { DocumentSection } from '../documentTypes.ts';
import { cite, citeLines } from '../cited.ts';
import { buildBranch } from '../../../sheet/project.ts';

export const FEATURE_SKILL: readonly DocumentSection[] = [
  {
    heading: '# `.claude/skills/ticket-feature/SKILL.md`',
    lines: [
      '',
      '```',
      'name: ticket-feature',
      'description: Mode, every epic. A whole epic in one run — recon in passes, endpoint tests red from the contract’s cases and a contract snapshot for review, routes, screens, browser flows, arch-review and regression in passes, one at a time, one report. Never stops for a question — decides and says why. Stops for a digest that differs, the contract snapshot and the report — and after recon when the pack carries reconStop.',
      '```',
      '',
      '**Purpose.** Build every part of a feature ticket on one branch without stopping between stages. The',
      'contract is the sheet: the `commands.ts` and `queries.ts` rows with their `checks` and `cases`, and',
      '`api-convention.md` for what every endpoint shares. The ticket’s scenario criteria are the browser tests.',
      ...citeLines('featureSkill.1'),
      "Every reply opens with two progress lines: the run's" +
        cite('featureSkill.2') +
        ' and the part in',
      "hand's (`endpoint tests · 12 z 12 ▓▓▓▓▓▓▓▓▓▓▓▓`), and a turn ends only on `⏸️ stop:` naming one of the",
      "stops above, or `⏸️ e2e:` while a browser run holds the machine (the repository's Stop hook holds the rest).",
      ...citeLines('featureSkill.3'),
      '',
      '**Input.** `{ticket-id}` of kind `feature`, track `feature`; its `depends` are done.',
      '',
      '**Tasks.**',
      '',
      '1. Read `ticket/_shared.md`, `ticket/_code.md`, the pack with `yarn ticket:read`, `api-convention.md`, and every row the read list names',
      '2. Branch — `git switch ' +
        buildBranch +
        ' && git pull --ff-only; git switch -c feature/{id}`',
      '2a. Sync the contract before recon reads it: re-copy every sheet file the pack names that the repo holds as a',
      '   fixture (`commands.ts`, `queries.ts`, `refusals.ts`, `events.ts` …) verbatim at the pack’s digests, update',
      '   `hashes.json`, run the emitter (`commandBodies.ts`, `queryIds.ts`, `queryParams.ts`) and add the test that',
      '   compares the emitted files with a fresh emit' +
        cite('featureSkill.4') +
        '. A copy that differs from its digest stops',
      '   the run. The types the emitter writes are the ones the snapshot shows' +
        cite('featureSkill.5'),
      '3. Recon in passes: `ticket-recon`’s steps 3–5b and its template, five passes by area, one at a time (its 3a) —',
      '   packages/domain · app/api and app/services · the screens and components · the tests and fixtures · the',
      '   pack against the repository (the CHECKLIST_READ lines) — each reading its area once and answering per',
      '   part. Write `roadmaps/{epic}/{id}/recon-{id}.md`. What differs in a feature run: its step 6 (STOP) does',
      '   not apply; `## Questions` holds each one as “decided X because Y”, and a decision on the contract goes',
      '   into the snapshot (rule:feature-run-never-stops); a shape no row names follows step 6 here, not its step 3 (rule:unnamed-shape-built-not-stopped); a',
      '   contradicted checklist clause is decided and reported, it blocks nothing.' +
        cite('featureSkill.6'),
      ...citeLines('featureSkill.6+'),
      '3a. **`reconStop`.** When the pack carries it' +
        cite('featureSkill.7') +
        ', the recon ends here with a **STOP**:',
      '   `## Questions` holds questions in the message shape, not decisions, and the run waits for the answers',
      '   on the sheet.' + cite('featureSkill.8'),
      '4. Endpoint tests first: one test per test case of every row the ticket names — `<Endpoint>.case.<slug>` and',
      '   `<Endpoint>.refusal.<key>` as `testCases.ts` names them, the id in the test’s title — plus the shared edge',
      '   cases of `sharedCases.ts` (`.shared.<id>`; `api-convention.md` gives each its reason), written a pass per endpoint, one at a time; then run once, every one red.',
      '   Then the one stop of the run that is not a question: write `roadmaps/{epic}/{id}/contract-snapshot-{id}.md`',
      '   from `roadmaps/templates/ticket-contract-snapshot.md` — `## Types` · `## Endpoints` · `## Decided` ·',
      '   `## Differs from the sheet` — and send it to the design session with `SendMessage`:',
      '   - the types written, verbatim TypeScript, each with its file: brands, bodies, answers, refusal keys',
      '   - per endpoint: method and path, who may call it, the body type, the answer as a union of every case,',
      '     the refusal keys with their lines, and the titles of its red tests, one per case',
      '   - every decision the sheet did not make, as “did X because Y”: a case, a field, a refusal, a query',
      '     parameter; a new event or payload key marked NEW EVENT, because the log keeps it once merged',
      '   - what differs from the sheet and why',
      '   - **The snapshot gives every criterion of every merged part a row:** its test by file and title, or',
      '     `not built` and why · check: the rows’ criteria equal each merged part’s `acceptance`, read off its',
      '     shard.' + cite('featureSkill.9'),
      "   Wait for the review's answer; a moved row comes back with its digest and the tests move with it" +
        cite('featureSkill.10'),
      '5. Domain and routes, part by part in the ticket’s order; green per part',
      '6. Screens from their `componentsSpec.ts` rows, read beside the wireframes; the row is read, not synced',
      '   (rule:the-look-is-the-repos). A shape no row names: inside one organism, compose it from the atoms and molecules that',
      '   exist, by the wireframes and the repo’s conventions, and list it under what was guessed. A new global',
      '   atom or molecule is built the same way and reported on its own — what it is, where it lives, why no',
      '   existing one served; the design side writes its row after the report. Neither stops the run (rule:unnamed-shape-built-not-stopped).',
      '   No test is written before a screen — the journeys follow it',
      '7. Browser flows through the e2e skills, without their stops: `e2e-discovery` extends each screen’s',
      '   catalogue from the ticket’s journeys — one entry per journey, its `expectedResult` the journey’s check. A',
      '   journey is a row of `journeys.ts` in the pack: steps `[where, does, sees, covers]`, one Playwright flow per',
      '   journey under `e2e/`, the file named by the repository’s own rule, its title opening with the journey’s id; `covers` names the test cases a step',
      '   makes happen and stays in `journeys.ts`, the flow’s catalogue entry listing the journey’s cases whole; a case the',
      '   sheet does not hold, met while writing the flow, goes on the entry as `added: [{ step, case, why }]` and in the report,',
      '   and the sheet writes it after the report' +
        cite('featureSkill.11') +
        '; `{refusal:key}` is that refusal’s line from `refusals.ts`, never copied, and `{say:key}` the screen’s word from `messages.ts` (a label, else a screen line) —',
      '   groups them into categories and runs its own check (step 7), what it changed going to the report; then',
      '   `e2e-category`, one category at a time, the gate listed and run, each flow seen red once on a planted',
      '   fault (3d) and then green. A category still red after the skill’s retry is `blocked` in',
      '   `roadmaps/e2e/{screen}-status.md` and goes to the report; the run does not stop for it',
      '   The matrix' +
        cite('featureSkill.12') +
        ': `e2e-discovery` builds each screen’s matrix — every press ×',
      '   every role × every kind of path (the main path, each refusal, the ways out, a lost answer, signed out) —',
      '   and the journeys are cells of it · the step is done when the four e2e gates are green:',
      '   everyRoleHasAFlow, everyPathIsWalked, theStatusFileHolds, e2eReachesByTheRegistry · why: the catalogue',
      '   built from the journeys alone left legal, reviewer, signed-out, the ways out and a lost answer untested.',
      '8. Arch-review in passes: `.claude/commands/architecture-review.md` split by its steps, one pass per',
      '   step, each over the whole diff against `' +
        buildBranch +
        '` plus the working tree. The main agent',
      '   runs STEP 0 once (the layers touched, the context gaps) and hands its answer to each of the five, in turn:',
      '   - STEP 1 · can the types be tighter — `types-eval.md`, the first pass',
      "   - STEP 2 · the loaded patterns (only the touched layers') and the cross-cutting smells",
      '   - STEP 3 · the rest of `types-eval.md`',
      '   - STEP 4 · the tests — `tests-eval.md`',
      '   - STEP 5 · the UI — `ux-eval.md`, the 12 checks, read beside the wireframes the pack names; skipped in',
      '     one line when no UI moved. Where a check and the sheet disagree, a PM decision with its edge holds and',
      '     the finding cites the edge: Move to trash asks nothing because Restore stays on the row' +
        cite('featureSkill.13'),
      "   Each answers in the command's finding format, with its citation. The skill restates none of the",
      '   command. The main agent merges the five pass files into one',
      "   `roadmaps/{epic}/{id}/arch-review-{id}.md` from `roadmaps/templates/ticket-arch-review.md`, in the command's output format —",
      '   one Architecture Summary, at most 25 findings with duplicates across steps folded, one decision table —',
      "   applies the fixes the sheet's rules decide, re-runs the suite; an UNCERTAIN or a finding that",
      '   needs the PM goes to the report, and the run does not stop for it' +
        cite('featureSkill.14'),
      '9. Regression in passes (ticket-regression), one pass per slice, one at a time: the suite and `tsc`; drift of the',
      '   pack’s digests; the files touched outside scope, grouped by owning ticket, each verdict with file:line',
      '   (unchanged · changed, criterion holds · re-port); the architecture scans that still run (spec sync is',
      '   off, N40). The main agent checks the verdicts against the diffs and writes',
      '   `roadmaps/{epic}/{id}/regression-{id}.md` from `roadmaps/templates/ticket-regression.md`',
      '10. Report on `roadmaps/templates/ticket-report.md`: a receipt per part (criteria, green), what differs',
      '   from the contract and why, every decision the sheet did not make as “did X because Y”, re-ports, cost, and the spec copy (`ticket-report` 6a). The run makes no commit; the PM approves one commit at the end, then the push and the merge',
      '',
      'Arch-review runs before regression: it changes code, regression measures it.',
      '',
      '**Rules.** Events and payload keys come from `events.ts`; a new one is decided like any gap and marked NEW EVENT in the snapshot, because the log',
      'keeps it forever. A pass reads, tests and writes its pass file; the main agent writes the stage documents and the',
      'report from them. Keep the context small: one aspect per pass, never two passes at once.',
      '',
      '---',
      '',
    ],
  },
];
