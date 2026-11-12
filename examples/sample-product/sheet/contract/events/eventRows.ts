/**
 * - `EVENT_ROWS` · every event as written, by its group
 * - `ACTOR`, `ACTOR_ICONS`, `TARGET`, `BATCH`, `EVENT_GROUPS` · its tables
 * - `producersOf`, `ActorKey`, `Batch`, `TargetKey` · who produces it, its keys
 */
import type { Actor, EventProducer, EventRow, Target } from './eventsTypes.ts';

type ActorKey = 'anyone';
type Batch = 'live';
type TargetKey = 'picked';

const EVENT_ROWS: Readonly<Record<string, readonly EventRow[]>> = {};

const ACTOR: Readonly<Record<ActorKey, Actor>> = {
  anyone: { icon: 'anyone', label: 'Anyone' },
};
const ACTOR_ICONS: Readonly<Record<ActorKey | 'agent', string>> = {
  anyone: '',
  agent: '',
};
const TARGET: Readonly<Record<TargetKey, Target>> = {
  picked: { short: 'picked', means: 'the person picked' },
};
const BATCH: Readonly<Record<Batch, string>> = { live: 'live' };
const EVENT_GROUPS: readonly { readonly id: string; readonly label: string }[] =
  [];

const producersOf = (_row: EventRow): readonly EventProducer[] => [];

export {
  ACTOR,
  ACTOR_ICONS,
  BATCH,
  EVENT_GROUPS,
  EVENT_ROWS,
  TARGET,
  producersOf,
};
export type { ActorKey, Batch, TargetKey };
