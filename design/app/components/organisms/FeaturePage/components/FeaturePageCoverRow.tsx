/**
 * - `FeaturePageCoverRow` · one cover line: its title, its chip, its share
 */
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { CoverLine } from '../../../../workspace/feature-view.ts';

function FeaturePageCoverRow({ line }: { readonly line: CoverLine }): ReactElement {
  return (
    <Stack spacing={0.75}>
      <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="body2">{line.title}</Typography>
        <Chip size="small" color={line.ok ? 'success' : 'warning'} label={line.chip} />
      </Stack>
      <LinearProgress variant="determinate" value={line.share} color={line.ok ? 'success' : 'warning'} />
    </Stack>
  );
}

export { FeaturePageCoverRow };
