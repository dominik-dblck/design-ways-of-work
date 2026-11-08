/**
 * - `rules` · checks: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/checks.ts';
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Checks',
  intro: '\nWhich tool holds a rule, and what keeps the tools one system.\n',
  rows: [
    ...rowsFor('build', shared),
  ],
  outro: '',
};

export { rules };
