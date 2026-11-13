/**
 * - `FeaturePageJourneyChips` · a journey's id, its people by initials, its counts
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import type { ReactElement } from 'react';
import type { JourneyCard } from '../../../../workspace/featureView.ts';

interface FeaturePageJourneyChipsProps {
  readonly journey: JourneyCard;
}

// each person's name shows on hover over their initials
function FeaturePageJourneyChips({
  journey,
}: FeaturePageJourneyChipsProps): ReactElement {
  return (
    <Stack
      direction="row"
      spacing={0.75}
      useFlexGap
      sx={{ flexWrap: 'wrap', alignItems: 'center' }}
    >
      <Chip size="small" color="primary" label={journey.id} />
      {journey.people.map((person) => (
        <Tooltip key={person.initials} title={person.name}>
          <Chip
            size="small"
            color="info"
            variant="outlined"
            label={person.initials}
          />
        </Tooltip>
      ))}
      {journey.counts.map((count) => (
        <Chip key={count} size="small" variant="outlined" label={count} />
      ))}
    </Stack>
  );
}

export { FeaturePageJourneyChips };
