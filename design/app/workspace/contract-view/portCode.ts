/**
 * - `portCode` · a port's operation written out as its types, its callers first
 */
import type * as PORTS from '../../../sheet/contract/ports.ts';
import { commandFields } from './bodyFields.ts';
import { UNTYPED, docLines, okLines, typeLines } from './codeLines.ts';
import { ROUTE_LINE, piecesOf } from './codeTokens.ts';
import type { EndpointCode } from './contractTypes.ts';

type DestinationPort = (typeof PORTS.all)[number];

function portCode(port: DestinationPort): readonly EndpointCode[] {
  return port.operations.map((operation) => {
    const { state, fields } = commandFields(operation.sends);
    const type = operation.id.charAt(0).toUpperCase() + operation.id.slice(1);
    const callers = operation.usedBy.length
      ? operation.usedBy.join(' | ')
      : '—';
    const lines = [
      `// ${port.ticket} · ${operation.name} · used by: ${callers} · ${operation.cites.join(', ')}`,
      `${ROUTE_LINE}${operation.way.toUpperCase()} ${port.destination}.${operation.id}`,
      '',
      ...typeLines(`${type}Sends`, { fields, checks: {} }),
      '',
      `type ${type}Answer =`,
      ...okLines(operation.answers ?? UNTYPED),
      ...(operation.way === 'ask' ? ['  | Unreachable'] : []),
      '',
      ...docLines(operation.note, ''),
    ];
    return {
      anchor: `${port.destination}.${operation.id}`,
      ticket: port.ticket,
      title: operation.name,
      epic: port.epic,
      kind: 'port',
      state: operation.answers ? state : 'todo',
      lines: lines.map(piecesOf),
    };
  });
}

export { portCode };
