/**
 * - `all`, `byId` · one row per thing a screen asks for and nothing writes
 * - `contract`, `stores` · what every query carries, and the store it reads
 * - `counts` · the queries by the store they read, and the screens they serve
 */
import type {
  QueryCounts,
  QueryRow,
  StoreKey,
} from './queries/queriesTypes.ts';
import { QUERIES, QUERY_CONTRACT, STORE } from './queries/queryRows.ts';

const BY_ID: Readonly<Record<string, QueryRow | undefined>> =
  Object.fromEntries(QUERIES.map((query) => [query.id, query]));

function counts(): QueryCounts {
  const byStore: Partial<Record<StoreKey, number>> = {};
  for (const query of QUERIES)
    byStore[query.reads] = (byStore[query.reads] ?? 0) + 1;
  return {
    total: QUERIES.length,
    byStore,
    screens: new Set(QUERIES.flatMap((query) => query.serves)).size,
  };
}

export {
  QUERIES as all,
  BY_ID as byId,
  STORE as stores,
  QUERY_CONTRACT as contract,
  counts,
};
