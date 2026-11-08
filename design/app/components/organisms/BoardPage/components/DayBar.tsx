/**
 * - `DayBar` · one working day: its bar, its share of the peak, its count on hover
 */
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import type { ReactElement } from 'react';

interface DayBarProps {
  readonly day: string;
  readonly value: number;
  readonly peak: number;
}

function DayBar({ day, value, peak }: DayBarProps): ReactElement {
  return (
    <Tooltip title={`${day} · ${value.toFixed(1)}`} placement="top">
      <Box sx={{ flex: 1, height: '100%', display: 'flex' }}>
        <Box
          sx={{
            mt: 'auto',
            width: '100%',
            height: `${(100 * value) / peak}%`,
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
