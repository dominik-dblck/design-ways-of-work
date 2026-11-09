/**
 * - `shared` · functions: title, opening, rules and reasons both sides share
 */
import type { SharedRules } from './sharedRuleTypes.ts';

const shared: SharedRules<never> = {
  title: 'Functions',
  opening: 'A call says what each value is, and a body reads top to bottom. How long a function may be: `size.md`.',
  rows: [
    { rule: "Past two parameters a function takes one object (`readSnapshots({ streamPrefix: '' })`).", why: 'The call names each value, and two values of one type cannot swap without a word from the compiler.', design: { gate: 'ESLint `no-restricted-syntax` (past two parameters)', exceptions: 'a callback whose shape its caller decides (`map`, `reduce`, `replace`)' }, build: { gate: '`argumentsPastTwoAreOneObject`', exceptions: 'a callback whose shape its caller decides (`map`, `reduce`, a React event handler)' } },
    { rule: 'No conditional nested in another (`a ? x : b ? y : z`, a ternary inside a template a ternary holds): a nested choice is an early return, a named part, or a lookup table when the cases are keys (`localesStateOf` in `packages/domain/gates/gateList.ts`).', why: 'A nested choice is read by holding its outer branch in mind; an early return or a table is read one case at a time.', design: { gate: 'ESLint `sonarjs/no-nested-conditional`', exceptions: '—' }, build: { gate: '`noTernaryChains`', exceptions: "until its port, where SonarJS's rule replaces it (its 26, 14 in production)" } },
    { rule: "A file that takes one object anywhere takes it everywhere: beside an export taking one object (`operation(at: { … })`), every export of two or more values takes one object too (every operation of the build side's store port is one).", why: 'One style per file, so nobody checks which style an operation is in before calling it.', design: { gate: 'ESLint `wow/one-call-style`', exceptions: 'a one-argument function · a file wholly by position' }, build: { gate: '`aFileTakesOneStyle`', exceptions: 'a one-argument function (`literally(specifier)`) · a file wholly by position (`filled(line, data)`) · the files on its list, which only shrink' } },
  ],
  whys: {},
};

export { shared };
