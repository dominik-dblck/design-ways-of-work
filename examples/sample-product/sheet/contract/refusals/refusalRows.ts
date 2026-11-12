/**
 * - `REFUSAL_ROWS`, `TIER`, `GENERIC_WORDS` · every refusal, its tier, its words
 * - `ACTOR_KEY`, `SHARED_KEY`, `actorKey` · the 403 line of each actor set
 * - `REFUSAL_CONTRACT` · what a refusal is and owes its readers
 */
import type { RefusalRow } from './refusalsTypes.ts';

const REFUSAL_ROWS: readonly RefusalRow[] = [];

const TIER: Readonly<Record<string, number | undefined>> = {};

const GENERIC_WORDS: Readonly<Record<string, string | undefined>> = {};

const ACTOR_KEY: Readonly<Record<string, string | undefined>> = {};

const SHARED_KEY = '';

const actorKey = (_command: unknown): string | undefined => undefined;

const REFUSAL_CONTRACT = {};

export {
  ACTOR_KEY,
  GENERIC_WORDS,
  REFUSAL_CONTRACT,
  REFUSAL_ROWS,
  SHARED_KEY,
  TIER,
  actorKey,
};
