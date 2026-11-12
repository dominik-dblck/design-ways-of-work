/**
 * - `TicketCounts`, `ProgressRow`, `Progress` · tickets by column, an epic, the list
 */
import type { ColumnId } from './boardTypes.ts';

type TicketCounts = Readonly<Record<ColumnId, number>>;

// one epic's line: what it is, where it stands, and its tickets by column
interface ProgressRow {
  readonly id: string;
  readonly name: string;
  readonly mvp: boolean;
  readonly badge: string;
  readonly column: ColumnId;
  // its page on the Feature page, every epic has one
  readonly feature: string;
  readonly counts: TicketCounts;
  readonly total: number;
}

// the list on top of the board: the MVP's whole, then every epic in the backlog's order
interface Progress {
  readonly label: string;
  readonly note: string;
  readonly mvp: {
    readonly label: string;
    readonly counts: TicketCounts;
    readonly total: number;
    readonly percent: string;
    readonly tickets: string;
  };
  readonly legend: readonly { readonly id: ColumnId; readonly label: string }[];
  readonly rows: readonly ProgressRow[];
}

export type { Progress, ProgressRow, TicketCounts };
