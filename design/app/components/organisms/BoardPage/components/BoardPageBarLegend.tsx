/**
 * - `BoardPageBarLegend` · each column's colour beside its name, read under a bar
 */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { Progress } from '../../../../workspace/boardView.ts';
import { barColourOf } from '../../../../theme/tones.ts';
import { radiusOf } from '../../../../theme/tokenReads.ts';

interface BoardPageBarLegendProps {
  readonly legend: Progress['legend'];
}

function BoardPageBarLegend({ legend }: BoardPageBarLegendProps): ReactElement {
  return (
    <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {legend.map((column) => (
        <Stack
          key={column.id}
          direction="row"
          spacing={0.75}
          sx={{ alignItems: 'center' }}
        >
          <Box
            sx={{
              p: 0.5,
              borderRadius: radiusOf('uiRTag'),
              bgcolor: barColourOf(column.id),
            }}
          />
          <Typography variant="caption" color="textSecondary">
            {column.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export { BoardPageBarLegend };
