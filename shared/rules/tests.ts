/**
 * - `shared` · tests: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'A test imports the real function and asserts exact values; it never copies the logic, never mocks the module under test, and is seen red once with its condition broken.', why: 'A test that cannot fail proves nothing.', design: { gate: 'ESLint `wow/no-mock-of-its-subject` · `review`', exceptions: '—' }, build: { gate: '`noTestMocksItsSubject` · `review`', exceptions: '—' } },
  { rule: 'A scan proves itself on a synthetic `{ path, text }`, never on a file planted in the tree.', why: 'Suites walk the tree in parallel, and a planted file is read by every one of them.', design: { gate: '`review`', exceptions: '—' }, build: { gate: '`aScanPlantsNothing`', exceptions: '`baseline.ts`, which writes the lists under `BASELINES=write`' } },
  { rule: 'A scan that lands on code already breaking it starts from a list in `tests/architecture/baselines/`, written once with `BASELINES=write`; the list only shrinks: a new offender is red, and so is a fixed one still listed, until the next write drops it.', why: 'A gate that waits for the code to be clean never lands; one that lets the list grow holds nothing.', design: { gate: '`baseline`', exceptions: '—' }, build: { gate: '`baseline.test`', exceptions: '—' } },
  { rule: 'A skipped test names what it waits on.', why: 'A skip without its reason becomes permanent.', design: { gate: '`aTestLivesUnderTests`', exceptions: '—' }, build: { gate: '`theSeventhTier` (the `postgres` tiers) · `review`', exceptions: '—' } },
  { rule: 'Production reads no test switch.', why: 'A branch only a test takes ships untested in the other direction.', design: { gate: 'ESLint `wow/production-syntax` (a test switch)', exceptions: '—' }, build: { gate: '`noTestOnlyBranchInProduction`', exceptions: '—' } },
  { rule: 'A drawn element is asserted present one way, `expect(getBy…(…)).toBeTruthy()`.', why: 'A `getBy` already throws when nothing is drawn; `toBeDefined` and `not.toBeNull` beside it are one fact in three spellings.', design: { gate: 'ESLint `no-restricted-syntax` (a presence)', exceptions: '—' }, build: { gate: '`aPresenceIsReadOneWay`', exceptions: 'a `queryBy…` asserted with a message, which names what is missing instead of throwing' } },
  { rule: 'Time is moved with fake timers (`vi.useFakeTimers`, `page.clock`), never waited out.', why: 'A wait is slow and still flaky; a moved clock is neither.', design: { gate: 'ESLint `no-restricted-syntax` (a wait)', exceptions: '—' }, build: { gate: '`timeIsMovedNotWaited`', exceptions: 'a race against a real database (`deleteAssetRoute`\'s `aWhile`, the store contract\'s `holding`)' } },
];

export { shared };
