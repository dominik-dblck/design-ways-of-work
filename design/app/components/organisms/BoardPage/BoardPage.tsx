/**
 * - `BoardPage` · the page whole: title, numbers, epics, next up, pace, the folds
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
  velocity,
  words,
} from '../../../workspace/boardView.ts';
import { FoldSection } from '../../molecules/FoldSection/index.ts';
import { BoardPageColumns } from './components/BoardPageColumns.tsx';
import { BoardPageContractSection } from './components/BoardPageContractSection.tsx';
import { BoardPageEpicProgress } from './components/BoardPageEpicProgress.tsx';
import { BoardPageKindLegend } from './components/BoardPageKindLegend.tsx';
import { BoardPageNextUp } from './components/BoardPageNextUp.tsx';
import { BoardPageOpenedPanel } from './components/BoardPageOpenedPanel.tsx';
import { BoardPageHead } from './components/BoardPageHead.tsx';
import { BoardPagePortsSection } from './components/BoardPagePortsSection.tsx';
import { BoardPageStatRow } from './components/BoardPageStatRow.tsx';
import { useBoardPageOpened } from './hooks/useBoardPageOpened.ts';
import { BoardPageVelocityPanel } from './components/BoardPageVelocityPanel.tsx';

function BoardPage(): ReactElement {
  const board = useMemo(
    () => ({
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
    <Container maxWidth="xl" sx={{ pt: 2, pb: 5.5 }}>
      <Stack spacing={4.5}>
        <BoardPageHead />
        <BoardPageStatRow />
        <BoardPageEpicProgress progress={board.progress} />
        <BoardPageNextUp tickets={board.next} onTicket={opened.openTicket} />
        <BoardPageVelocityPanel pace={board.pace} />
        <FoldSection id="columns" {...words.columns}>
          <BoardPageColumns
            ideas={board.ideas}
            columns={board.columns}
            onEpic={opened.openEpic}
            onIdea={opened.openIdea}
          />
          <BoardPageKindLegend />
        </FoldSection>
        <BoardPagePortsSection />
        <BoardPageContractSection />
      </Stack>
      <BoardPageOpenedPanel opened={opened} ideas={board.ideas} />
    </Container>
  );
}

export { BoardPage };
