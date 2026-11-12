/**
 * - `rules` · responsibility: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/responsibility.ts';

const rules = ruleFileFor({
  side: 'design',
  shared,
  intro: '',
  rows: [
    { rule: 'A sheet file is an entry `{home}/{name}.ts` and its parts in `{home}/{name}/` (`tools/layout.ts`); a part serves its entry, and another entry reads it through that entry (`./testCases.ts`), never through its part.', gate: 'ESLint `wow/parts-serve-their-entry`', exceptions: '—', why: "The entry is the file's face (W43, W44); its parts can split and move behind it." },
    { rule: "A tool sits in `tools/` behind a `yarn` script; a page's code is the sheet's, never a tool's.", gate: "knip `lint:exports` (a tool nothing runs) · `review` (a page's code)", exceptions: 'a tool a git or Claude Code hook runs', why: 'A tool is run by hand and never published; a page reads only what the artifact holds.' },
  ],
  outro: '',
});

export { rules };
