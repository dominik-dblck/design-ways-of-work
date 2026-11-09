/**
 * - `rules` · functions: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/functions.ts';

const rules = ruleFileFor({
  side: 'design',
  shared,
  intro: '',
  rows: [{ rule: "A module's top level declares and reads nothing outside itself: no DOM, window or global read at load (D14).", gate: 'ESLint `wow/reads-nothing-at-load`', exceptions: "an entry's footer, which the build writes · a file open on the sheet, named with its finding", why: 'Importing a file writes nothing and reads nothing, so the build side imports it as a module.' }],
  outro: '',
});

export { rules };
