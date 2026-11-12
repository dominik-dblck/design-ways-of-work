/**
 * - `contractPage` · every endpoint as TypeScript, the numbers, legend and filters
 */
import { epics as EPICS } from '../../../roadmaps/backlog.ts';
import { all as allTickets } from '../../../roadmaps/tickets.ts';
import * as COMMANDS from '../../../sheet/contract/commands.ts';
import * as PORTS from '../../../sheet/contract/ports.ts';
import * as QUERIES from '../../../sheet/contract/queries.ts';
import { DRAFT_CLOSE, DRAFT_OPEN, UNTYPED } from './codeLines.ts';
import { piecesOf } from './codeTokens.ts';
import { CONTRACT_WORDS } from './contractWords.ts';
import { commandCode, queryCode } from './endpointCode.ts';
import { portCode } from './portCode.ts';
import { aliasNames, sharedLines } from './sharedCode.ts';
import type {
  ContractPageView,
  ContractStat,
  LegendItem,
} from './contractPageTypes.ts';
import type { EndpointCode, EndpointState } from './contractTypes.ts';

// a read list names an endpoint as `commands.ts · AddBlock`, X.js on a closed ticket
const NAMED = /^(?:commands|queries)\.[tj]s\s+·\s+(\w+)/;
const STATES: readonly EndpointState[] = ['typed', 'draft', 'todo'];

const order = (epic: string): number =>
  EPICS.findIndex((one) => one.id === epic);

// the endpoints a ticket names with no row behind them yet
function namedWithoutRow(ids: ReadonlySet<string>): number {
  const named = allTickets().flatMap((ticket) =>
    ticket.read.flatMap((entry) => NAMED.exec(entry)?.[1] ?? []),
  );
  return new Set(named.filter((name) => !ids.has(name))).size;
}

function statsOf(endpoints: readonly EndpointCode[]): readonly ContractStat[] {
  const rows = endpoints.filter((one) => one.kind !== 'port');
  const ids = new Set([...COMMANDS.all, ...QUERIES.all].map((row) => row.id));
  const words = CONTRACT_WORDS.stats;
  const count = (state: EndpointState): string =>
    String(rows.filter((one) => one.state === state).length);
  return [
    { id: 'endpoints', value: String(rows.length), note: words.endpoints },
    ...STATES.map((state) => ({
      id: state,
      value: count(state),
      note: words[state],
    })),
    { id: 'noRow', value: String(namedWithoutRow(ids)), note: words.noRow },
  ];
}

// the samples are the model's first two aliases: one as typed, one as drafted
function legendOf(): readonly LegendItem[] {
  const notes = CONTRACT_WORDS.legend;
  const [typed = UNTYPED, drafted = UNTYPED] = aliasNames();
  return [
    { state: 'typed', sample: piecesOf(typed), note: notes.typed },
    {
      state: 'draft',
      sample: piecesOf(`${DRAFT_OPEN}${drafted}${DRAFT_CLOSE}`),
      note: notes.draft,
    },
    { state: 'todo', sample: piecesOf(UNTYPED), note: notes.todo },
  ];
}

function contractPage(): ContractPageView {
  const endpoints = [
    ...COMMANDS.all.map(commandCode),
    ...QUERIES.all.map(queryCode),
    ...PORTS.all.flatMap(portCode),
  ].sort((one, other) => order(one.epic) - order(other.epic));
  const words = CONTRACT_WORDS.states;
  return {
    stats: statsOf(endpoints),
    legend: legendOf(),
    states: [
      { id: null, label: words.all },
      ...STATES.map((state) => ({ id: state, label: words[state] })),
    ],
    epics: [...new Set(endpoints.map((one) => one.epic))],
    shared: { bare: sharedLines(false), notes: sharedLines(true) },
    endpoints,
  };
}

export { contractPage };
