/**
 * - `TICKETS`, `TICKET_BY_ID` · every ticket, written or derived, in build order
 * - `EDGES`, `EDGE_QUESTION`, `RECEIPTS`, `CAVEATS` · what edges and receipts hold
 */
import { fromCommand, ticketIdOf } from './commandTickets.ts';
import { byId as EPIC_BY_ID, epics as EPICS } from '../backlog.ts';
import { all as COMMANDS } from '../../sheet/contract/commands.ts';
import { byTicket as EDGES } from '../edges.ts';
import { caveats as CAVEATS, receipts as RECEIPTS } from '../receipts.ts';
import { STATUS } from './ticketStatus.ts';
import { AUTHORED } from './ticketRows.ts';
import type { AuthoredRow, Ticket } from './ticketsTypes.ts';

// what each option of an edge is asked before the pick
const EDGE_QUESTION =
  'which is more stable in the long term, and easier to develop and maintain?';

// a row's optional note is what its story does not say; its why is the PM's
function authoredOf(
  row: AuthoredRow,
  command: string | null,
): Omit<Ticket, 'status'> {
  const [
    id,
    epic,
    story,
    kind,
    title,
    acceptance,
    touches,
    depends,
    note,
    why,
  ] = row;
  return {
    id,
    epic,
    story,
    kind,
    title,
    command,
    acceptance,
    touches,
    depends,
    note: note || '',
    why: why || null,
  };
}

// a command refined as an authored row replaces its generated ticket and keeps its command
function listOf(): readonly Omit<Ticket, 'status'>[] {
  const authored = new Set(AUTHORED.map((row) => row[0]));
  const commandOf = new Map<string, string>();
  for (const command of COMMANDS)
    if (!commandOf.has(ticketIdOf(command)))
      commandOf.set(ticketIdOf(command), command.id);
  return [
    ...AUTHORED.map((row) => authoredOf(row, commandOf.get(row[0]) ?? null)),
    ...COMMANDS.map(fromCommand).filter((ticket) => !authored.has(ticket.id)),
  ];
}

// in backlog order, so the list reads as the order to build in; inside an epic, by number
function built(): readonly Ticket[] {
  const order = new Map(EPICS.map((epic, at) => [epic.id, at]));
  const sorted = [...listOf()].sort((one, other) => {
    const apart = (order.get(one.epic) ?? NaN) - (order.get(other.epic) ?? NaN);
    if (order.get(one.epic) !== order.get(other.epic)) return apart;
    if (one.id === other.id) return 0;
    return one.id < other.id ? -1 : 1;
  });
  return sorted.map((ticket) => {
    if (!EPIC_BY_ID[ticket.epic])
      throw new Error(
        `tickets.js · ${ticket.id} names an unknown epic ${ticket.epic}`,
      );
    return { ...ticket, status: STATUS[ticket.id] || 'todo' };
  });
}

const TICKETS = built();

const TICKET_BY_ID: Readonly<Record<string, Ticket | undefined>> =
  Object.fromEntries(
    TICKETS.map((ticket, at) => {
      if (TICKETS.findIndex((other) => other.id === ticket.id) !== at)
        throw new Error(
          `tickets.js · two tickets carry ${ticket.id} — an authored id sits on a command’s number`,
        );
      return [ticket.id, ticket];
    }),
  );

export { TICKET_BY_ID, CAVEATS, EDGE_QUESTION, EDGES, RECEIPTS, TICKETS };
