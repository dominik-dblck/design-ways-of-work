/**
 * - `FeaturePageJourneysSection` · how far the journeys cover the epic
 * - then each journey
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { FeatureView } from '../../../../workspace/featureView.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { FeaturePageCoverPanel } from './FeaturePageCoverPanel.tsx';
import { FeaturePageJourneyItem } from './FeaturePageJourneyItem.tsx';

interface FeaturePageJourneysSectionProps {
  readonly view: FeatureView;
}

function FeaturePageJourneysSection({
  view,
}: FeaturePageJourneysSectionProps): ReactElement {
  return (
    <FoldSection
      id="journeys"
      label={words.journeys.label}
      note={words.journeys.note}
      count={view.journeys.length}
    >
      {view.cover ? <FeaturePageCoverPanel cover={view.cover} /> : null}
      {view.journeys.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          {words.journeys.none}
        </Typography>
      ) : (
        <Stack spacing={1}>
          {view.journeys.map((journey) => (
            <FeaturePageJourneyItem key={journey.id} journey={journey} />
          ))}
        </Stack>
      )}
    </FoldSection>
  );
}

export { FeaturePageJourneysSection };
