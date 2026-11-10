/**
 * - `jumpsOf` · the page's jumps: each section, its word, its count
 */
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { FeatureView } from '../../../../workspace/featureView.ts';

function jumpsOf(
  view: FeatureView,
): readonly (readonly [string, string, number])[] {
  const cases = view.caseGroups.reduce(
    (total, group) => total + group.cases.length,
    0,
  );
  return [
    ['journeys', words.nav.journeys, view.journeys.length],
    ['api', words.nav.api, view.endpoints.length],
    ['cases', words.nav.cases, cases],
    ['fields', words.nav.fields, view.fieldKinds.length],
    ['decisions', words.nav.decisions, view.decisions.length],
    ['notes', words.nav.notes, view.notes?.sections.length ?? 0],
    ['combinations', words.nav.combinations, view.combinations.length],
  ];
}

export { jumpsOf };
