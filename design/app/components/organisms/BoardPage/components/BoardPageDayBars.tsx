/**
 * - `BoardPageDayBars` · one count per working day, a row of bars
 * - the first and last day
 */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { BoardPageDayBar } from './BoardPageDayBar.tsx';

interface BoardPageDayBarsProps {
  readonly label: string;
  readonly days: readonly { readonly day: string; readonly value: number }[];
}

function BoardPageDayBars({ label, days }: BoardPageDayBarsProps): ReactElement {
  const peak = Math.max(1, ...days.map((one) => one.value));
  return (
    <Stack spacing={1} sx={{ minWidth: 0 }}>
      <Typography variant="overline" color="textSecondary" component="h3">
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0.25,
          aspectRatio: '5 / 1',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {days.map((one) => (
          <BoardPageDayBar key={one.day} day={one.day} count={one.value} peak={peak} />
        ))}
      </Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Typography variant="caption" color="textSecondary">
          {days[0]?.day ?? ''}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {days[days.length - 1]?.day ?? ''}
        </Typography>
      </Stack>
    </Stack>
  );
}

export { BoardPageDayBars };
