/**
 * - `DayBar` · one working day: its bar, its share of the peak, its count on hover
 */
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import type { ReactElement } from 'react';

interface DayBarProps {
  readonly day: string;
  readonly count: number;
  readonly peak: number;
}

function DayBar({ day, count, peak }: DayBarProps): ReactElement {
  return (
    <Tooltip title={`${day} · ${count.toFixed(1)}`} placement="top">
      <Box sx={{ flex: 1, height: '100%', display: 'flex' }}>
        <Box
          sx={{
            mt: 'auto',
            width: '100%',
            height: `${(100 * count) / peak}%`,
            bgcolor: 'primary.main',
            borderTopLeftRadius: (theme) => Number(theme.shape.borderRadius) / 2,
            borderTopRightRadius: (theme) => Number(theme.shape.borderRadius) / 2,
          }}
        />
      </Box>
    </Tooltip>
  );
}

export { DayBar };
