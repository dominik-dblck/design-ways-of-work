/**
 * - `rules` · size: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/size.ts';

const rules = ruleFileFor({
  side: 'build',
  shared,
  intro: '',
  rows: [{ rule: 'An entry links every file it loads directly, one level deep.', gate: '`anEntryLinksWhatItLoads`', exceptions: '—', why: 'A file reached through another file is read in part, and what it holds is missed.' }],
  outro: '',
});

export { rules };
