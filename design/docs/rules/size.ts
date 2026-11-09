/**
 * - `rules` · size: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/size.ts';

const rules = ruleFileFor({
  side: 'design',
  shared,
  intro: '',
  rows: [{ rule: 'A split file is named by the job it holds, never by a number (`rowsTwo`, `part3`).', gate: 'ESLint `wow/file-names-its-purpose`', exceptions: '—', why: 'A number says where the file was cut, not what it holds; the reader opens every part to find one.' }],
  outro: '',
});

export { rules };
