/**
 * - `idsText` · roadmaps/ids.ts: every id the sheet holds, as types to check by
 * - an id gone from the backlog or the tickets fails tsc wherever it is still named
 */
import { epics } from '../roadmaps/backlog.ts';
import { all as tickets } from '../roadmaps/tickets.ts';

// an epic with no number is named, not numbered, and nothing depends on it by number
const NO_NUMBER = '—';

const HEAD = [
  '/**',
  ' * - `EpicId`, `EpicNum`, `StoryId`, `TicketId` · every id the sheet holds',
  ' * - `TicketKeyed` · a map keyed by ticket, each key checked',
  ' */',
  '// written by `yarn build` (tools/ids.ts) from the backlog and the tickets: edit those',
  '',
];

function unionOf(name: string, ids: readonly string[]): readonly string[] {
  const sorted = [...new Set(ids)].sort();
  return [
    `type ${name} =`,
    ...sorted.map(
      (id, at) => `  | '${id}'${at === sorted.length - 1 ? ';' : ''}`,
    ),
    '',
  ];
}

function idsText(): string {
  const all = tickets();
  return [
    ...HEAD,
    ...unionOf(
      'EpicId',
      epics.map((epic) => epic.id),
    ),
    ...unionOf(
      'EpicNum',
      epics.map((epic) => epic.num).filter((epicNum) => epicNum !== NO_NUMBER),
    ),
    ...unionOf(
      'StoryId',
      epics.flatMap((epic) => epic.stories.map((story) => story.id)),
    ),
    ...unionOf(
      'TicketId',
      all.map((ticket) => ticket.id),
    ),
    'type TicketKeyed<Value = unknown> = Partial<Readonly<Record<TicketId, Value>>>;',
    '',
    'export type { EpicId, EpicNum, StoryId, TicketId, TicketKeyed };',
    '',
  ].join('\n');
}

export { idsText };
