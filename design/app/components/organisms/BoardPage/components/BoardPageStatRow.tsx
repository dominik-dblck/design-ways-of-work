/**
 * - `BoardPageStatRow` · the board's numbers side by side
 * - one under another on a phone
 */
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import type { Stat } from '../../../../workspace/board-view.ts';
import { BoardPageStatTile } from './BoardPageStatTile.tsx';

interface BoardPageStatRowProps {
  readonly stats: readonly Stat[];
}

function BoardPageStatRow({ stats }: BoardPageStatRowProps): ReactElement {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5}>
      {stats.map((stat) => (
        <BoardPageStatTile key={stat.label} stat={stat} />
      ))}
    </Stack>
  );
}

export { BoardPageStatRow };
