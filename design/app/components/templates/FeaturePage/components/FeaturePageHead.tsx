/**
 * - `FeaturePageHead` · the way back, the epic tabs, the title
 * - its source check folded
 */
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { boardHref } from '../../../../workspace/boardView.ts';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { FeatureView } from '../../../../workspace/featureView.ts';
import { FeaturePageEpicTabs } from './FeaturePageEpicTabs.tsx';
import { FeaturePageSourceSection } from './FeaturePageSourceSection.tsx';

interface FeaturePageHeadProps {
  readonly view: FeatureView;
  readonly onEpic: (epic: string) => void;
}

function FeaturePageHead({ view, onEpic }: FeaturePageHeadProps): ReactElement {
  return (
    <Stack spacing={1.5}>
      <Button
        href={boardHref}
        size="small"
        sx={{ alignSelf: 'flex-start' }}
      >{`← ${words.board}`}</Button>
      <Typography variant="overline" color="textSecondary">
        {words.eyebrow}
      </Typography>
      <FeaturePageEpicTabs epic={view.epic} onEpic={onEpic} />
      <Typography variant="h3" component="h1">
        {view.title}
      </Typography>
      <FeaturePageSourceSection />
    </Stack>
  );
}

export { FeaturePageHead };
