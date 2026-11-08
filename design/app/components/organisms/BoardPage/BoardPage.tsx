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
import { BoardPageBoardColumns } from './components/BoardPageBoardColumns.tsx';
import { BoardPageKindLegend } from './components/BoardPageKindLegend.tsx';
import { BoardPageNextUp } from './components/BoardPageNextUp.tsx';
import { BoardPageOpenedPanel } from './components/BoardPageOpenedPanel.tsx';
import { BoardPageOutsideAndOpen } from './components/BoardPageOutsideAndOpen.tsx';
import { BoardPagePageHead } from './components/BoardPagePageHead.tsx';
import { BoardPageStatRow } from './components/BoardPageStatRow.tsx';
import { useBoardPageOpened } from './hooks/useBoardPageOpened.ts';
import { BoardPageVelocityPanel } from './components/BoardPageVelocityPanel.tsx';

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
  const opened = useBoardPageOpened();
  return (
    <Container maxWidth="xl" sx={{ py: 5.5 }}>
      <Stack spacing={4.5}>
        <BoardPagePageHead />
        <BoardPageStatRow stats={board.stats} />
        <BoardPageNextUp tickets={board.next} onTicket={opened.openTicket} />
        <BoardPageVelocityPanel pace={board.pace} />
        <BoardPageBoardColumns
          ideas={board.ideas}
          columns={board.columns}
          onEpic={opened.openEpic}
          onIdea={opened.openIdea}
        />
        <BoardPageKindLegend />
        <BoardPageOutsideAndOpen />
      </Stack>
      <BoardPageOpenedPanel opened={opened} ideas={board.ideas} />
    </Container>
  );
}

export { BoardPage };
