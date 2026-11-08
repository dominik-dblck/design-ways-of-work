/**
 * - `rules` · checks: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/checks.ts';

// prettier-ignore
const rules = ruleFileFor({
  side: 'build',
  shared,
  intro: '',
  rows: [],
  outro: '',
});

export { rules };
