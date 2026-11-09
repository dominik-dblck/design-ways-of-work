/**
 * - `FeaturePageKindChips` · all the cases, or one kind of them, picked
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/feature-view.ts';

interface FeaturePageKindChipsProps {
  readonly kinds: readonly { readonly kind: string; readonly count: number }[];
  readonly kind: string | null;
  readonly onPick: (kind: string | null) => void;
}

function FeaturePageKindChips({
  kinds,
  kind,
  onPick,
}: FeaturePageKindChipsProps): ReactElement {
  const total = kinds.reduce((sum, one) => sum + one.count, 0);
  return (
    <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap' }}>
      <Chip
        label={`${words.cases.all} · ${total}`}
        color={kind ? 'default' : 'primary'}
        onClick={() => onPick(null)}
      />
      {kinds.map((one) => (
        <Chip
          key={one.kind}
          label={`${one.kind} · ${one.count}`}
          color={kind === one.kind ? 'primary' : 'default'}
          onClick={() => onPick(one.kind)}
        />
      ))}
    </Stack>
  );
}

export { FeaturePageKindChips };
