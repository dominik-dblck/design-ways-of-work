/**
 * - `FeatureHead` · eyebrow, title, what the page is, tabs, steps and jumps
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { features, featureWords as words } from '../../workspace/feature-view.ts';
import type { FeatureView } from '../../workspace/feature-view.ts';
import { FeatureSteps } from './FeatureSteps.tsx';

interface FeatureHeadProps {
  readonly view: FeatureView;
  readonly onEpic: (epic: string) => void;
}

function jumpsOf(view: FeatureView): readonly (readonly [string, string, number])[] {
  const cases = view.caseGroups.reduce((total, group) => total + group.cases.length, 0);
  return [
    ['journeys', words.nav.journeys, view.journeys.length],
    ['api', words.nav.api, view.endpoints.length],
    ['cases', words.nav.cases, cases],
    ['fields', words.nav.fields, view.fieldKinds.length],
    ['decisions', words.nav.decisions, view.decisions.length],
    ['notes', words.nav.notes, view.notes?.sections.length ?? 0],
    ['components', words.nav.components, view.components.length],
    ['screens', words.nav.screens, view.screens.length],
    ['combinations', words.nav.combinations, view.combinations.length],
  ];
}

function FeatureHead({ view, onEpic }: FeatureHeadProps): ReactElement {
  return (
    <Stack spacing={1.5}>
      <Typography variant="overline" color="textSecondary">{words.eyebrow}</Typography>
      <Typography variant="h3" component="h1">{view.title}</Typography>
      <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 760 }}>{words.intro}</Typography>
      <Tabs value={view.epic} onChange={(_, epic: string) => onEpic(epic)} variant="scrollable">
        {features().map((tab) => (
          <Tab key={tab.epic} value={tab.epic} label={tab.label} />
        ))}
      </Tabs>
      <FeatureSteps steps={view.steps} />
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        {jumpsOf(view).map(([anchor, label, count]) => (
          <Chip key={anchor} component="a" href={`#${anchor}`} clickable variant="outlined" label={`${label} · ${count}`} />
        ))}
      </Stack>
    </Stack>
  );
}

export { FeatureHead };
