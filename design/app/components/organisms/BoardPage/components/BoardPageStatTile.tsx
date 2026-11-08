/**
 * - `BoardPageStatTile` · one number of the board
 * - its label above and its line below
 */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Stat } from '../../../../workspace/board-view.ts';
import type { ReactElement } from 'react';
import { radiusOf } from '../../../../theme/tokenReads.ts';

interface BoardPageStatTileProps {
  readonly stat: Stat;
}

function BoardPageStatTile({ stat }: BoardPageStatTileProps): ReactElement {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: radiusOf('uiRContainer'), flex: 1 }}>
      <Typography variant="overline" color="textSecondary" component="div">
        {stat.label}
      </Typography>
      <Typography variant="h5" component="div">
        {stat.value}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {stat.note}
      </Typography>
    </Paper>
  );
}

export { BoardPageStatTile };
