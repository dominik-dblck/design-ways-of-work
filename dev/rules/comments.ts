/**
 * - `rules` · comments: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/comments.ts';

// prettier-ignore
const rules = ruleFileFor({
  side: 'build',
  shared,
  intro: '`git log` and the work trail say when, who and why it was asked for.',
  rows: [],
  outro: '',
});

export { rules };
