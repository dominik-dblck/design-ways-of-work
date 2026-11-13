/**
 * - `BoardPageNumberLine` · a line of numbers under its name, its meaning on hover
 * - `BoardPageNumberLineProps` · its name, its meaning, the commit it was read at
 */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { Stat } from '../../../../workspace/boardView.ts';
import { Label } from '../../../atoms/Label/index.ts';
import { NUMBER_GRID } from '../constants/boardPageNumberLineConstants.ts';
import { BoardPageStatTile } from './BoardPageStatTile.tsx';

interface BoardPageNumberLineProps {
  readonly name: string;
  readonly means: string | null;
  // the commit the line was read at, beside its name
  readonly at?: string | null;
  readonly numbers: readonly Stat[];
}

function BoardPageNumberLine({
  name,
  means,
  at = null,
  numbers,
}: BoardPageNumberLineProps): ReactElement {
  return (
    <Stack spacing={1}>
      <Tooltip title={means ?? ''}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
          <Label sx={{ fontWeight: 'fontWeightBold' }}>{name}</Label>
          {at === null ? null : (
            <Typography variant="caption" color="textSecondary">
              {at}
            </Typography>
          )}
        </Stack>
      </Tooltip>
      <Box sx={NUMBER_GRID}>
        {numbers.map((one) => (
          <BoardPageStatTile key={one.id} stat={one} />
        ))}
      </Box>
    </Stack>
  );
}

export { BoardPageNumberLine };
export type { BoardPageNumberLineProps };
