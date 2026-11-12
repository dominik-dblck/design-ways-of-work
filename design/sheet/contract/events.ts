/**
 * - `all`, `byKey`, `eventByKey`, `groups`, `byGroup` · every event type, by key
 * - `actors`, `icons`, `targets`, `mentions` · who acts and who is told
 * - `agentApiOf` · the agent's events
 */
import {
  ACTOR,
  ACTOR_ICONS,
  BATCH,
  EVENT_GROUPS,
  EVENT_ROWS,
  TARGET,
  producersOf,
} from './events/eventRows.ts';
import type {
  EventGroup,
  EventRow,
  EventType,
  Mention,
} from './events/eventsTypes.ts';
import * as COMMANDS from './commands.ts';
import * as MESSAGES from '../words/messages.ts';

// a type's name and its Slack line are messages.ts', read when asked so the words load in any order
function eventOf(row: EventRow, group: string): EventType {
  const [key, , carries, isAgentApi, batch, hasSlackLine, mention] = row;
  const target = mention === null ? null : TARGET[mention];
  return {
    key,
    group,
    get producers() {
      return producersOf(row);
    },
    carries,
    agentApi: isAgentApi,
    batch,
    batchLabel: BATCH[batch],
    slack: hasSlackLine,
    mention,
    mentionWho: target ? `@${target.short}` : '',
    mentionMeans: target ? target.means : '',
    get mentionLine() {
      return MESSAGES.log[key]?.mention || '';
    },
    get name() {
      return MESSAGES.log[key]?.name || key;
    },
  };
}

const EVENTS: readonly EventType[] = EVENT_GROUPS.flatMap((group) =>
  (EVENT_ROWS[group.id] ?? []).map((row) => eventOf(row, group.id)),
);

const BY_KEY: Readonly<Record<string, EventType | undefined>> =
  Object.fromEntries(EVENTS.map((event) => [event.key, event]));

const twice = EVENTS.find(
  (event, at) => EVENTS.findIndex((other) => other.key === event.key) !== at,
);
if (twice) throw new Error(`events.ts · duplicate key ${twice.key}`);

// a key that does not exist is a mistake, never a near miss
function typeOf(key: string): EventType {
  const found = BY_KEY[key];
  if (!found) throw new Error(`events.ts · unknown event key: ${key}`);
  return found;
}

function byGroup(): readonly EventGroup[] {
  return EVENT_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    events: EVENTS.filter((event) => event.group === group.id),
  }));
}

// an event is the agent's when an agent command emits it: one source, the column
function agentApiOf(key: string): boolean | null {
  return COMMANDS.all.some(
    (command) =>
      command.agent !== undefined &&
      command.agent !== 'later' &&
      command.emits.includes(key),
  );
}

function mentions(): readonly Mention[] {
  return EVENTS.flatMap((event) =>
    event.mention === null
      ? []
      : [
          {
            key: event.key,
            name: event.name,
            group: event.group,
            target: event.mention,
            who: event.mentionWho,
            means: event.mentionMeans,
            line: event.mentionLine,
          },
        ],
  );
}

export {
  agentApiOf,
  EVENTS as all,
  EVENT_GROUPS as groups,
  ACTOR as actors,
  ACTOR_ICONS as icons,
  TARGET as targets,
  BY_KEY as byKey,
  typeOf as eventByKey,
  byGroup,
  mentions,
};
