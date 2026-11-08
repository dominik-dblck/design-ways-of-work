/**
 * - `rules` · functions: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/functions.ts';
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Functions',
  intro: '\nA call says what each value is, and a body reads top to bottom. How long a function may be:\n`size.md`.\n',
  rows: [
    ...rowsFor('build', shared),
  ],
  outro: '',
};

export { rules };
