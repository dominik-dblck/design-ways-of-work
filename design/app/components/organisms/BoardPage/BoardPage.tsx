/**
 * - `BoardPage` · the page whole: head, numbers, epics, next up, pace, board, rest
 */
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import type { ReactElement } from 'react';
import {
  columns,
  ideas,
  nextUp,
  progress,
  stats,
  velocity,
} from '../../../workspace/boardView.ts';
import { BoardPageColumns } from './components/BoardPageColumns.tsx';
import { BoardPageEpicProgress } from './components/BoardPageEpicProgress.tsx';
import { BoardPageKindLegend } from './components/BoardPageKindLegend.tsx';
import { BoardPageNextUp } from './components/BoardPageNextUp.tsx';
import { BoardPageOpenedPanel } from './components/BoardPageOpenedPanel.tsx';
import { BoardPageOutsideAndOpen } from './components/BoardPageOutsideAndOpen.tsx';
import { BoardPageHead } from './components/BoardPageHead.tsx';
import { BoardPageStatRow } from './components/BoardPageStatRow.tsx';
import { useBoardPageOpened } from './hooks/useBoardPageOpened.ts';
import { BoardPageVelocityPanel } from './components/BoardPageVelocityPanel.tsx';

function BoardPage(): ReactElement {
  const board = useMemo(
    () => ({
      stats: stats(),
      progress: progress(),
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
        <BoardPageHead />
        <BoardPageStatRow stats={board.stats} />
        <BoardPageEpicProgress
          progress={board.progress}
          onEpic={opened.openEpic}
        />
        <BoardPageNextUp tickets={board.next} onTicket={opened.openTicket} />
        <BoardPageVelocityPanel pace={board.pace} />
        <BoardPageColumns
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
