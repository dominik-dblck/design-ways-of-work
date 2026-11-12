/**
 * - `FeaturePageJourneyStepItem` · one step
 * - its number and where, what is done and seen, the cases it covers
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { JourneyStepView } from '../../../../workspace/featureView.ts';
import { FeaturePageStepCovers } from './FeaturePageStepCovers.tsx';

function FeaturePageJourneyStepItem({
  step,
}: {
  readonly step: JourneyStepView;
}): ReactElement {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
      <Chip
        size="small"
        color="primary"
        variant="outlined"
        label={step.n}
        sx={{ minWidth: 28 }}
      />
      <Stack spacing={0.75} sx={{ minWidth: 0 }}>
        <Chip
          size="small"
          label={step.where}
          sx={{ alignSelf: 'flex-start' }}
        />
        <Typography variant="body2">{step.does}</Typography>
        <Typography variant="body2" color="textSecondary">
          {`→ ${step.sees}`}
        </Typography>
        {step.covers.length ? (
          <FeaturePageStepCovers covers={step.covers} />
        ) : null}
      </Stack>
    </Stack>
  );
}

export { FeaturePageJourneyStepItem };
