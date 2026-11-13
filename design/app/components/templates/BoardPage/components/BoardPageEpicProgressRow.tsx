/**
 * - `BoardPageEpicProgressRow` · an epic as a bar of its tickets, a link to its page
 */
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { pickedEpic, words } from '../../../../workspace/boardView.ts';
import type { ProgressRow } from '../../../../workspace/boardView.ts';
import { BoardPageEpicProgressName } from './BoardPageEpicProgressName.tsx';
import { BoardPageStackedBar } from './BoardPageStackedBar.tsx';
import { GRID } from '../constants/boardPageEpicProgressRowConstants.ts';

interface BoardPageEpicProgressRowProps {
  readonly row: ProgressRow;
}

function BoardPageEpicProgressRow({
  row,
}: BoardPageEpicProgressRowProps): ReactElement {
  return (
    <ListItemButton
      divider
      component="a"
      href={row.feature}
      onClick={() => pickedEpic.remember(row.id)}
      aria-label={`${words.openFeature} ${row.id} · ${row.name}`}
    >
      <Box sx={GRID}>
        <Typography
          variant="overline"
          color="textSecondary"
          sx={{ gridArea: 'id' }}
        >
          {row.id}
        </Typography>
        <BoardPageEpicProgressName row={row} />
        <Box sx={{ gridArea: 'bar' }}>
          <BoardPageStackedBar counts={row.counts} />
        </Box>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ gridArea: 'count', textAlign: 'right' }}
        >
          {`${row.counts.done} / ${row.total}`}
        </Typography>
      </Box>
    </ListItemButton>
  );
}

export { BoardPageEpicProgressRow };
