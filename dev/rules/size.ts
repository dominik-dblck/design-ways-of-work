/**
 * - `rules` · size: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/size.ts';
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Size',
  intro: '\nLimits count code: blank lines and comments do not count.\n',
  rows: [
    ...rowsFor('build', shared),
    { rule: 'An entry links every file it loads directly, one level deep.', gate: '`anEntryLinksWhatItLoads`', exceptions: '—', why: 'A file reached through another file is read in part, and what it holds is missed.' },
  ],
  outro: '',
};

export { rules };
