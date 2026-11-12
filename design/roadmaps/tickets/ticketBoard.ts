/**
 * - `waitingOn`, `columnOf` · what a ticket waits on, empty when it can be picked up
 * - `describe`, `readBefore` · its own sentence, the files to read before starting
 */
import { byId as EPIC_BY_ID } from '../backlog.ts';
import { byId as COMMAND_BY_ID } from '../../sheet/contract/commands.ts';
import { TICKET_BY_ID, EDGES, TICKETS } from './ticketList.ts';
import type { Ticket } from './ticketsTypes.ts';

const isDone = (ticket: Ticket): boolean =>
  ticket.status === 'done' || ticket.status === 'dropped';

// every epic this one cannot start without, transitively, in the order first met
function prerequisites(epicId: string): readonly string[] {
  const out: string[] = [];
  const walk = (id: string): void => {
    for (const dep of EPIC_BY_ID[id]?.deps ?? []) {
      const epic = `E${dep}`;
      if (out.includes(epic)) continue;
      out.push(epic);
      walk(epic);
    }
  };
  walk(epicId);
  return out;
}

// an edge with options and no pick is a decision the PM has not taken
function waitingOn(ticket: Ticket): readonly string[] {
  if (isDone(ticket)) return [];
  const epics = prerequisites(ticket.epic).flatMap((epic) => {
    const left = TICKETS.filter(
      (one) => one.epic === epic && !isDone(one),
    ).length;
    return left ? [`${epic} · ${left} left`] : [];
  });
  const named = ticket.depends.filter((id) => {
    const dep = TICKET_BY_ID[id];
    if (!dep)
      throw new Error(`tickets.js · ${ticket.id} depends on unknown ${id}`);
    return !isDone(dep);
  });
  const edges = (EDGES[ticket.id] ?? [])
    .filter((edge) => edge.options && !edge.pick)
    .map((edge) => `PM · the edge on criterion ${edge.on}`);
  return [...epics, ...named, ...edges];
}

function columnOf(ticket: Ticket): string {
  if (isDone(ticket)) return 'done';
  if (ticket.status === 'doing') return 'doing';
  return waitingOn(ticket).length ? 'blocked' : 'ready';
}

// only what the ticket says its story does not
function describe(ticket: Ticket): string {
  const epic = EPIC_BY_ID[ticket.epic];
  const story = epic?.stories.find((one) => one.id === ticket.story);
  const own = ticket.note || '';
  return own && (!story || own !== story.criterion) ? own : '';
}

// a command's own row, the events it appends, the target it mentions
function commandReads(id: string): readonly string[] {
  const command = COMMAND_BY_ID[id];
  return [
    `commands.ts · ${id}`,
    ...(command?.emits ?? []).map((key) => `events.ts · ${key}`),
    ...(command?.mention ? [`events.ts · TARGET.${command.mention}`] : []),
  ];
}

// 'blocks.ts, blockRules.ts' is two pointers · 'blockRules.ts · badge, situationOf' is one
function codeReads(code: string | undefined): readonly string[] {
  if (!code) return [];
  const parts = code.split(/,\s*/);
  return parts.every((part) => /^[\w-]+\.(ts|js|json)/.test(part))
    ? parts
    : [code];
}

// derived, never typed: its touches, its command's row and events, the code its epic ports
function readBefore(ticket: Ticket): readonly string[] {
  const all = [
    ...(ticket.command ? commandReads(ticket.command) : []),
    ...ticket.touches,
    ...codeReads(EPIC_BY_ID[ticket.epic]?.code),
  ];
  return [...new Set(all.filter(Boolean))];
}

export { columnOf, describe, readBefore, waitingOn };
