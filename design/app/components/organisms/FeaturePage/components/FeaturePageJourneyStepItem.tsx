/**
 * - `FeaturePageJourneyStepItem` · one step
 * - where, what is done and seen, the cases it covers
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { JourneyStepView } from '../../../../workspace/feature-view.ts';

function FeaturePageJourneyStepItem({
  step,
}: {
  readonly step: JourneyStepView;
}): ReactElement {
  return (
    <Stack spacing={0.5}>
      <Typography
        variant="overline"
        color="textSecondary"
      >{`${step.n} · ${step.where}`}</Typography>
      <Typography variant="body2">{step.does}</Typography>
      <Typography variant="body2" color="textSecondary">
        {step.sees}
      </Typography>
      {step.covers.length ? (
        <Stack
          direction="row"
          spacing={0.5}
          useFlexGap
          sx={{ flexWrap: 'wrap' }}
        >
          {step.covers.map((cover) => (
            <Chip
              key={cover.id}
              size="small"
              variant="outlined"
              color={cover.known ? 'default' : 'error'}
              label={`${cover.id} · ${cover.reach}`}
            />
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
}

export { FeaturePageJourneyStepItem };
