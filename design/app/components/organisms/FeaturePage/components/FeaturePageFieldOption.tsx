/**
 * - `FeaturePageFieldOption` · one option a field may set, its type and meaning
 */
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { FieldOptionView } from '../../../../workspace/feature-view.ts';
import { radiusOf } from '../../../../theme/tokenReads.ts';

function FeaturePageFieldOption({
  one,
}: {
  readonly one: FieldOptionView;
}): ReactElement {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 1.5, borderRadius: radiusOf('uiRContainer') }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {one.name}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ fontFamily: 'monospace' }}
        >
          {one.ts}
        </Typography>
      </Stack>
      <Typography variant="caption" color="textSecondary" component="div">
        {one.means}
      </Typography>
    </Paper>
  );
}

export { FeaturePageFieldOption };
