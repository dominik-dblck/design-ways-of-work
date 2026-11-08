/**
 * - `shared` · functions: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'Past two parameters a function takes one object (`readSnapshots({ streamPrefix: \'\' })`).', why: 'The call names each value, and two values of one type cannot swap without a word from the compiler.', design: { gate: '`argumentsPastTwoAreOneObject`', exceptions: 'a callback whose shape its caller decides (`map`, `reduce`, `replace`)' }, build: { gate: '`argumentsPastTwoAreOneObject`', exceptions: 'a callback whose shape its caller decides (`map`, `reduce`, a React event handler)' } },
  { rule: 'No ternary chain three deep (`a ? x : b ? y : c ? z : w`): early returns, one `if` per case, or a lookup table when the cases are keys (`localesStateOf` in `packages/domain/gates/gateList.ts`).', why: 'A chain is read by counting colons; a table is read by its keys.', design: { gate: '`noTernaryChains`', exceptions: '—' }, build: { gate: '`noTernaryChains`', exceptions: '—' } },
];

export { shared };
