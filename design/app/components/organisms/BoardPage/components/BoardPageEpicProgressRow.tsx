/**
 * - `BoardPageEpicProgressRow` · one epic: id, name, its tickets as a bar, done
 */
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/boardView.ts';
import type { ProgressRow } from '../../../../workspace/boardView.ts';
import { BoardPageStackedBar } from './BoardPageStackedBar.tsx';
import { GRID } from '../constants/boardPageEpicProgressRowConstants.ts';

interface BoardPageEpicProgressRowProps {
  readonly row: ProgressRow;
  readonly onOpen: (id: string) => void;
}

function BoardPageEpicProgressRow({
  row,
  onOpen,
}: BoardPageEpicProgressRowProps): ReactElement {
  return (
    <ListItemButton
      divider
      onClick={() => onOpen(row.id)}
      aria-label={`${words.progress.open} ${row.id} · ${row.name}`}
    >
      <Box sx={GRID}>
        <Typography
          variant="overline"
          color="textSecondary"
          sx={{ gridArea: 'id' }}
        >
          {row.id}
        </Typography>
        <Typography variant="body2" noWrap sx={{ gridArea: 'name' }}>
          {row.name}
          {row.mvp ? null : (
            <Typography component="span" variant="body2" color="textSecondary">
              {` · ${row.badge}`}
            </Typography>
          )}
        </Typography>
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
