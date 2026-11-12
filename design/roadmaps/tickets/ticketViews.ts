/**
 * - `allTickets`, `byColumn`, `next` · every ticket as the board reads it
 * - `boardCounts`, `uncoveredStories` · the board's numbers, stories with no ticket
 */
import { byId as EPIC_BY_ID, epics as EPICS } from '../backlog.ts';
import { caveatsOf, dueAt, receiptFlags } from './receiptFlags.ts';
import { columnOf, describe, readBefore, waitingOn } from './ticketBoard.ts';
import { expand, expandNote, expandTouches } from './ticketExpand.ts';
import { COLUMNS, KIND } from './ticketKinds.ts';
import { EDGES, RECEIPTS, TICKETS } from './ticketList.ts';
import type { BoardTicket, Ticket } from './ticketsTypes.ts';

function boardOf(stored: Ticket): BoardTicket {
  const withCriteria = { ...stored, acceptance: expand(stored.acceptance) };
  const withNote = { ...withCriteria, note: expandNote(withCriteria) };
  const ticket = { ...withNote, touches: expandTouches(withNote) };
  const kind = KIND[ticket.kind];
  return {
    ...ticket,
    column: columnOf(ticket),
    waitingOn: waitingOn(ticket),
    caveats: caveatsOf(ticket),
    dueAt: dueAt(ticket.id),
    edges: EDGES[ticket.id] ?? [],
    receipt: RECEIPTS[ticket.id] ?? null,
    receiptFlags: receiptFlags(ticket),
    kindLabel: kind.label,
    kindWash: kind.wash,
    kindInk: kind.ink,
    kindMeans: kind.means,
    description: describe(ticket),
    read: readBefore(ticket),
  };
}

const allTickets = (): readonly BoardTicket[] => TICKETS.map(boardOf);

function byColumn(): readonly object[] {
  const tickets = allTickets();
  return COLUMNS.map((column) => ({
    id: column.id,
    label: column.label,
    note: column.note,
    tickets: tickets.filter((ticket) => ticket.column === column.id),
  }));
}

// what the build side picks next: ready, in backlog order
const next = (count?: number): readonly BoardTicket[] =>
  allTickets()
    .filter((ticket) => ticket.column === 'ready')
    .slice(0, count || 5);

function boardCounts(): Readonly<Record<string, number>> {
  const tickets = allTickets();
  const inColumn = (id: string): number =>
    tickets.filter((ticket) => ticket.column === id).length;
  return {
    total: tickets.length,
    commands: tickets.filter((ticket) => ticket.kind === 'command').length,
    authored: tickets.filter((ticket) => ticket.kind !== 'command').length,
    mvp: tickets.filter((ticket) => EPIC_BY_ID[ticket.epic]?.mvp).length,
    acceptance: tickets.reduce(
      (sum, ticket) => sum + ticket.acceptance.length,
      0,
    ),
    blocked: inColumn('blocked'),
    ready: inColumn('ready'),
    doing: inColumn('doing'),
    done: inColumn('done'),
  };
}

// every story should have a ticket; the push epic's wait for their epic
function uncoveredStories(): readonly string[] {
  const have = new Set(TICKETS.map((ticket) => ticket.story));
  return EPICS.filter((epic) => epic.id !== 'EPUSH')
    .flatMap((epic) => epic.stories)
    .filter((story) => !have.has(story.id))
    .map((story) => `${story.id} · ${story.title}`);
}

export { allTickets, boardCounts, byColumn, next, uncoveredStories };
