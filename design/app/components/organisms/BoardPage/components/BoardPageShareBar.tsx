/**
 * - `BoardPageShareBar` · how much of its whole a number is, in the done colour
 */
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import { barColourOf } from '../../../../theme/tones.ts';
import { radiusOf } from '../../../../theme/tokenReads.ts';
import { PERCENT } from '../constants/boardPageStatTileConstants.ts';

interface BoardPageShareBarProps {
  // a part of one, the whole being 1
  readonly share: number;
}

function BoardPageShareBar({ share }: BoardPageShareBarProps): ReactElement {
  return (
    <Box
      sx={{
        height: 4,
        borderRadius: radiusOf('uiRControl'),
        overflow: 'hidden',
        bgcolor: 'action.hover',
      }}
    >
      <Box
        sx={{
          height: 1,
          width: `${Math.round(share * PERCENT)}%`,
          bgcolor: barColourOf('done'),
        }}
      />
    </Box>
  );
}

export { BoardPageShareBar };
