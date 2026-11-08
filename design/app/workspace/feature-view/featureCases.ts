/**
 * - `caseGroupsOf`, `caseKindsOf` · an epic's test cases by endpoint, by kind
 */
import type * as TEST_CASES from '../../../sheet/cases/test-cases.ts';
import type { CaseGroup } from './featureTypes.ts';

type Groups = ReturnType<typeof TEST_CASES.casesOfEpic>;

function caseGroupsOf(groups: Groups): readonly CaseGroup[] {
  return groups.map((group) => ({
    endpoint: group.endpoint,
    route: group.route,
    cases: group.cases.map((one) => ({
      id: one.id.slice(group.endpoint.length + 1),
      kind: one.kind,
      when: one.when,
      then: one.then,
      reach: one.reach ?? '—',
      compound: Boolean(one.compound),
    })),
  }));
}

function caseKindsOf(
  groups: readonly CaseGroup[],
): readonly { readonly kind: string; readonly count: number }[] {
  const counts = new Map<string, number>();
  for (const group of groups)
    for (const one of group.cases)
      counts.set(one.kind, (counts.get(one.kind) ?? 0) + 1);
  return [...counts].map(([kind, count]) => ({ kind, count }));
}

export { caseGroupsOf, caseKindsOf };
