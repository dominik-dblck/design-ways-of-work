/**
 * - `JourneysSection` · how far the journeys cover the epic, then each journey in turn
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../workspace/feature-view.ts';
import type { FeatureView } from '../../workspace/feature-view.ts';
import { SectionHead } from '../common/SectionHead.tsx';
import { CoverPanel } from './CoverPanel.tsx';
import { JourneyItem } from './JourneyItem.tsx';

interface JourneysSectionProps {
  readonly view: FeatureView;
}

function JourneysSection({ view }: JourneysSectionProps): ReactElement {
  return (
    <Stack spacing={1.5} id="journeys">
      <SectionHead {...words.journeys} />
      {view.cover ? <CoverPanel cover={view.cover} /> : null}
      {view.journeys.length === 0 ? (
        <Typography variant="body2" color="textSecondary">{words.journeys.none}</Typography>
      ) : (
        <Stack spacing={1}>
          {view.journeys.map((journey) => (
            <JourneyItem key={journey.id} journey={journey} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export { JourneysSection };
