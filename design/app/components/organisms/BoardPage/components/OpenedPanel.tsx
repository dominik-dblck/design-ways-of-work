/**
 * - `OpenedPanel` · the drawer: an idea, an epic, or one of the epic's tickets
 */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import type { ReactElement } from 'react';
import { epicOf, ticketOf, words } from '../../../../workspace/board-view.ts';
import type { IdeaCard } from '../../../../workspace/board-view.ts';
import { EpicPanel } from './EpicPanel.tsx';
import { IdeaPanel } from './IdeaPanel.tsx';
import { TicketPanel } from './TicketPanel.tsx';
import type { useOpened } from '../hooks/useOpened.ts';

interface OpenedPanelProps {
  readonly opened: ReturnType<typeof useOpened>;
  readonly ideas: readonly IdeaCard[];
}

function OpenedPanel({ opened, ideas }: OpenedPanelProps): ReactElement {
  const idea = ideas.find((one) => one.id === opened.ideaId) ?? null;
  const epic = opened.epicId ? epicOf(opened.epicId) : null;
  const ticket = opened.ticketId ? ticketOf(opened.ticketId) : null;
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
        {idea ? <IdeaPanel idea={idea} /> : null}
        {epic && ticket ? (
          <TicketPanel ticket={ticket} onBack={() => opened.showTicket(null)} />
        ) : null}
        {epic && !ticket ? (
          <EpicPanel epic={epic} onTicket={opened.showTicket} />
        ) : null}
      </Box>
    </Drawer>
  );
}

export { OpenedPanel };
