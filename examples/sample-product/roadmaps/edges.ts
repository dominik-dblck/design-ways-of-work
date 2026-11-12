/**
 * - `byTicket` · each ticket's edges: the cases its criteria do not name, as trees
 */
import type { TicketEdge } from './edges/edgeTypes.ts';

const byTicket: Readonly<Record<string, readonly TicketEdge[] | undefined>> =
  {};

export { byTicket };
