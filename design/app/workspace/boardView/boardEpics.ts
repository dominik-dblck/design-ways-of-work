/**
 * - `cards`, `columns`, `epicOf` · every epic's card in order, by column, one
 * - `ticketLineOf` · a ticket as a list shows it: its id, title, kind and column
 */
import { epics as EPICS } from '../../../roadmaps/backlog.ts';
import {
  all as allTickets,
  columns as COLUMNS,
} from '../../../roadmaps/tickets.ts';
import { prototypeOf } from './boardPrototype.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type {
  EpicBadge,
  Column,
  ColumnId,
  EpicCard,
  TicketLine,
} from './boardTypes.ts';

type BoardTicket = ReturnType<typeof allTickets>[number];
type Epic = (typeof EPICS)[number];

const columnLabel = (id: string): string =>
  COLUMNS.find((column) => column.id === id)?.label ?? id;

const ticketLineOf = (ticket: BoardTicket): TicketLine => ({
  id: ticket.id,
  title: ticket.title,
  kindLabel: ticket.kindLabel,
  column: ticket.column,
  columnLabel: columnLabel(ticket.column),
  waitingOn: ticket.waitingOn,
});

// an epic is done when all its tickets are, in hand when one is, ready when one can start
function columnOfEpic(tickets: readonly TicketLine[]): ColumnId {
  const some = (id: string): boolean =>
    tickets.some((ticket) => ticket.column === id);
  if (tickets.length > 0 && tickets.every((one) => one.column === 'done'))
    return 'done';
  if (some('doing')) return 'doing';
  return some('ready') ? 'ready' : 'blocked';
}

function badgeOf(epic: Epic): EpicBadge {
  const { badges } = BOARD_WORDS;
  if (epic.group === 'deferred')
    return { label: badges.deferred, tone: 'deferred' };
  return epic.mvp
    ? { label: badges.mvp, tone: 'mvp' }
    : { label: badges.later, tone: 'later' };
}

// what it needs first, what it waits on outside, what it ports, the screens it serves
function tagsOf(epic: Epic): readonly string[] {
  const { tags } = BOARD_WORDS;
  const after = epic.deps.map((dep) => `E${dep}`).join(' + ');
  return [
    epic.deps.length ? `${tags.after} ${after}` : tags.none,
    ...epic.ports.map((port) => `${tags.port} · ${port}`),
    ...(epic.code ? [`${tags.code} · ${epic.code}`] : []),
    ...(epic.screens.length
      ? [`${tags.screens} · ${epic.screens.join(', ')}`]
      : []),
  ];
}

function cardOf(epic: Epic, all: readonly BoardTicket[]): EpicCard {
  const own = all.filter((ticket) => ticket.epic === epic.id);
  const tickets = own.map(ticketLineOf);
  const open = tickets.filter((ticket) => ticket.column !== 'done');
  const waits = [...new Set(open.flatMap((ticket) => ticket.waitingOn))];
  const feature = own.find((ticket) => ticket.kind === 'feature');
  return {
    id: epic.id,
    name: epic.name,
    sub: epic.sub,
    done: epic.done,
    badge: badgeOf(epic),
    tags: tagsOf(epic),
    stories: epic.stories,
    feature: feature ? ticketLineOf(feature) : null,
    tickets,
    prototype: prototypeOf(epic),
    doneCount: tickets.length - open.length,
    column: columnOfEpic(tickets),
    waiting: tickets.length ? waits : [BOARD_WORDS.noTicket],
  };
}

// every epic's card, in the backlog's order
function cards(): readonly EpicCard[] {
  const all = allTickets();
  return EPICS.map((epic) => cardOf(epic, all));
}

function columns(): readonly Column[] {
  const every = cards();
  return COLUMNS.map((column) => ({
    id: column.id,
    label: column.label,
    note: column.note,
    epics: every.filter((card) => card.column === column.id),
  }));
}

function epicOf(id: string): EpicCard | null {
  const epic = EPICS.find((one) => one.id === id);
  return epic ? cardOf(epic, allTickets()) : null;
}

export { cards, columns, epicOf, ticketLineOf };
