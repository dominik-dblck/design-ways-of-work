/**
 * - `rules` · constants: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/constants.ts';

// prettier-ignore
const rules = ruleFileFor({
  side: 'design',
  shared,
  intro: 'Values the code reads and never\ncomputes: the words a person reads, the keys a page switches on.',
  rows: [
    { rule: 'A table of words is a part of its own (`pageWords.ts`) whose values are UPPER_SNAKE, read through its entry.', gate: 'ESLint `no-restricted-syntax` (the case of a name)', exceptions: '—', why: 'The case says a value is read, not called.' },
  ],
  outro: '',
});

export { rules };
