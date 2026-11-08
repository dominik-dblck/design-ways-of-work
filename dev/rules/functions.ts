/**
 * - `rules` · functions: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Functions',
  intro: '\nA call says what each value is, and a body reads top to bottom. How long a function may be:\n`size.md`.\n',
  rows: [
    { rule: 'Past two parameters a function takes one object (`readSnapshots({ streamPrefix: \'\' })`).', gate: '`argumentsPastTwoAreOneObject`', exceptions: 'a callback whose shape its caller decides (`map`, `reduce`, a React event handler)', why: 'The call names each value, and two values of one type cannot swap without a word from the compiler.' },
    { rule: 'A file that takes one object anywhere takes it everywhere: beside an `operation(at: { … })` export, every export of two or more values takes one object too (every operation of the store port is `operation(at: { … })`).', gate: '`aFileTakesOneStyle`', exceptions: 'a one-argument function (`literally(specifier)`) · a file wholly by position (`filled(line, data)`) · the files on its list, which only shrink', why: 'One style per file, so nobody checks which style an operation is in before calling it.' },
    { rule: 'No ternary chain three deep (`a ? x : b ? y : c ? z : w`): early returns, one `if` per case, or a lookup table when the cases are keys (`localesStateOf` in `packages/domain/gates/gateList.ts`).', gate: '`noTernaryChains`', exceptions: '—', why: 'A chain is read by counting colons; a table is read by its keys.' },
  ],
  outro: '',
};

export { rules };
