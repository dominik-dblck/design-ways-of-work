/**
 * - `rules` · comments: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/comments.ts';

const rules = ruleFileFor({
  side: 'design',
  shared,
  intro: '`git log`, the notebooks and `docs/process/decisions.ts` say when, who and why it was decided.',
  rows: [{ rule: 'A rule or a checklist line carries no history either: no date, ticket, criterion, attribution, stage, epic or finding code in its words or its why (W55).', gate: '`aRuleCarriesNoHistory`', exceptions: '—', why: 'A rule read with its incident is read as being about that incident; the history stays in `legacy/` and in git.' }],
  outro: '',
});

export { rules };
