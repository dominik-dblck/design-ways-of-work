/**
 * - `rules` · functions: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from './ruleTypes.ts';

const rules: RuleFile = {
  title: 'Functions',
  intro:
    '\nA call says what each value is, and a\nbody reads top to bottom. How long a function may be: `size.md`.\n',
  rows: [
    {
      rule: 'Past two parameters a function takes one object (`run({ files, tokensCss })`).',
      gate: '`argumentsPastTwoAreOneObject`',
      exceptions:
        'a callback whose shape its caller decides (`map`, `reduce`, `replace`)',
      why: 'The call names each value, and two values of one type cannot swap without a word from the compiler.',
    },
    {
      rule: 'No ternary chain three deep (`a ? x : b ? y : c ? z : w`): early returns, one `if` per case, or a lookup table when the cases are keys.',
      gate: '`noTernaryChains`',
      exceptions: '—',
      why: 'A chain is read by counting colons; a table is read by its keys.',
    },
    {
      rule: "A module's top level declares and reads nothing outside itself: no DOM, window or global read at load (D14).",
      gate: '`aModuleReadsNothingAtLoad`',
      exceptions:
        "an entry's footer, which the build writes · a file open on the sheet, named with its finding",
      why: 'Importing a file writes nothing and reads nothing, so the build side imports it as a module.',
    },
  ],
  outro: '',
};

export { rules };
