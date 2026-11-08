/**
 * - `rules` · functions: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/functions.ts';
import type { RuleFile } from './ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Functions',
  intro: '\nA call says what each value is, and a\nbody reads top to bottom. How long a function may be: `size.md`.\n',
  rows: [
    ...rowsFor('design', shared),
    { rule: 'A module\'s top level declares and reads nothing outside itself: no DOM, window or global read at load (D14).', gate: '`aModuleReadsNothingAtLoad`', exceptions: 'an entry\'s footer, which the build writes · a file open on the sheet, named with its finding', why: 'Importing a file writes nothing and reads nothing, so the build side imports it as a module.' },
  ],
  outro: '',
};

export { rules };
