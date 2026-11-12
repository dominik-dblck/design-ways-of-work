/**
 * - `LANDED`, `PENDING`, `FOLDED` · a command ticket closed, waiting, built in one
 */
import type { TicketKeyed } from '../ids.ts';

const LANDED: Readonly<Record<string, readonly string[] | undefined>> =
  {} satisfies TicketKeyed;

const PENDING: Readonly<Record<string, string | undefined>> =
  {} satisfies TicketKeyed;

const FOLDED: Readonly<
  Record<string, { readonly into: string; readonly at: string } | undefined>
> = {} satisfies TicketKeyed;

export { FOLDED, LANDED, PENDING };
