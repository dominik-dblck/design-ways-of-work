/**
 * - `FeaturePageCombinationTitle` · a combinations file, its call and criteria
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { CombinationView } from '../../../../workspace/featureView.ts';

function FeaturePageCombinationTitle({
  one,
}: {
  readonly one: CombinationView;
}): ReactElement {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      useFlexGap
      sx={{ alignItems: 'baseline', flexWrap: 'wrap' }}
    >
      <Typography variant="subtitle2" sx={{ fontFamily: 'monospace' }}>
        {one.file}
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
      >{`${one.call} · ${one.criteria}`}</Typography>
    </Stack>
  );
}

export { FeaturePageCombinationTitle };
