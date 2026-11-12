/**
 * - `FeaturePageNoteItem` · one notebook line: its head in bold, its source a chip
 * - then its points
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { NoteLine } from '../../../../workspace/featureView.ts';
import { FeaturePageNotePoints } from './FeaturePageNotePoints.tsx';

interface FeaturePageNoteItemProps {
  readonly line: NoteLine;
}

function FeaturePageNoteItem({ line }: FeaturePageNoteItemProps): ReactElement {
  return (
    <Stack spacing={0.5}>
      {line.head || line.source ? (
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: 'wrap', alignItems: 'center' }}
        >
          {line.head ? (
            <Typography variant="subtitle2">{line.head}</Typography>
          ) : null}
          {line.source ? (
            <Chip size="small" variant="outlined" label={line.source} />
          ) : null}
        </Stack>
      ) : null}
      <FeaturePageNotePoints points={line.points} />
    </Stack>
  );
}

export { FeaturePageNoteItem };
