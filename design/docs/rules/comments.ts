/**
 * - `rules` · comments: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/comments.ts';
import type { RuleFile } from './ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Comments',
  intro: '\nThe default is none. The code and the\nfile\'s header say what; `git log`, the notebooks and `docs/process/decisions.ts` say when, who and why it was decided.\n',
  rows: [
    ...rowsFor('design', shared),
    { rule: 'A rule or a checklist line carries no history either: no date, ticket, criterion, attribution, stage, epic or finding code in its words or its why (D27).', gate: '`aRuleCarriesNoHistory`', exceptions: '—', why: 'A rule read with its incident is read as being about that incident; the history stays in `legacy/` and in git.' },
  ],
  outro: '',
};

export { rules };
