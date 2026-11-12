/**
 * - `BoardPageEpicProgress` · the list on top: the MVP's whole, legend, each epic
 */
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { Progress } from '../../../../workspace/boardView.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
import { BoardPageBarLegend } from './BoardPageBarLegend.tsx';
import { BoardPageEpicProgressRow } from './BoardPageEpicProgressRow.tsx';
import { BoardPageStackedBar } from './BoardPageStackedBar.tsx';
import { radiusOf } from '../../../../theme/tokenReads.ts';

interface BoardPageEpicProgressProps {
  readonly progress: Progress;
}

function BoardPageEpicProgress({
  progress,
}: BoardPageEpicProgressProps): ReactElement {
  const { mvp } = progress;
  return (
    <Stack spacing={1.5}>
      <SectionHead label={progress.label} note={progress.note} />
      <Paper variant="outlined" sx={{ borderRadius: radiusOf('uiRContainer') }}>
        <Stack spacing={1.25} sx={{ p: 2 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}
          >
            <Typography variant="subtitle1">{mvp.label}</Typography>
            <Typography variant="subtitle1">
              {`${mvp.percent} `}
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {mvp.tickets}
              </Typography>
            </Typography>
          </Stack>
          <BoardPageStackedBar counts={mvp.counts} height={8} />
          <BoardPageBarLegend legend={progress.legend} />
        </Stack>
        <Divider />
        <List dense disablePadding>
          {progress.rows.map((row) => (
            <BoardPageEpicProgressRow key={row.id} row={row} />
          ))}
        </List>
      </Paper>
    </Stack>
  );
}

export { BoardPageEpicProgress };
