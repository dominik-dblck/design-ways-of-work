/**
 * - `EpicId`, `EpicNum`, `StoryId`, `TicketId` · every id the sheet holds
 * - `TicketKeyed` · a map keyed by ticket, each key checked
 */
// written by `yarn build` (tools/ids.ts) from the backlog and the tickets: edit those

type EpicId =
  | 'E01';

type EpicNum =
  | '01';

type StoryId =
  | 'E01-S1';

type TicketId =
  | 'T-E01-01';

type TicketKeyed<Value = unknown> = Partial<Readonly<Record<TicketId, Value>>>;

export type { EpicId, EpicNum, StoryId, TicketId, TicketKeyed };
