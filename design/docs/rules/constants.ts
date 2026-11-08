/**
 * - `rules` · constants: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/constants.ts';
import type { RuleFile } from './ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Constants',
  intro: '\nValues the code reads and never\ncomputes: the words a person reads, the keys a page switches on.\n',
  rows: [
    ...rowsFor('design', shared),
    { rule: 'A table of words is a part of its own (`pageWords.ts`) whose values are UPPER_SNAKE, read through its entry.', gate: 'ESLint `no-restricted-syntax` (the case of a name)', exceptions: '—', why: 'The case says a value is read, not called.' },
  ],
  outro: '',
};

export { rules };
