/**
 * - `FeaturePageCaseHead` · an endpoint's name and route
 * - and how many of its cases the pick leaves
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { CaseGroup } from '../../../../workspace/featureView.ts';

function FeaturePageCaseHead({
  group,
}: {
  readonly group: CaseGroup;
}): ReactElement {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Typography variant="subtitle2">{`${group.endpoint} · ${group.route}`}</Typography>
      <Chip size="small" variant="outlined" label={group.cases.length} />
    </Stack>
  );
}

export { FeaturePageCaseHead };
