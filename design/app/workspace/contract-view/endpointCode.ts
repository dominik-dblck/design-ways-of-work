/**
 * - `commandCode`, `queryCode` · a command or a query written out as its types
 * - the body or params, the answer, the refusal lines and the cases, one line each
 */
import type * as COMMANDS from '../../../sheet/contract/commands.ts';
import type * as QUERIES from '../../../sheet/contract/queries.ts';
import { refusalSentence } from '../../../sheet/contract/refusals.ts';
import { commandFields, queryFields } from './bodyFields.ts';
import { UNTYPED, caseLines, okLines, typeLines } from './codeLines.ts';
import { ROUTE_LINE, piecesOf } from './codeTokens.ts';
import type { EndpointCode, BodyField } from './contractTypes.ts';

type Command = (typeof COMMANDS.all)[number];
type QueryRow = (typeof QUERIES.all)[number];

function sentenceOf(key: string): string {
  try {
    return refusalSentence(key);
  } catch {
    return '—';
  }
}

// the stores a command can miss: the document or group its path or body names
interface Where {
  readonly fields: readonly BodyField[];
  readonly path: string;
}

function missingOf(
  command: Command,
  { fields, path }: Where,
): readonly string[] {
  const missing = new Set<string>();
  if (/:id/.test(path))
    missing.add(/groups/.test(path) ? "'group'" : "'document'");
  if (command.id === 'CreateDocument')
    ['document', 'group'].forEach((one) => missing.add(`'${one}'`));
  else if (fields.some(([name]) => name === 'folderId')) missing.add("'group'");
  return [...missing];
}

function answerLines(command: Command, where: Where): readonly string[] {
  const emits = command.emits.map((key) => `'${key}'`).join(' | ');
  const refuses = command.refuses.map((key) => `'${key}'`).join(' | ');
  const missing = missingOf(command, where);
  const ok = command.answer
    ? okLines(command.answer)
    : [
        emits
          ? `  | Ok<{ streamVersion: Seq; events: { seq: Seq; key: ${emits} }[] }>`
          : '  | Ok<{ streamVersion: null }>',
      ];
  return [
    `type ${command.id}Answer =`,
    ...ok,
    ...(refuses ? [`  | Refused<${refuses}>`] : []),
    ...(missing.length ? [`  | Missing<${missing.join(' | ')}>`] : []),
    `  | Forbidden<'${command.id}'>`,
    '  | Malformed | Unauthenticated | ServerError',
  ];
}

const linesOf = (command: Command): readonly string[] =>
  command.refuses.length
    ? [
        '',
        `const ${command.id}Lines = {`,
        ...command.refuses.map(
          (key) => `  '${key}': ${JSON.stringify(sentenceOf(key))},`,
        ),
        '} as const',
      ]
    : [];

function commandCode(command: Command): EndpointCode {
  const ticket = `T-${command.epic}-${String(command.no).padStart(2, '0')}`;
  const { state, fields } = commandFields(command.body);
  const [method = '', ...rest] = command.route.split(' ');
  const path = rest.join(' ');
  const lines = [
    `// ${ticket} · ${command.name} · actor: ${command.actor.join(' | ')}${command.idempotent ? ' · idempotent' : ''}`,
    `${ROUTE_LINE}${method} ${path}`,
    '',
    ...typeLines(`${command.id}Body`, { fields, checks: command.checks ?? {} }),
    '',
    ...answerLines(command, { fields, path }),
    ...linesOf(command),
    ...caseLines(command.id, command.cases),
  ];
  return {
    anchor: command.id,
    ticket,
    title: command.name,
    epic: command.epic,
    kind: 'command',
    state,
    lines: lines.map(piecesOf),
  };
}

function queryCode(query: QueryRow): EndpointCode {
  const { state, fields } = queryFields(query.params, Boolean(query.answer));
  const [method = '', ...rest] = (query.route || 'GET ?').split(' ');
  const path = rest.join(' ');
  const lines = [
    `// ${query.ticket || '—'} · ${query.name} · reads: ${query.reads}`,
    `${ROUTE_LINE}${method} ${path}`,
    '',
    ...typeLines(`${query.id}Params`, { fields, checks: query.checks ?? {} }),
    '',
    `type ${query.id}Answer =`,
    ...(query.answer ? okLines(query.answer) : [`  | Ok<${UNTYPED}>`]),
    ...(/:id/.test(path) ? ["  | Missing<'document'>"] : []),
    '  | Malformed | Unauthenticated | ServerError',
    ...caseLines(query.id, query.cases),
  ];
  return {
    anchor: query.id,
    ticket: query.ticket || '—',
    title: query.name,
    epic: query.epic,
    kind: 'query',
    state,
    lines: lines.map(piecesOf),
  };
}

export { commandCode, queryCode };
