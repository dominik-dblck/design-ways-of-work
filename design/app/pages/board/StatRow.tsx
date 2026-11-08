/**
 * - `StatRow` · the board's numbers side by side, one under another on a phone
 */
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import type { Stat } from '../../workspace/board-view.ts';
import { StatTile } from './StatTile.tsx';

interface StatRowProps {
  readonly stats: readonly Stat[];
}

function StatRow({ stats }: StatRowProps): ReactElement {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5}>
      {stats.map((stat) => (
        <StatTile key={stat.label} stat={stat} />
      ))}
    </Stack>
  );
}

export { StatRow };
