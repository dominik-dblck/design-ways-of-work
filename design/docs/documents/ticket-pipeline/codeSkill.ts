/**
 * - `CODE_SKILL` · `ticket/_code.md`: tests, code and browser flows
 */
import type { DocumentSection } from '../documentTypes.ts';

// prettier-ignore
export const CODE_SKILL: readonly DocumentSection[] = [
  {
    heading: '# `.claude/skills/ticket/_code.md`',
    lines: [
      '',
      'Rules for writing and reviewing code and tests, read after `ticket/_shared.md` by feature, standard, fast,',
      'arch-review, regression and report. Recon does not read it.',
      '',
    ],
  },
  {
    heading: '## Tests',
    lines: [
      '',
      "- **The test clause's kind decides when a test is red.** `test (domain)`, `(endpoint)` and `(architecture)`",
      '  are written before the code and fail on their assertion first — not on an import or a type. `(app)` and',
      '  `(browser)` are written after the code and run once against a planted fault. `(measured, date)` is no',
      '  test: the report quotes the measurement. A test green before any code counts as red only through a control',
      '  in the same test that fails on a planted input, and that red is quoted. `why: T-E01-06, T-E02-01`',
      '- **An app or browser test is trusted once it has been red.** The fault — the id removed, the branch',
      '  inverted — and the red are quoted in the report before the fault is taken out. `why: T-E01-06`',
      "- **A criterion's worked example is measured before a test is written to it.** An example is an",
      '  assertion. `why: T-E01-09`',
      '- **A test over the shared database runs five times under `--sequence.shuffle`** before it is called',
      '  green, and the runs are quoted in the report. `why: T-E02-04`',
      '- **A test on a span or a range asserts both ends.** `why: T-E01-10`',
      '- **An inverse is emitted by whatever performed the transform, never inferred from its output.** `why: T-E01-09`',
      '- **A body schema is emitted, never written** (`tests/architecture/theBodiesAreEmitted.test.ts`). `why: T-E00-13`',
      "- **A check that only a hook runs is not a check.** A fixture root's own verifier is called by a test in the",
      '  suite (`tests/architecture/everyFixtureRootIsHeld.test.ts`). `why: T-E01-09` — recon F2: a verifier',
      "  nothing in the suite ran ignored a row's path",
      '',
    ],
  },
  {
    heading: '## Code',
    lines: [
      '',
      '- **A name says what, never how many** (`tests/architecture/aNameSaysWhatNotHowMany.test.ts`). `why: T-E01-07`',
      '- **A file a script generates goes into `.prettierignore` the moment it exists.** `why: T-E01-10`',
      '- **No comment describes the stage** (`tests/architecture/commentsAreInvariants.test.ts`). `why: T-E00-08`',
      '- **A value a delayed read refreshes has a settling state the screen reads**, and its test asserts the',
      '  screen after the write lands and before the read. `why: T-E04-00` — Close without changes offered over four saved edits',
      '',
    ],
  },
  {
    heading: '## Browser flows',
    lines: [
      '',
      '- **A drag in the browser tier goes through `e2e/framework/dragging.ts`**',
      '  (`tests/architecture/aDragGoesThroughTheFramework.test.ts`); a drag flow that stays green with its guard',
      '  out leaves the catalogue. `why: T-E04-00` — J4, J7',
      "- **A flow reads a refusal's sentence through `say(key, facts)`**",
      "  (`tests/architecture/aFlowSaysARefusal.test.ts`). `why: T-E04-00` — Q21's `{document}`",
      '- **When a ticket moves where a press lands, every flow that makes that press asserts the new landing.**',
      '  `why: T-E04-00` — Create went to the editor and the copy flow kept checking the list',
      '',
      '---',
      '',
    ],
  },
];
