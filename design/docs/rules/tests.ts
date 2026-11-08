/**
 * - `rules` · tests: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/tests.ts';

// prettier-ignore
const rules = ruleFileFor({
  side: 'design',
  shared,
  intro: 'A test sits where its project reads it and\nproves something that can fail.',
  rows: [
    { rule: 'A test lives under `tests/`: a scan of the code in `tests/architecture/`, a test of a sheet file in `tests/sheet/`; the way of working\'s shared tests under `shared/tests/`.', gate: '`aTestLivesUnderTests` · `review` (which folder)', exceptions: '—', why: { shared: 'pathIsTier' } },
    { rule: 'A file that moves to TypeScript is held to the old file\'s behaviour, its outputs compared as JSON over broad inputs, before the old file goes.', gate: '`review`', exceptions: '—', why: 'The move changes the language, never the answer.' },
  ],
  outro: '',
});

export { rules };
