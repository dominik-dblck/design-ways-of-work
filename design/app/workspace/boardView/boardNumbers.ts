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
  const { stats: words, units } = BOARD_WORDS;
  const done = tickets.done ?? 0;
  const total = tickets.total ?? 0;
  const plain = { sub: null, share: null, href: null };
  return [
    {
      ...plain,
      ...words.epics,
      id: 'epics',
      value: String(backlog.epics),
      sub: `${backlog.stories} ${units.stories}`,
    },
    {
      ...plain,
      ...words.mvp,
      id: 'mvp',
      value: String(backlog.mvpEpics),
      sub: `${backlog.mvpStories} ${units.stories}`,
    },
    {
      ...plain,
      ...words.tickets,
      id: 'tickets',
      value: String(done),
      sub: `${units.of} ${total}`,
      share: total ? done / total : null,
    },
    {
      ...plain,
      ...words.ready,
      id: 'ready',
      value: String(tickets.ready ?? 0),
    },
  ];
}

const nextUp = (): readonly TicketLine[] => next().map(ticketLineOf);

export { nextUp, stats };
