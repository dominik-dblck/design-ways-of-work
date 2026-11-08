/**
 * - `rules` · functions: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/functions.ts';
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Functions',
  intro: '\nA call says what each value is, and a body reads top to bottom. How long a function may be:\n`size.md`.\n',
  rows: [
    ...rowsFor('build', shared),
    { rule: 'A file that takes one object anywhere takes it everywhere: beside an `operation(at: { … })` export, every export of two or more values takes one object too (every operation of the store port is `operation(at: { … })`).', gate: '`aFileTakesOneStyle`', exceptions: 'a one-argument function (`literally(specifier)`) · a file wholly by position (`filled(line, data)`) · the files on its list, which only shrink', why: 'One style per file, so nobody checks which style an operation is in before calling it.' },
  ],
  outro: '',
};

export { rules };
