/**
 * - `CHECKLIST_READ` · per ticket, the checklist lines refine-check cannot run, read
 */
import type { TicketKeyed } from '../ids.ts';
import type { ReadyKey } from '../../docs/process/plans.ts';

const CHECKLIST_READ: Readonly<
  Record<string, Readonly<Partial<Record<ReadyKey, string>>> | undefined>
> = {} satisfies TicketKeyed;

export { CHECKLIST_READ };
