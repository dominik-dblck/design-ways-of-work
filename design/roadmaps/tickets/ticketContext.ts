/**
 * - `ticketContextOf`, `TicketContext` · all an agent reads before its first line
 */
import { byId as EPIC_BY_ID } from '../backlog.ts';
import { byId as COMMAND_BY_ID } from '../../sheet/contract/commands.ts';
import { resolvePointer } from './pointerResolve.ts';
import { allTickets } from './ticketViews.ts';
import type { RuleRow } from '../../docs/process/plans.ts';
import type { BoardTicket, Resolved } from './ticketsTypes.ts';
import * as PRODUCT_RULES from '../../sheet/rules.ts';
import * as PLANS from '../../docs/process/plans.ts';
import { projectContext } from '../../docs/process/projectPlan.ts';
import type * as COMMANDS from '../../sheet/contract/commands.ts';

type Command = (typeof COMMANDS)['all'][number];

// each refusal with the sentence the test expects, or the line saying it is no key
function refusalsOf(command: Command | null): readonly Resolved[] {
  return (command?.refuses ?? []).map((rule) => {
    const resolved = resolvePointer(`refusals · ${rule}`);
    return resolved.kind === 'refusal'
      ? resolved
      : {
          ref: rule,
          kind: 'text',
          title: rule,
          body: 'not a key in refusals.js · every refusal a command names has to be one',
          where: null,
        };
  });
}

function commandView(command: Command | null) {
  if (!command) return null;
  const { id, route, body, actor, refuses, emits, mention, note } = command;
  return { id, route, body, actor, refuses, emits, mention, note };
}

// the rules an agent reads: the generic ones, then the product’s slots
const rulesNow = (): readonly RuleRow[] => [
  ...PLANS.rules,
  ...PRODUCT_RULES.rows,
];

function neighbourhood(ticket: BoardTicket) {
  const epic = EPIC_BY_ID[ticket.epic];
  if (!epic)
    throw new Error(
      `tickets.js · ${ticket.id} names an unknown epic ${ticket.epic}`,
    );
  const story = epic.stories.find((one) => one.id === ticket.story) ?? null;
  const command = ticket.command
    ? (COMMAND_BY_ID[ticket.command] ?? null)
    : null;
  const { id, name, sub, done, code, ports } = epic;
  return {
    ticket,
    project: projectContext,
    rules: rulesNow(),
    epic: { id, name, sub, done, code, ports },
    story: story
      ? { id: story.id, title: story.title, criterion: story.criterion }
      : null,
    command: commandView(command),
    refusals: refusalsOf(command),
  };
}

function contextOfTicket(ticket: BoardTicket, tickets: readonly BoardTicket[]) {
  const reading = ticket.read.map(resolvePointer);
  return {
    ...neighbourhood(ticket),
    read: ticket.read,
    reading,
    unresolved: reading
      .filter((one) => one.kind === 'text' && !/the whole list/.test(one.ref))
      .map((one) => one.ref),
    acceptance: ticket.acceptance,
    depends: ticket.depends,
    waitingOn: ticket.waitingOn,
    dueAt: ticket.dueAt,
    siblings: tickets
      .filter((one) => one.story === ticket.story && one.id !== ticket.id)
      .map((one) => `${one.id} · ${one.title}`),
  };
}

type TicketContext = ReturnType<typeof contextOfTicket>;

// every ticket is briefed through here: a pointer that stops resolving is wrong on all of them
function ticketContextOf(id: string): TicketContext | null {
  const tickets = allTickets();
  const ticket = tickets.find((one) => one.id === id);
  return ticket ? contextOfTicket(ticket, tickets) : null;
}

export { ticketContextOf };
export type { TicketContext };
