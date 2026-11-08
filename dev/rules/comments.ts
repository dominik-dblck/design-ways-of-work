/**
 * - `rules` · comments: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/comments.ts';
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Comments',
  intro: '\nThe default is none. The code and the file\'s header say what; `git log` and the work trail say when,\nwho and why it was asked for.\n',
  rows: [
    ...rowsFor('build', shared),
  ],
  outro: '',
};

export { rules };
