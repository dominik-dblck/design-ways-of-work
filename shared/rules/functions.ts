/**
 * - `shared` · functions: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'Past two parameters a function takes one object (`readSnapshots({ streamPrefix: \'\' })`).', why: 'The call names each value, and two values of one type cannot swap without a word from the compiler.', design: { gate: 'ESLint `no-restricted-syntax` (past two parameters)', exceptions: 'a callback whose shape its caller decides (`map`, `reduce`, `replace`)' }, build: { gate: '`argumentsPastTwoAreOneObject`', exceptions: 'a callback whose shape its caller decides (`map`, `reduce`, a React event handler)' } },
  { rule: 'No ternary chain three deep (`a ? x : b ? y : c ? z : w`): early returns, one `if` per case, or a lookup table when the cases are keys (`localesStateOf` in `packages/domain/gates/gateList.ts`).', why: 'A chain is read by counting colons; a table is read by its keys.', design: { gate: 'ESLint `no-restricted-syntax` (a chain three deep)', exceptions: '—' }, build: { gate: '`noTernaryChains`', exceptions: '—' } },
  { rule: 'A file that takes one object anywhere takes it everywhere: beside an export taking one object (`operation(at: { … })`), every export of two or more values takes one object too (every operation of the build side\'s store port is one).', why: 'One style per file, so nobody checks which style an operation is in before calling it.', design: { gate: 'ESLint `wow/one-call-style`', exceptions: 'a one-argument function · a file wholly by position' }, build: { gate: '`aFileTakesOneStyle`', exceptions: 'a one-argument function (`literally(specifier)`) · a file wholly by position (`filled(line, data)`) · the files on its list, which only shrink' } },
];

export { shared };
