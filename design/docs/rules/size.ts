/**
 * - `rules` · size: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/size.ts';
import type { RuleFile } from './ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Size',
  intro: '\nLimits count code: blank lines and comments\ndo not count.\n',
  rows: [
    ...rowsFor('design', shared),
    { rule: 'A split file is named by the job it holds, never by a number (`rowsTwo`, `part3`).', gate: '`aFileNamesItsPurpose`', exceptions: '—', why: 'A number says where the file was cut, not what it holds; the reader opens every part to find one.' },
    { rule: 'A skill holds at most 2000 words; `CLAUDE.md` at most 1000.', gate: '`everySkillIsShort`', exceptions: '—', why: 'A skill is read whole when it loads and `CLAUDE.md` on every turn: their words are the context they cost.' },
  ],
  outro: '',
};

export { rules };
