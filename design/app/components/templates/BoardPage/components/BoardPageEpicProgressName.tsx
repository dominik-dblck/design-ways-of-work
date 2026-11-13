/**
 * - `BoardPageEpicProgressName` · an epic's name, its badge beside it when not MVP
 */
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { ProgressRow } from '../../../../workspace/boardView.ts';

interface BoardPageEpicProgressNameProps {
  readonly row: ProgressRow;
}

function BoardPageEpicProgressName({
  row,
}: BoardPageEpicProgressNameProps): ReactElement {
  return (
    <Typography variant="body2" noWrap sx={{ gridArea: 'name' }}>
      {row.name}
      {row.mvp ? null : (
        <Typography component="span" variant="body2" color="textSecondary">
          {` · ${row.badge}`}
        </Typography>
      )}
    </Typography>
  );
}

export { BoardPageEpicProgressName };
