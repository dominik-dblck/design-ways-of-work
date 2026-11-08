/**
 * - `FeaturePage` · the feature tabs, then the epic picked: every section of it in turn
 */
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { featureOf, firstEpic } from '../../workspace/feature-view.ts';
import { ApiSection } from './ApiSection.tsx';
import { CasesSection } from './CasesSection.tsx';
import { CombinationsSection } from './CombinationsSection.tsx';
import { DecisionsSection } from './DecisionsSection.tsx';
import { FeatureHead } from './FeatureHead.tsx';
import { FieldsSection } from './FieldsSection.tsx';
import { JourneysSection } from './JourneysSection.tsx';
import { NotesSection } from './NotesSection.tsx';
import { SourceSection } from './SourceSection.tsx';

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
