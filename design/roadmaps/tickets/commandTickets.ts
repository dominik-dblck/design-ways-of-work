/**
 * - `fromCommand`, `ticketIdOf` · a command's ticket, its criteria from its own row
 */
import { FOLDED, LANDED, PENDING } from './commandStates.ts';
import type { Ticket } from './ticketsTypes.ts';
import type * as COMMANDS from '../../sheet/contract/commands.ts';

type Command = (typeof COMMANDS)['all'][number];

const ticketIdOf = (command: Command): string =>
  `T-${command.epic}-${String(command.no).padStart(2, '0')}`;

// a body is typed once every field reads `field: Type`, or there is none
const typedBody = ({ writes, body }: Command): boolean =>
  !!writes &&
  (body === '—' || body.split('·').every((field) => field.indexOf(':') > 0));

// one edit here reaches every command ticket: a line added is a test on all of them
function derivedOf(command: Command): readonly string[] {
  return [
    ...command.refuses.map(
      (rule) => `refused when ${rule} · 409 carrying the rule`,
    ),
    command.emits.length
      ? `appends ${command.emits.join(', ')} in that order`
      : 'appends nothing · a silent command by decision',
    ...(command.mention ? [`the mention reaches ${command.mention}`] : []),
    ...(command.idempotent ? ['a second identical call appends nothing'] : []),
    `an actor outside [${command.actor.join(', ')}] gets 403`,
    typedBody(command)
      ? `the body is COMMAND_BODIES.${command.id}, emitted from commands.ts · body (writes ${command.writes})`
      : 'the body row is typed on the sheet at refinement — field: Type · …, writes named — before its route is written',
    ...(/hash/.test(command.body)
      ? ['a version or hash that has moved gets 409 and appends nothing']
      : []),
  ];
}

// a landed ticket keeps what it was built against, a pending one opens with its line
function acceptanceOf(command: Command): readonly string[] {
  const id = ticketIdOf(command);
  const folded = FOLDED[id];
  if (folded)
    return [
      `FOLDED into ${folded.into} · built and tested there as ${folded.at} · closes with its report (PM, 23 Sep)`,
    ];
  const kept = LANDED[id] ?? derivedOf(command);
  const pending = PENDING[id];
  return pending ? [pending, ...kept] : kept;
}

function fromCommand(command: Command): Omit<Ticket, 'status'> {
  return {
    id: ticketIdOf(command),
    epic: command.epic,
    story: command.story,
    kind: 'command',
    title: `${command.name} · ${command.route.replace('POST /api/documents/:id/commands/', 'commands/')}`,
    command: command.id,
    acceptance: acceptanceOf(command),
    touches: command.refuses.filter((rule) => /rules/.test(rule)),
    depends: [],
    note: command.note || '',
    why: null,
  };
}

export { fromCommand, ticketIdOf };
