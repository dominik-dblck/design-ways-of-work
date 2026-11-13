/**
 * - `BoardPagePortGrid` · each port's questions, a card each
 */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import type { ReactElement } from 'react';
import { ports } from '../../../../workspace/boardView.ts';
import { TitledList } from '../../../molecules/TitledList/index.ts';
import { radiusOf } from '../../../../styles/scales.ts';

function BoardPagePortGrid(): ReactElement {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
      }}
    >
      {ports().map((port) => (
        <Paper
          key={port.name}
          variant="outlined"
          sx={{ p: 2.5, borderRadius: radiusOf('uiRContainer') }}
        >
          <TitledList
            label={`${port.name} · ${port.epic}`}
            lines={port.questions}
          />
        </Paper>
      ))}
    </Box>
  );
}

export { BoardPagePortGrid };
