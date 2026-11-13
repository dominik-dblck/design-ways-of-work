/**
 * - `BoardPageStackedBar` · tickets as one bar, a part per column in its colour
 */
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import type { TicketCounts } from '../../../../workspace/boardView.ts';
import { barColourOf } from '../../../../theme/tones.ts';
import { ORDER } from '../constants/boardPageStackedBarConstants.ts';
import { radiusOf } from '../../../../styles/scales.ts';

interface BoardPageStackedBarProps {
  readonly counts: TicketCounts;
  readonly height?: number;
}

function BoardPageStackedBar({
  counts,
  height = 6,
}: BoardPageStackedBarProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.25,
        height,
        borderRadius: radiusOf('uiRControl'),
        overflow: 'hidden',
        bgcolor: 'action.hover',
      }}
    >
      {ORDER.filter((column) => counts[column] > 0).map((column) => (
        <Box
          key={column}
          sx={{ flexGrow: counts[column], bgcolor: barColourOf(column) }}
        />
      ))}
    </Box>
  );
}

export { BoardPageStackedBar };
