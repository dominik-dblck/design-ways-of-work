/**
 * - `FeaturePageJourneyItem` · one journey
 * - folded, its id, people and counts as chips, its goal; open, its steps and test
 */
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { JourneyCard } from '../../../../workspace/featureView.ts';
import { FeaturePageJourneyChips } from './FeaturePageJourneyChips.tsx';
import { FeaturePageJourneyStepItem } from './FeaturePageJourneyStepItem.tsx';

function FeaturePageJourneyItem({
  journey,
}: {
  readonly journey: JourneyCard;
}): ReactElement {
  return (
    <Accordion
      variant="outlined"
      disableGutters
      slotProps={{ transition: { unmountOnExit: true } }}
    >
      <AccordionSummary>
        <Stack spacing={1}>
          <FeaturePageJourneyChips journey={journey} />
          <Typography variant="subtitle1">{journey.goal}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {journey.steps.map((step) => (
            <FeaturePageJourneyStepItem key={step.n} step={step} />
          ))}
          <Typography variant="body2">
            <Typography
              component="span"
              variant="overline"
              color="textSecondary"
            >{`${words.journeys.test} · `}</Typography>
            {journey.test}
          </Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export { FeaturePageJourneyItem };
