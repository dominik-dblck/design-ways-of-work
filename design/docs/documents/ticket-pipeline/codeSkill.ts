/**
 * - `CODE_SKILL` · `ticket/_code.md`: tests, code and browser flows
 */
import type { DocumentSection } from '../documentTypes.ts';
import { cite, citeLines } from '../cited.ts';

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
      '  in the same test that fails on a planted input, and that red is quoted.' +
        cite('codeSkill.1'),
      '- **An app or browser test is trusted once it has been red.** The fault — the id removed, the branch',
      '  inverted — and the red are quoted in the report before the fault is taken out.' +
        cite('codeSkill.2'),
      "- **A criterion's worked example is measured before a test is written to it.** An example is an",
      '  assertion.' + cite('codeSkill.3'),
      '- **A test over the shared database runs five times under `--sequence.shuffle`** before it is called',
      '  green, and the runs are quoted in the report.' + cite('codeSkill.4'),
      '- **A test on a span or a range asserts both ends.**' +
        cite('codeSkill.5'),
      '- **An inverse is emitted by whatever performed the transform, never inferred from its output.**' +
        cite('codeSkill.6'),
      '- **A body schema is emitted, never written** (`tests/architecture/theBodiesAreEmitted.test.ts`).' +
        cite('codeSkill.7'),
      "- **A check that only a hook runs is not a check.** A fixture root's own verifier is called by a test in the",
      '  suite (`tests/architecture/everyFixtureRootIsHeld.test.ts`).' +
        cite('codeSkill.8'),
      ...citeLines('codeSkill.8+'),
      '',
    ],
  },
  {
    heading: '## Code',
    lines: [
      '',
      '- **A name says what, never how many** (`tests/architecture/aNameSaysWhatNotHowMany.test.ts`).' +
        cite('codeSkill.9'),
      '- **A file a script generates goes into `scope.generated` the moment it exists.**' +
        cite('codeSkill.10'),
      '- **No comment describes the stage** (`tests/architecture/commentsAreInvariants.test.ts`).' +
        cite('codeSkill.11'),
      '- **A value a delayed read refreshes has a settling state the screen reads**, and its test asserts the',
      '  screen after the write lands and before the read.' +
        cite('codeSkill.12'),
      '',
    ],
  },
  {
    heading: '## Browser flows',
    lines: [
      '',
      '- **A drag in the browser tier goes through `e2e/framework/dragging.ts`**',
      '  (`tests/architecture/aDragGoesThroughTheFramework.test.ts`); a drag flow that stays green with its guard',
      '  out leaves the catalogue.' + cite('codeSkill.13'),
      "- **A flow reads a refusal's sentence through `say(key, facts)`**",
      '  (`tests/architecture/aFlowSaysARefusal.test.ts`).' +
        cite('codeSkill.14'),
      '- **When a ticket moves where a press lands, every flow that makes that press asserts the new landing.**',
      ' ' + cite('codeSkill.15'),
      '',
      '---',
      '',
    ],
  },
];
