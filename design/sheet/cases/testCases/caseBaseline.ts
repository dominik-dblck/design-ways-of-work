/**
 * - `flat`, `casesAddedRemoved`, `uncovered` · all cases, what moved, unwalked
 */
import { needsJourney } from './caseReach.ts';
import type {
  BaselineCase,
  CaseChanges,
  EndpointGroup,
  Journey,
  TestCase,
} from './testCasesTypes.ts';

function flat(groups?: readonly EndpointGroup[] | null): TestCase[] {
  return (groups ?? []).flatMap((group) => group.cases);
}

function casesAddedRemoved(
  before?: readonly BaselineCase[] | null,
  now?: readonly BaselineCase[] | null,
): CaseChanges {
  const was = new Map(
    (before ?? []).map((testCase) => [testCase.id, testCase]),
  );
  const is = new Map((now ?? []).map((testCase) => [testCase.id, testCase]));
  const added = (now ?? []).filter((testCase) => !was.has(testCase.id));
  const gone = (before ?? []).filter((testCase) => !is.has(testCase.id));
  const changed = (now ?? []).filter((testCase) => {
    const old = was.get(testCase.id);
    return old !== undefined && old.digest !== testCase.digest;
  });
  const renamed = gone.flatMap((old) => {
    const found = added.find(
      (testCase) =>
        testCase.endpoint === old.endpoint &&
        testCase.kind === old.kind &&
        testCase.then === old.then,
    );
    return found ? [{ from: old.id, to: found.id }] : [];
  });
  return { added, changed, gone, renamed };
}

function uncovered(
  groups?: readonly EndpointGroup[] | null,
  journeys?: readonly Journey[] | null,
): TestCase[] {
  const hit = new Set(
    (journeys ?? []).flatMap((journey) => journey.covers ?? []),
  );
  return flat(groups).filter(
    (testCase) => needsJourney(testCase) && !hit.has(testCase.id),
  );
}

export { casesAddedRemoved, flat, uncovered };
