/**
 * - `BoardPageVelocityPanel` · the pace
 * - one line, a chart for tickets and one for criteria
 */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/board-view.ts';
import type { Velocity } from '../../../../workspace/board-view.ts';
import { BoardPageDayBars } from './BoardPageDayBars.tsx';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
import { BoardPageVelocityTable } from './BoardPageVelocityTable.tsx';
import { radiusOf } from '../../../../theme/tokenReads.ts';

interface BoardPageVelocityPanelProps {
  readonly pace: Velocity;
}

function BoardPageVelocityPanel({ pace }: BoardPageVelocityPanelProps): ReactElement {
  const [isTableShown, setTableShown] = useState(false);
  const { velocity } = words;
  const of = (key: 'tickets' | 'criteria') =>
    pace.days.map((one) => ({ day: one.day, value: one[key] }));
  return (
    <Stack spacing={1.5}>
      <SectionHead label={velocity.label} note={velocity.note} />
      <Paper variant="outlined" sx={{ borderRadius: radiusOf('uiRContainer'), p: 2.5 }}>
        <Stack spacing={2}>
          <Typography variant="body2">{pace.summary}</Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            }}
          >
            <BoardPageDayBars label={velocity.tickets} days={of('tickets')} />
            <BoardPageDayBars label={velocity.criteria} days={of('criteria')} />
          </Box>
          <Button
            onClick={() => setTableShown(!isTableShown)}
            sx={{ alignSelf: 'flex-start' }}
          >
            {isTableShown ? velocity.hide : velocity.show}
          </Button>
          <Collapse in={isTableShown} unmountOnExit>
            <BoardPageVelocityTable days={pace.days} />
          </Collapse>
        </Stack>
      </Paper>
    </Stack>
  );
}

export { BoardPageVelocityPanel };
