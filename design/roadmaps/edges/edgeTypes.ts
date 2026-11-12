/**
 * - `TicketEdge` · one case a criterion does not name: its options, pick and why
 */

// on: the criterion · options: two or three answers on one axis · into: where the pick went
interface TicketEdge {
  readonly on: number;
  readonly edge: string;
  readonly options: Readonly<Record<string, string>>;
  readonly pick: string;
  readonly why: string;
  readonly into: string;
}

export type { TicketEdge };
