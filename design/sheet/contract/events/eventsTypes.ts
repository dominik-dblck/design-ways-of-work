/**
 * - `EventRow`, `Producer` · an event as written
 * - `EventType`, `EventGroup`, `EventProducer` · an event type as everyone reads it
 * - `Actor`, `Target`, `Mention` · who acts, who is told, and a mention listed
 */
import type { ActorKey, Batch, TargetKey } from './eventRows.ts';

// a role key, or a role and a longer label
type Producer = string | readonly [role: string, label: string];

// slack: it replies into the thread when one exists · mention: null for a record, never the mover
type EventRow = readonly [
  key: string,
  producers: readonly Producer[] | null,
  carries: string,
  agentApi: boolean,
  batch: Batch,
  slack: boolean,
  mention: TargetKey | null,
];

interface Actor {
  readonly icon: ActorKey;
  readonly label: string;
}

interface Target {
  readonly short: string;
  readonly means: string;
}

interface EventProducer {
  readonly key: string;
  readonly label: string;
  readonly icon: string;
  readonly agent: boolean;
  readonly agentIcon: string;
}

interface EventType {
  readonly key: string;
  readonly group: string;
  readonly producers: readonly EventProducer[];
  readonly carries: string;
  readonly agentApi: boolean;
  readonly batch: Batch;
  readonly batchLabel: string;
  readonly slack: boolean;
  readonly mention: TargetKey | null;
  readonly mentionWho: string;
  readonly mentionMeans: string;
  readonly mentionLine: string;
  readonly name: string;
}

interface EventGroup {
  readonly id: string;
  readonly label: string;
  readonly events: readonly EventType[];
}

interface Mention {
  readonly key: string;
  readonly name: string;
  readonly group: string;
  readonly target: TargetKey;
  readonly who: string;
  readonly means: string;
  readonly line: string;
}

export type {
  Actor,
  EventGroup,
  EventProducer,
  EventRow,
  EventType,
  Mention,
  Producer,
  Target,
};
