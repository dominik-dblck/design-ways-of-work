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
    { rule: 'A skill\'s entry (`SKILL.md`, `_shared.md`, a command) holds at most 2000 words.', gate: '`everySkillIsShort`', exceptions: 'the files on its list, which only shrink · the ticket skills also keep their pipeline\'s 100 lines', why: 'An entry is read whole on every run, and its words are context the work does not get.' },
    { rule: 'A file an entry loads that runs past 100 lines opens with `## Contents`.', gate: '`everySkillIsShort`', exceptions: 'the files on its list, which leave it once they have one', why: 'A long file is often read in part; its contents show the whole scope to a partial read.' },
    { rule: 'An entry links every file it loads directly, one level deep.', gate: '`anEntryLinksWhatItLoads`', exceptions: '—', why: 'A file reached through another file is read in part, and what it holds is missed.' },
  ],
  outro: '',
};

export { rules };
