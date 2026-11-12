/**
 * - `endpointsOf`, `contractPage`, `contractWords` · an epic's endpoints; the page
 * - `piecesOf` · any line of code in coloured pieces
 * - the types of that code: a piece, a line, an endpoint
 */
import * as COMMANDS from '../../sheet/contract/commands.ts';
import * as PORTS from '../../sheet/contract/ports.ts';
import * as QUERIES from '../../sheet/contract/queries.ts';
import { piecesOf } from './contractView/codeTokens.ts';
import { contractPage } from './contractView/contractPage.ts';
import { CONTRACT_WORDS } from './contractView/contractWords.ts';
import { commandCode, queryCode } from './contractView/endpointCode.ts';
import { portCode } from './contractView/portCode.ts';
import type { EndpointCode } from './contractView/contractTypes.ts';

// a read list names an endpoint as `commands.ts · AddBlock` or `queries.ts · GetDocument`, X.js on a closed ticket
const NAMED = /^(?:commands|queries)\.[tj]s\s+·\s+(\w+)/;

function endpointsOf(
  epic: string,
  read: readonly string[],
): readonly EndpointCode[] {
  const named = new Set(read.flatMap((entry) => NAMED.exec(entry)?.[1] ?? []));
  const mine = (row: { readonly id: string; readonly epic: string }): boolean =>
    row.epic === epic || named.has(row.id);
  return [
    ...COMMANDS.all.filter(mine).map(commandCode),
    ...QUERIES.all.filter(mine).map(queryCode),
    ...PORTS.all.filter((port) => port.epic === epic).flatMap(portCode),
  ];
}

export type {
  CodeLine,
  CodeToken,
  EndpointCode,
  EndpointState,
  TokenKind,
} from './contractView/contractTypes.ts';
export type {
  ContractPageView,
  ContractStat,
  LegendItem,
} from './contractView/contractPageTypes.ts';
export { contractPage, CONTRACT_WORDS as contractWords, endpointsOf, piecesOf };
