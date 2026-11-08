/**
 * - `BoardPage` · the page whole: head, numbers, next up, pace, board, the rest
 */
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import type { ReactElement } from 'react';
import {
  columns,
  ideas,
  nextUp,
  stats,
  velocity,
} from '../../../workspace/board-view.ts';
import { BoardColumns } from './components/BoardColumns.tsx';
import { KindLegend } from './components/KindLegend.tsx';
import { NextUp } from './components/NextUp.tsx';
import { OpenedPanel } from './components/OpenedPanel.tsx';
import { OutsideAndOpen } from './components/OutsideAndOpen.tsx';
import { PageHead } from './components/PageHead.tsx';
import { StatRow } from './components/StatRow.tsx';
import { useOpened } from './hooks/useOpened.ts';
import { VelocityPanel } from './components/VelocityPanel.tsx';

function BoardPage(): ReactElement {
  const board = useMemo(
    () => ({
      stats: stats(),
      next: nextUp(),
      columns: columns(),
      pace: velocity(),
      ideas: ideas(),
    }),
    [],
  );
  const opened = useOpened();
  return (
    <Container maxWidth="xl" sx={{ py: 5.5 }}>
      <Stack spacing={4.5}>
        <PageHead />
        <StatRow stats={board.stats} />
        <NextUp tickets={board.next} onTicket={opened.openTicket} />
        <VelocityPanel pace={board.pace} />
        <BoardColumns
          ideas={board.ideas}
          columns={board.columns}
          onEpic={opened.openEpic}
          onIdea={opened.openIdea}
        />
        <KindLegend />
        <OutsideAndOpen />
      </Stack>
      <OpenedPanel opened={opened} ideas={board.ideas} />
    </Container>
  );
}

export { BoardPage };
