/**
 * - `VelocityPanel` · the pace: one line, a chart for tickets and one for criteria
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
import { DayBars } from './DayBars.tsx';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
import { VelocityTable } from './VelocityTable.tsx';

interface VelocityPanelProps {
  readonly pace: Velocity;
}

function VelocityPanel({ pace }: VelocityPanelProps): ReactElement {
  const [table, setTable] = useState(false);
  const { velocity } = words;
  const of = (key: 'tickets' | 'criteria') =>
    pace.days.map((one) => ({ day: one.day, value: one[key] }));
  return (
    <Stack spacing={1.5}>
      <SectionHead label={velocity.label} note={velocity.note} />
      <Paper variant="outlined" sx={{ borderRadius: 2, p: 2.5 }}>
        <Stack spacing={2}>
          <Typography variant="body2">{pace.summary}</Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            }}
          >
            <DayBars label={velocity.tickets} days={of('tickets')} />
            <DayBars label={velocity.criteria} days={of('criteria')} />
          </Box>
          <Button
            onClick={() => setTable(!table)}
            sx={{ alignSelf: 'flex-start' }}
          >
            {table ? velocity.hide : velocity.show}
          </Button>
          <Collapse in={table} unmountOnExit>
            <VelocityTable days={pace.days} />
          </Collapse>
        </Stack>
      </Paper>
    </Stack>
  );
}

export { VelocityPanel };
