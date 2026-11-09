/**
 * - `FeaturePage` · the feature tabs, then the epic picked, section by section
 */
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { featureOf, firstEpic } from '../../../workspace/feature-view.ts';
import { FeaturePageApiSection } from './components/FeaturePageApiSection.tsx';
import { FeaturePageCasesSection } from './components/FeaturePageCasesSection.tsx';
import { FeaturePageCombinationsSection } from './components/FeaturePageCombinationsSection.tsx';
import { FeaturePageDecisionsSection } from './components/FeaturePageDecisionsSection.tsx';
import { FeaturePageHead } from './components/FeaturePageHead.tsx';
import { FeaturePageFieldsSection } from './components/FeaturePageFieldsSection.tsx';
import { FeaturePageJourneysSection } from './components/FeaturePageJourneysSection.tsx';
import { FeaturePageNotesSection } from './components/FeaturePageNotesSection.tsx';
import { FeaturePageSourceSection } from './components/FeaturePageSourceSection.tsx';

function FeaturePage(): ReactElement {
  const [epic, setEpic] = useState(firstEpic() ?? '');
  const view = useMemo(() => featureOf(epic), [epic]);
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <FeaturePageSourceSection />
        <FeaturePageHead view={view} onEpic={setEpic} />
        <FeaturePageJourneysSection view={view} />
        <FeaturePageApiSection endpoints={view.endpoints} />
        <FeaturePageCasesSection key={view.epic} groups={view.caseGroups} kinds={view.caseKinds} />
        <FeaturePageFieldsSection view={view} />
        <FeaturePageDecisionsSection sections={view.decisions} />
        <FeaturePageNotesSection notes={view.notes} />
        <FeaturePageCombinationsSection view={view} />
      </Stack>
    </Container>
  );
}

export { FeaturePage };
