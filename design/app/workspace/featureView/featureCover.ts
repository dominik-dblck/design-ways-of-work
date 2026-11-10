/**
 * - `coverOf` · how far an epic's journeys cover its test cases and its 02a states
 */
import { check } from '../../../sheet/cases/journeys.ts';
import type * as TEST_CASES from '../../../sheet/cases/testCases.ts';
import { FEATURE_WORDS } from './featureWords.ts';
import type { CoverLine, CoverView } from './featureTypes.ts';

type Groups = ReturnType<typeof TEST_CASES.casesOfEpic>;
type Check = ReturnType<typeof check>;

// an uncovered case comes back as the test case itself, typed loosely by the check
const idOf = (found: unknown): string =>
  found !== null && typeof found === 'object' && 'id' in found
    ? String(found.id)
    : '—';

const shareOf = (covered: number, need: number): number =>
  need ? Math.round((covered / need) * 100) : 0;

function casesLine(found: Check): CoverLine {
  const bad =
    found.uncovered.length +
    found.dangling.length +
    found.people.length +
    found.keys.length;
  return {
    title: FEATURE_WORDS.cover.cases(found),
    chip: bad
      ? `${found.uncovered.length} uncovered · ${found.dangling.length} dangling`
      : FEATURE_WORDS.cover.allCovered,
    ok: bad === 0,
    share: shareOf(found.covered, found.need),
  };
}

function statesLine(states: NonNullable<Check['states']>): CoverLine | null {
  if (!states.need) return null;
  const bad =
    states.uncovered.length + states.dangling.length + states.changed.length;
  return {
    title: FEATURE_WORDS.cover.states(states.covered, states.need),
    chip: bad
      ? `${states.uncovered.length} unshown · ${states.dangling.length} gone · ${states.changed.length} changed`
      : FEATURE_WORDS.cover.allShown,
    ok: bad === 0,
    share: shareOf(states.covered, states.need),
  };
}

function problemsOf(found: Check): readonly string[] {
  const states = found.states;
  return [
    ...found.uncovered.map((one) => `uncovered · ${idOf(one)}`),
    ...found.dangling.map(
      (one) => `${one.journey} covers ${one.id} · no such test case`,
    ),
    ...found.people.map(
      (one) => `${one.journey} · ${one.who} · not in the directory`,
    ),
    ...found.keys.map(
      (one) => `${one.journey} · {refusal:${one.key}} · no such refusal`,
    ),
    ...(states?.uncovered ?? []).map((code) => `unshown state · ${code}`),
    ...(states?.dangling ?? []).map(
      (one) => `${one.journey} names ${one.code} · no such state`,
    ),
    ...(states?.changed ?? []).map(
      (one) =>
        `changed since the walk · ${one.code} · walk ${one.journeys.join(', ')} again`,
    ),
  ];
}

function coverOf(epic: string, groups: Groups): CoverView | null {
  if (!groups.length) return null;
  const found = check(epic, groups);
  return {
    cases: casesLine(found),
    states: found.states ? statesLine(found.states) : null,
    problems: problemsOf(found),
  };
}

export { coverOf };
