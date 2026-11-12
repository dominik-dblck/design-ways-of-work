/**
 * - `FeaturePageCasesSection` · the epic's test cases, folded by endpoint
 * - narrowed to a kind when one is picked
 */
import { useState } from 'react';
import type { ReactElement } from 'react';
import { contractWords } from '../../../../workspace/contractView.ts';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { CaseGroup } from '../../../../workspace/featureView.ts';
import { FoldList } from '../../../molecules/FoldList/index.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { FeaturePageCaseHead } from './FeaturePageCaseHead.tsx';
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
      <FoldList
        {...contractWords.folds}
        folds={shown.map((group) => ({
          id: `cases-${group.endpoint}`,
          head: <FeaturePageCaseHead group={group} />,
          body: <FeaturePageCaseTable group={group} />,
        }))}
      />
    </FoldSection>
  );
}

export { FeaturePageCasesSection };
