/**
 * - `FeaturePageEpicTabs` · every epic, its status beside it as the board colours it
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { features } from '../../../../workspace/featureView.ts';
import { toneOf } from '../../../../theme/tones.ts';

interface FeaturePageEpicTabsProps {
  readonly epic: string;
  readonly onEpic: (epic: string) => void;
}

function FeaturePageEpicTabs({
  epic,
  onEpic,
}: FeaturePageEpicTabsProps): ReactElement {
  return (
    <Tabs
      value={epic}
      onChange={(_, picked: string) => onEpic(picked)}
      variant="scrollable"
    >
      {features().map((tab) => (
        <Tab
          key={tab.epic}
          value={tab.epic}
          label={
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography component="span" variant="inherit">
                {tab.epic}
              </Typography>
              <Chip
                size="small"
                color={toneOf(tab.status)}
                label={tab.status.toUpperCase()}
              />
            </Stack>
          }
        />
      ))}
    </Tabs>
  );
}

export { FeaturePageEpicTabs };
