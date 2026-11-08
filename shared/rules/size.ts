/**
 * - `shared` · size: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'A file holds at most 200 lines of code.', why: 'A file past 200 lines holds a second job; the split is where that job gets its name.', design: { gate: 'ESLint `max-lines`', exceptions: 'tests · generated files' }, build: { gate: 'ESLint `max-lines`', exceptions: 'tests · fixtures · generated files · `eslint-suppressions.json`, which only shrinks' } },
  { rule: 'A function holds at most 40 lines of code, a React component included.', why: 'Past 40 lines a function is read by scrolling; its steps want names of their own.', design: { gate: 'ESLint `max-lines-per-function`', exceptions: 'tests' }, build: { gate: 'ESLint `max-lines-per-function`', exceptions: 'tests · `eslint-suppressions.json`' } },
  { rule: 'A function\'s complexity is at most 10.', why: 'Past ten paths a function is run in the head to be read; early returns or a lookup table read at a glance.', design: { gate: 'ESLint `complexity`', exceptions: 'tests' }, build: { gate: 'ESLint `complexity`', exceptions: 'tests · `eslint-suppressions.json`' } },
  { rule: 'A block nests at most 3 deep.', why: 'A fourth level is a function that has not been extracted yet.', design: { gate: 'ESLint `max-depth`', exceptions: 'tests' }, build: { gate: 'ESLint `max-depth`', exceptions: 'tests · `eslint-suppressions.json`' } },
  { rule: 'A rule file in `docs/rules/` holds at most 200 lines.', why: 'A rule file is loaded by every review of its layer; past 200 lines it holds two concerns.', design: { gate: '`everyRuleHasAGate`', exceptions: '—' }, build: { gate: '`everyRuleHasAGate`', exceptions: '—' } },
];

export { shared };
