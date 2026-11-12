/**
 * - `FeaturePage` · the head with its tabs, then the epic picked, section by section
 */
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { featureOf } from '../../../workspace/featureView.ts';
import type { ProductView } from '../../../../tools/productTypes.ts';
import { FeaturePageApiSection } from './components/FeaturePageApiSection.tsx';
import { FeaturePageCasesSection } from './components/FeaturePageCasesSection.tsx';
import { FeaturePageCombinationsSection } from './components/FeaturePageCombinationsSection.tsx';
import { FeaturePageDecisionsSection } from './components/FeaturePageDecisionsSection.tsx';
import { FeaturePageHead } from './components/FeaturePageHead.tsx';
import { FeaturePageFieldsSection } from './components/FeaturePageFieldsSection.tsx';
import { FeaturePageJourneysSection } from './components/FeaturePageJourneysSection.tsx';
import { FeaturePageNotesSection } from './components/FeaturePageNotesSection.tsx';
import { useFeaturePageEpic } from './hooks/useFeaturePageEpic.ts';

// the product's states and counters come from the page's entry, never read here
function FeaturePage({ plugs }: { readonly plugs: ProductView }): ReactElement {
  const [epic, openEpic] = useFeaturePageEpic();
  const view = useMemo(() => featureOf(epic, plugs), [epic, plugs]);
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={1.5}>
        <FeaturePageHead view={view} onEpic={openEpic} />
        <FeaturePageJourneysSection view={view} />
        <FeaturePageApiSection endpoints={view.endpoints} />
        <FeaturePageCasesSection
          key={view.epic}
          groups={view.caseGroups}
          kinds={view.caseKinds}
        />
        <FeaturePageFieldsSection view={view} />
        <FeaturePageDecisionsSection sections={view.decisions} />
        <FeaturePageNotesSection notes={view.notes} />
        <FeaturePageCombinationsSection view={view} />
      </Stack>
    </Container>
  );
}

export { FeaturePage };
