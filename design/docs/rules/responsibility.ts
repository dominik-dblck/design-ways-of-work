/**
 * - `rules` · responsibility: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from './ruleTypes.ts';

const rules: RuleFile = {
  title: 'Responsibility',
  intro: '\nA file does one job, and its first\nlines say which.\n',
  rows: [
    {
      rule: 'A production file opens with a header of 1–3 bullets, each at most 80 characters.',
      gate: '`aFileStatesItsJob`',
      exceptions: 'generated files · tests',
      why: "A fourth bullet is the file's second job showing; the split goes there.",
    },
    {
      rule: 'Each bullet names, in backticks, the exports it describes; every exported value is in a bullet, and every name in backticks exists in the file.',
      gate: '`aFileStatesItsJob`',
      exceptions: 'exported types, the vocabulary of the bullets',
      why: 'A rename or a new export turns the gate red instead of leaving the header to lie.',
    },
    {
      rule: 'A file exports at most 15 values.',
      gate: '`aFileStatesItsJob`',
      exceptions:
        "exported types · generated files · an entry passing on its parts' values as its namespace, its bullets naming each part (D14)",
      why: 'Past 15 a file is a catalogue, and three bullets cannot say what it is.',
    },
    {
      rule: "A value a production file exports is read by another file: imported by name or through an entry's namespace (`PLANS.rules`), read through its global by a legacy page, or named by a ticket's read list (`docs/process/plans.ts · GUARDS`); one only its own file reads is not exported.",
      gate: '`anExportIsRead`',
      exceptions:
        "a tool's export its `yarn` script runs · an entry's name the build side reads, listed in the scan at its sha (D14)",
      why: "An export nothing reads is a door to nothing: its reader takes it for part of the file's offer.",
    },
    {
      rule: 'A sheet file is an entry `{home}/{name}.ts` and its parts in `{home}/{name}/` (`tools/layout.ts`); a part serves its entry, and another entry reads it through that entry (`./test-cases.ts`), never through its part.',
      gate: '`aPartServesItsEntry`',
      exceptions: '—',
      why: "The entry is the file's face (D13, D14); its parts can split and move behind it.",
    },
    {
      rule: "A tool sits in `tools/` behind a `yarn` script; a page's code is the sheet's, never a tool's.",
      gate: "`aToolIsAScript` · `review` (a page's code)",
      exceptions: 'a tool a git or Claude Code hook runs',
      why: 'A tool is run by hand and never published; a page reads only what the artifact holds.',
    },
  ],
  outro: '',
};

export { rules };
