/**
 * - `OutsideAndOpen` · the ports' questions, then what the backlog leaves open
 */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import { open, ports, words } from '../../../../workspace/board-view.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
import { TitledList } from '../../../atoms/TitledList/index.ts';
import { radiusOf } from '../../../../theme/tokenReads.ts';

function OutsideAndOpen(): ReactElement {
  return (
    <Stack spacing={3}>
      <SectionHead {...words.ports} />
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        {ports().map((port) => (
          <Paper key={port.name} variant="outlined" sx={{ p: 2.5, borderRadius: radiusOf('uiRContainer') }}>
            <TitledList
              label={`${port.name} · ${port.epic}`}
              lines={port.questions}
            />
          </Paper>
        ))}
      </Box>
      <SectionHead {...words.open} />
      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: radiusOf('uiRContainer') }}>
        <Stack spacing={2}>
          {open().map((point) => (
            <TitledList key={point.area} label={point.area} lines={[point.why]} />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}

export { OutsideAndOpen };
