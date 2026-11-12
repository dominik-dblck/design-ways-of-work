/**
 * - `BoardPageStatTile` · one number, small: the number beside its label, its line
 */
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Stat } from '../../../../workspace/boardView.ts';
import type { ReactElement } from 'react';
import { radiusOf } from '../../../../theme/tokenReads.ts';

interface BoardPageStatTileProps {
  readonly stat: Stat;
}

function BoardPageStatTile({ stat }: BoardPageStatTileProps): ReactElement {
  return (
    <Paper
      variant="outlined"
      sx={{ px: 1.5, py: 1, borderRadius: radiusOf('uiRContainer'), flex: 1 }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography variant="subtitle1" component="div">
          {stat.value}
        </Typography>
        <Typography variant="overline" color="textSecondary" component="div">
          {stat.label}
        </Typography>
      </Stack>
      <Typography variant="caption" color="textSecondary">
        {stat.note}
      </Typography>
    </Paper>
  );
}

export { BoardPageStatTile };
