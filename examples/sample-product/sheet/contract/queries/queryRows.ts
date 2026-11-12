/**
 * - `QUERIES` · one row per thing a screen asks for
 * - `QUERY_CONTRACT`, `STORE`, `StoreKey` · every query's terms, its stores
 */
import type { QueryRow, Store } from './queriesTypes.ts';

type StoreKey = 'log';

const QUERIES: readonly QueryRow[] = [];

const QUERY_CONTRACT = {};

const STORE: Readonly<Record<StoreKey, Store>> = {
  log: { label: 'LOG', means: 'the events, in order', wash: '', ink: '' },
};

export { QUERIES, QUERY_CONTRACT, STORE };
export type { StoreKey };
