/**
 * - `FeaturePageHead` · eyebrow, title, what the page is
 * - tabs, steps and jumps
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import {
  features,
  featureWords as words,
} from '../../../../workspace/featureView.ts';
import type { FeatureView } from '../../../../workspace/featureView.ts';
import { FeaturePageSteps } from './FeaturePageSteps.tsx';
import { jumpsOf } from '../utils/featurePageHeadJumpUtils.ts';

interface FeaturePageHeadProps {
  readonly view: FeatureView;
  readonly onEpic: (epic: string) => void;
}

function FeaturePageHead({ view, onEpic }: FeaturePageHeadProps): ReactElement {
  return (
    <Stack spacing={1.5}>
      <Typography variant="overline" color="textSecondary">
        {words.eyebrow}
      </Typography>
      <Typography variant="h3" component="h1">
        {view.title}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 760 }}>
        {words.intro}
      </Typography>
      <Tabs
        value={view.epic}
        onChange={(_, epic: string) => onEpic(epic)}
        variant="scrollable"
      >
        {features().map((tab) => (
          <Tab key={tab.epic} value={tab.epic} label={tab.label} />
        ))}
      </Tabs>
      <FeaturePageSteps steps={view.steps} />
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        {jumpsOf(view).map(([anchor, label, count]) => (
          <Chip
            key={anchor}
            component="a"
            href={`#${anchor}`}
            clickable
            variant="outlined"
            label={`${label} · ${count}`}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export { FeaturePageHead };
