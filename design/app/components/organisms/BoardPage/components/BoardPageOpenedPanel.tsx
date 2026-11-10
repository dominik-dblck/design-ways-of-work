/**
 * - `BoardPageOpenedPanel` · the drawer
 * - an idea, an epic, or one of the epic's tickets
 */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import type { ReactElement } from 'react';
import {
  epicOf,
  ticketDetailOf,
  words,
} from '../../../../workspace/boardView.ts';
import type { IdeaCard } from '../../../../workspace/boardView.ts';
import { BoardPageEpicPanel } from './BoardPageEpicPanel.tsx';
import { BoardPageIdeaPanel } from './BoardPageIdeaPanel.tsx';
import { BoardPageTicketPanel } from './BoardPageTicketPanel.tsx';
import type { useBoardPageOpened } from '../hooks/useBoardPageOpened.ts';

interface BoardPageOpenedPanelProps {
  readonly opened: ReturnType<typeof useBoardPageOpened>;
  readonly ideas: readonly IdeaCard[];
}

function BoardPageOpenedPanel({
  opened,
  ideas,
}: BoardPageOpenedPanelProps): ReactElement {
  const idea = ideas.find((one) => one.id === opened.ideaId) ?? null;
  const epic = opened.epicId ? epicOf(opened.epicId) : null;
  const ticket = opened.ticketId ? ticketDetailOf(opened.ticketId) : null;
  return (
    <Drawer
      anchor="right"
      open={idea !== null || epic !== null}
      onClose={opened.close}
    >
      <Box sx={{ width: { xs: '100vw', sm: 560 }, p: 3 }}>
        <Button onClick={opened.close} sx={{ float: 'right' }}>
          {words.close}
        </Button>
        {idea ? <BoardPageIdeaPanel idea={idea} /> : null}
        {epic && ticket ? (
          <BoardPageTicketPanel
            ticket={ticket}
            onBack={() => opened.showTicket(null)}
          />
        ) : null}
        {epic && !ticket ? (
          <BoardPageEpicPanel epic={epic} onTicket={opened.showTicket} />
        ) : null}
      </Box>
    </Drawer>
  );
}

export { BoardPageOpenedPanel };
