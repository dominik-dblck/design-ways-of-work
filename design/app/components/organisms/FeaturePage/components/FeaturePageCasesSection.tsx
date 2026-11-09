/**
 * - `FeaturePageCasesSection` · the epic's test cases by endpoint
 * - or of the one kind picked
 */
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/feature-view.ts';
import type { CaseGroup } from '../../../../workspace/feature-view.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
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
  const shown = groups
    .map((group) => ({
      ...group,
      cases: group.cases.filter((one) => !kind || one.kind === kind),
    }))
    .filter((group) => group.cases.length > 0);
  return (
    <Stack spacing={1.5} id="cases">
      <SectionHead label={words.cases.label} note={words.cases.note} />
      <FeaturePageKindChips kinds={kinds} kind={kind} onPick={setKind} />
      {shown.map((group) => (
        <FeaturePageCaseTable key={group.endpoint} group={group} />
      ))}
    </Stack>
  );
}

export { FeaturePageCasesSection };
