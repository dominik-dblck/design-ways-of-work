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
import { Heading } from '../../../atoms/Heading/index.ts';
import { BoardPageBarLegend } from './BoardPageBarLegend.tsx';
import { BoardPageEpicProgressRow } from './BoardPageEpicProgressRow.tsx';
import { BoardPageStackedBar } from './BoardPageStackedBar.tsx';
import { radiusOf } from '../../../../styles/scales.ts';
import { MVP_LINE } from '../constants/boardPageEpicProgressConstants.ts';

interface BoardPageEpicProgressProps {
  readonly progress: Progress;
}

function BoardPageEpicProgress({
  progress,
}: BoardPageEpicProgressProps): ReactElement {
  const { mvp } = progress;
  return (
    <Stack spacing={1.5}>
      <Heading level={2} quiet note={progress.note}>
        {progress.label}
      </Heading>
      <Paper variant="outlined" sx={{ borderRadius: radiusOf('uiRContainer') }}>
        <Stack spacing={1.25} sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} sx={MVP_LINE}>
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
