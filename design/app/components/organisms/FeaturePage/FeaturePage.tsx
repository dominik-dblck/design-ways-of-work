/**
 * - `FeaturePage` · the feature tabs, then the epic picked, section by section
 */
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { featureOf, firstEpic } from '../../../workspace/feature-view.ts';
import { ApiSection } from './components/ApiSection.tsx';
import { CasesSection } from './components/CasesSection.tsx';
import { CombinationsSection } from './components/CombinationsSection.tsx';
import { DecisionsSection } from './components/DecisionsSection.tsx';
import { FeatureHead } from './components/FeatureHead.tsx';
import { FieldsSection } from './components/FieldsSection.tsx';
import { JourneysSection } from './components/JourneysSection.tsx';
import { NotesSection } from './components/NotesSection.tsx';
import { SourceSection } from './components/SourceSection.tsx';

function FeaturePage(): ReactElement {
  const [epic, setEpic] = useState(firstEpic() ?? '');
  const view = useMemo(() => featureOf(epic), [epic]);
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <SourceSection />
        <FeatureHead view={view} onEpic={setEpic} />
        <JourneysSection view={view} />
        <ApiSection endpoints={view.endpoints} />
        <CasesSection key={view.epic} groups={view.caseGroups} kinds={view.caseKinds} />
        <FieldsSection view={view} />
        <DecisionsSection sections={view.decisions} />
        <NotesSection notes={view.notes} />
        <CombinationsSection view={view} />
      </Stack>
    </Container>
  );
}

export { FeaturePage };
