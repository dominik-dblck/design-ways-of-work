/**
 * - `FeaturePageCasesSection` · the epic's test cases by endpoint
 * - or of the one kind picked
 */
import { useState } from 'react';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { CaseGroup } from '../../../../workspace/featureView.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { FeaturePageCaseTable } from './FeaturePageCaseTable.tsx';
import { FeaturePageKindChips } from './FeaturePageKindChips.tsx';

interface FeaturePageCasesSectionProps {
  readonly groups: readonly CaseGroup[];
  readonly kinds: readonly { readonly kind: string; readonly count: number }[];
}

function FeaturePageCasesSection({
  groups,
  kinds,
}: FeaturePageCasesSectionProps): ReactElement {
  const [kind, setKind] = useState<string | null>(null);
  const total = kinds.reduce((sum, one) => sum + one.count, 0);
  const shown = groups
    .map((group) => ({
      ...group,
      cases: group.cases.filter((one) => !kind || one.kind === kind),
    }))
    .filter((group) => group.cases.length > 0);
  return (
    <FoldSection
      id="cases"
      label={words.cases.label}
      note={words.cases.note}
      count={total}
    >
      <FeaturePageKindChips kinds={kinds} kind={kind} onPick={setKind} />
      {shown.map((group) => (
        <FeaturePageCaseTable key={group.endpoint} group={group} />
      ))}
    </FoldSection>
  );
}

export { FeaturePageCasesSection };
