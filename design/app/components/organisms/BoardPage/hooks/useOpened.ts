/**
 * - `useOpened` · what the drawer holds: an idea, or an epic and one of its tickets
 */
import { useState } from 'react';
import { ticketDetailOf } from '../../../../workspace/board-view.ts';

interface Opened {
  readonly ideaId: string | null;
  readonly epicId: string | null;
  readonly ticketId: string | null;
  readonly openIdea: (id: string) => void;
  readonly openEpic: (id: string) => void;
  readonly openTicket: (id: string) => void;
  readonly showTicket: (id: string | null) => void;
  readonly close: () => void;
}

function useOpened(): Opened {
  const [ideaId, setIdea] = useState<string | null>(null);
  const [epicId, setEpic] = useState<string | null>(null);
  const [ticketId, setTicket] = useState<string | null>(null);
  const open = (idea: string | null, epic: string | null): void => {
    setIdea(idea);
    setEpic(epic);
  };
  return {
    ideaId,
    epicId,
    ticketId,
    openIdea: (id) => open(id, null),
    openEpic: (id) => {
      open(null, id);
      setTicket(null);
    },
    openTicket: (id) => {
      open(null, ticketDetailOf(id)?.epic ?? null);
      setTicket(id);
    },
    showTicket: setTicket,
    close: () => open(null, null),
  };
}

export { useOpened };
