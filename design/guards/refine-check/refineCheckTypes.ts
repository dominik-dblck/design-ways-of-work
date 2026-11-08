/**
 * - `Finding` · the checklist rule a ticket breaks, where, and what to do
 * - `SheetEdge`, `SheetTicket`, `SheetTickets` · an edge, a ticket, their global
 */
import type {
  ChecklistKey,
  DeliveryKey,
  DesignKey,
  PrincipleKey,
} from '../../docs/process/plans.ts';
import type * as EDGES from '../../roadmaps/edges.ts';
import type * as TICKETS from '../../roadmaps/tickets.ts';

type SheetTickets = typeof TICKETS;
type SheetTicket = NonNullable<SheetTickets['byId'][string]>;

type SheetEdge = NonNullable<(typeof EDGES)['byTicket'][string]>[number];

interface Finding {
  readonly rule: ChecklistKey | DeliveryKey | DesignKey | PrincipleKey;
  readonly where: string;
  readonly text: string;
}

export type { Finding, SheetEdge, SheetTicket, SheetTickets };
