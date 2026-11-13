/**
 * - `caseGroupsOf`, `caseKindsOf` · an epic's test cases by endpoint, by kind
 * - `criterionGroupsOf` · a ticket's criteria that name their test, one case each
 */
import type * as TEST_CASES from '../../../sheet/cases/testCases.ts';
import type { CaseGroup, CaseRow } from './featureTypes.ts';

type Groups = ReturnType<typeof TEST_CASES.casesOfEpic>;

interface CriteriaOf {
  readonly id: string;
  readonly title: string;
  readonly acceptance: readonly string[];
}

// a criterion is its claim, then ` · test (tier…): ` and what the test asserts
const A_TEST = ' · test (';
const A_TIER = /^[a-z-]+/;
const A_LEAD = /^[\s:—-]+/;

// where the parenthesis opened at `from` closes, a nested one counted
function closeOf(text: string, from: number): number {
  let depth = 0;
  for (let at = from; at < text.length; at += 1) {
    if (text[at] === '(') depth += 1;
    if (text[at] === ')') depth -= 1;
    if (depth === 0) return at;
  }
  return text.length;
}

// the tier is the kind; whatever else the parenthesis says leads the assertion, no word lost
function criterionCaseOf(text: string, at: number): CaseRow | null {
  const start = text.indexOf(A_TEST);
  if (start === -1) return null;
  const open = start + A_TEST.length - 1;
  const close = closeOf(text, open);
  const inside = text.slice(open + 1, close);
  const tier = A_TIER.exec(inside)?.[0] ?? '';
  const detail = inside.slice(tier.length).replace(A_LEAD, '');
  const asserts = text.slice(close + 1).replace(A_LEAD, '');
  return {
    id: `c${at + 1}`,
    kind: tier,
    when: text.slice(0, start),
    then: [detail, asserts].filter(Boolean).join(' · '),
    reach: '—',
    compound: false,
  };
}

// one group per ticket, its criteria in their order; a criterion naming no test is no case
function criterionGroupsOf(
  tickets: readonly CriteriaOf[],
): readonly CaseGroup[] {
  return tickets
    .map((ticket) => ({
      endpoint: ticket.id,
      route: ticket.title,
      cases: ticket.acceptance.flatMap((text, at) => {
        const one = criterionCaseOf(text, at);
        return one ? [one] : [];
      }),
    }))
    .filter((group) => group.cases.length > 0);
}

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

export { caseGroupsOf, caseKindsOf, criterionGroupsOf };
