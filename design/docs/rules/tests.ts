/**
 * - `rules` · tests: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from './ruleTypes.ts';

const rules: RuleFile = {
  title: 'Tests',
  intro:
    '\nA test sits where its project reads it and\nproves something that can fail.\n',
  rows: [
    {
      rule: 'A test lives under `tests/`: a scan of the code in `tests/architecture/`, a test of a sheet file in `tests/sheet/`.',
      gate: '`aTestLivesUnderTests` · `review` (which folder)',
      exceptions: '—',
      why: 'The place of a file is its tier, so a test cannot quietly run somewhere else.',
    },
    {
      rule: 'A test imports the real function and asserts exact values; it never copies the logic, never mocks the module under test, and is seen red once with its condition broken.',
      gate: '`review`',
      exceptions: '—',
      why: 'A test that cannot fail proves nothing.',
    },
    {
      rule: 'A scan proves itself on a synthetic `{ path, text }`, never on a file planted in the tree.',
      gate: '`review`',
      exceptions: '—',
      why: 'A planted file is read by every other scan.',
    },
    {
      rule: 'A scan that lands on code already breaking it starts from a list in `tests/architecture/baselines/`, written once with `BASELINES=write`; the list only shrinks.',
      gate: '`baseline`',
      exceptions: '—',
      why: 'A gate that waits for the code to be clean never lands; one that lets the list grow holds nothing.',
    },
    {
      rule: "A file that moves to TypeScript is held to the old file's behaviour, its outputs compared as JSON over broad inputs, before the old file goes.",
      gate: '`review`',
      exceptions: '—',
      why: 'The move changes the language, never the answer.',
    },
    {
      rule: 'A skipped test names what it waits on.',
      gate: '`aTestLivesUnderTests`',
      exceptions: '—',
      why: 'A skip without its reason becomes permanent.',
    },
    {
      rule: 'Production reads no test switch.',
      gate: '`aTestLivesUnderTests`',
      exceptions: '—',
      why: 'A branch only a test takes ships untested in the other direction.',
    },
  ],
  outro: '',
};

export { rules };
