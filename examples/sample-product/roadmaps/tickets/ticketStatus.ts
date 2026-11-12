/**
 * - `STATUS` · the one field written by hand: done or dropped, set as the work lands
 */
import type { TicketKeyed } from '../ids.ts';

type Status = 'todo' | 'doing' | 'done' | 'dropped';

// todo is the default: a ticket not listed is todo
const STATUS: Readonly<Record<string, Status | undefined>> =
  {} satisfies TicketKeyed<Status>;

export { STATUS };
