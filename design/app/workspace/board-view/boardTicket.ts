/**
 * - `ticketOf` · one ticket opened: its context pack, each pointer read as it names
 */
import { contextOf, edgeQuestion } from '../../../roadmaps/tickets.ts';
import { edgeSectionsOf, whyOf } from './boardEdges.ts';
import { ticketLineOf } from './boardEpics.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type { Reading, TicketDetail } from './boardTypes.ts';

const readingOf = ({ title, body }: Reading): Reading => ({ title, body });

type Command = NonNullable<
  NonNullable<ReturnType<typeof contextOf>>['command']
>;

// the route and body, then the events it appends and whom it pings
function commandLine(command: Command): string {
  const { ticket: words } = BOARD_WORDS;
  const emits = command.emits.join(' · ') || words.nothing;
  const pings = command.mention || words.nobody;
  return `${command.route} · ${command.body} · ${words.emits} ${emits} · ${words.pings} ${pings}`;
}

function ticketOf(id: string): TicketDetail | null {
  const context = contextOf(id);
  if (!context) return null;
  const { ticket, story, command } = context;
  return {
    ...ticketLineOf(ticket),
    epic: ticket.epic,
    story: story ? `${story.id} · ${story.title} — ${story.criterion}` : null,
    command: command ? commandLine(command) : null,
    refusals: context.refusals.map(readingOf),
    reading: context.reading.map(readingOf),
    siblings: context.siblings,
    why: whyOf(ticket.why),
    edgeQuestion,
    edgeSections: edgeSectionsOf(ticket.edges),
    description: ticket.description,
    acceptance: context.acceptance,
    read: context.read,
    caveats: ticket.caveats,
    receiptFlags: ticket.receiptFlags,
    edges: ticket.edges.map(({ edge, pick, why }) => ({ edge, pick, why })),
  };
}

export { ticketOf };
