/**
 * - `QueryRow`, `QueryParam`, `QueryCase` · a query as its row writes it
 * - `Store`, `StoreKey`, `QueryCounts` · the store a query reads; the counts
 */
import type { EpicId, StoryId, TicketId } from '../../../roadmaps/ids.ts';
import type { StoreKey } from './queryRows.ts';

type Where = 'api' | 'guarded' | 'shown';

type QueryParam = readonly [name: string, type: string, means: string];

type QueryCase =
  | readonly [when: string, answer: string]
  | readonly [when: string, answer: string, where: Where]
  | readonly [when: string, answer: string, where: Where, epic: EpicId];

interface QueryRow {
  readonly id: string;
  readonly name: string;
  readonly epic: EpicId;
  readonly story: StoryId;
  // the ticket that cut it, and the epic it grows in when another does
  readonly ticket: TicketId | `${TicketId} → ${EpicId}`;
  readonly route: string;
  readonly answer?: string;
  readonly params: readonly QueryParam[];
  readonly reads: StoreKey;
  readonly shape: string | null;
  readonly keys?: readonly string[];
  readonly serves: readonly string[];
  readonly checks?: Readonly<Record<string, string>>;
  readonly cases?: readonly QueryCase[];
  readonly note: string;
}

interface Store {
  readonly label: string;
  readonly means: string;
  readonly wash: string;
  readonly ink: string;
}

interface QueryCounts {
  readonly total: number;
  readonly byStore: { readonly [store in StoreKey]?: number };
  readonly screens: number;
}

export type { QueryCase, QueryCounts, QueryRow, Store, StoreKey };
