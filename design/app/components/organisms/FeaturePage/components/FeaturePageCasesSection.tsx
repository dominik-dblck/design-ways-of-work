/**
 * - `FeaturePageCasesSection` · the epic's test cases by endpoint
 * - or of the one kind picked
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/feature-view.ts';
import type { CaseGroup } from '../../../../workspace/feature-view.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
import { FeaturePageCaseTable } from './FeaturePageCaseTable.tsx';

interface FeaturePageCasesSectionProps {
  readonly groups: readonly CaseGroup[];
  readonly kinds: readonly { readonly kind: string; readonly count: number }[];
}

function FeaturePageCasesSection({ groups, kinds }: FeaturePageCasesSectionProps): ReactElement {
  const [kind, setKind] = useState<string | null>(null);
  const total = kinds.reduce((sum, one) => sum + one.count, 0);
  const shown = groups
    .map((group) => ({ ...group, cases: group.cases.filter((one) => !kind || one.kind === kind) }))
    .filter((group) => group.cases.length > 0);
  return (
    <Stack spacing={1.5} id="cases">
      <SectionHead label={words.cases.label} note={words.cases.note} />
      <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Chip label={`${words.cases.all} · ${total}`} color={kind ? 'default' : 'primary'} onClick={() => setKind(null)} />
        {kinds.map((one) => (
          <Chip
            key={one.kind}
            label={`${one.kind} · ${one.count}`}
            color={kind === one.kind ? 'primary' : 'default'}
            onClick={() => setKind(one.kind)}
          />
        ))}
      </Stack>
      {shown.map((group) => (
        <FeaturePageCaseTable key={group.endpoint} group={group} />
      ))}
    </Stack>
  );
}

export { FeaturePageCasesSection };
