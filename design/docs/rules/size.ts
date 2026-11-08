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
    { rule: 'A split file is named by the job it holds, never by a number (`rowsTwo`, `part3`).', gate: 'ESLint `wow/file-names-its-purpose`', exceptions: '—', why: 'A number says where the file was cut, not what it holds; the reader opens every part to find one.' },
  ],
  outro: '',
};

export { rules };
