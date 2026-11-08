/**
 * - `stats` · the board's four numbers, each with the line that says what it counts
 * - `nextUp` · the tickets ready to start, in backlog order
 */
import { counts as backlogCounts } from '../../../roadmaps/backlog.ts';
import { counts as ticketCounts, next } from '../../../roadmaps/tickets.ts';
import { ticketLineOf } from './boardEpics.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type { Stat, TicketLine } from './boardTypes.ts';

function stats(): readonly Stat[] {
  const backlog = backlogCounts();
  const tickets = ticketCounts();
  const { stats: words } = BOARD_WORDS;
  return [
    {
      ...words.epics,
      value: `${backlog.epics} · ${backlog.stories} stories`,
    },
    {
      ...words.mvp,
      value: `${backlog.mvpEpics} · ${backlog.mvpStories} stories`,
    },
    {
      ...words.tickets,
      value: `${tickets.done ?? 0} / ${tickets.total ?? 0}`,
    },
    { ...words.ready, value: String(tickets.ready ?? 0) },
  ];
}

const nextUp = (): readonly TicketLine[] => next().map(ticketLineOf);

export { nextUp, stats };
