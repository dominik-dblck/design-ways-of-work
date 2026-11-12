/**
 * - `FeaturePageStepCovers` · the cases a step makes happen, tinted by their reach
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import type { JourneyStepView } from '../../../../workspace/featureView.ts';
import { reachToneOf } from '../../../../theme/tones.ts';

interface FeaturePageStepCoversProps {
  readonly covers: JourneyStepView['covers'];
}

// a case the sheet does not know is drawn as an error
function FeaturePageStepCovers({
  covers,
}: FeaturePageStepCoversProps): ReactElement {
  return (
    <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {covers.map((cover) => (
        <Chip
          key={cover.id}
          size="small"
          variant="outlined"
          color={cover.known ? reachToneOf(cover.reach) : 'error'}
          label={`${cover.id} · ${cover.reach}`}
        />
      ))}
    </Stack>
  );
}

export { FeaturePageStepCovers };
