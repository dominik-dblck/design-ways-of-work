/**
 * - `ColumnId`, `Column`, `EpicBadge` · where a card stands, a column, a badge
 * - `TicketLine`, `EpicCard`, `TicketDetail`, `Section` · a ticket, an epic, a group
 * - `Stat`, `IdeaCard`, `Velocity`, `VelocityDay` · counts, pace
 */
type ColumnId = 'blocked' | 'ready' | 'doing' | 'done';

interface EpicBadge {
  readonly label: string;
  readonly tone: 'mvp' | 'later' | 'deferred';
}

interface TicketLine {
  readonly id: string;
  readonly title: string;
  readonly kindLabel: string;
  readonly column: string;
  readonly columnLabel: string;
  readonly waitingOn: readonly string[];
}

interface EpicCard {
  readonly id: string;
  readonly name: string;
  readonly sub: string;
  readonly done: string;
  readonly badge: EpicBadge;
  readonly tags: readonly string[];
  readonly stories: readonly {
    readonly id: string;
    readonly title: string;
    readonly criterion: string;
  }[];
  readonly feature: TicketLine | null;
  readonly tickets: readonly TicketLine[];
  readonly doneCount: number;
  readonly column: ColumnId;
  readonly waiting: readonly string[];
}

interface Column {
  readonly id: ColumnId;
  readonly label: string;
  readonly note: string;
  readonly epics: readonly EpicCard[];
}

// a labelled group of lines a panel draws as it is
interface Section {
  readonly label: string;
  readonly lines: readonly string[];
}

interface Reading {
  readonly title: string;
  readonly body: string;
}

interface TicketDetail extends TicketLine {
  readonly epic: string;
  readonly story: string | null;
  readonly command: string | null;
  readonly refusals: readonly Reading[];
  readonly reading: readonly Reading[];
  readonly siblings: readonly string[];
  readonly why: readonly string[];
  readonly edgeQuestion: string;
  readonly edgeSections: readonly Section[];
  readonly description: string;
  readonly acceptance: readonly string[];
  readonly read: readonly string[];
  readonly caveats: readonly string[];
  readonly receiptFlags: readonly string[];
  readonly edges: readonly {
    readonly edge: string;
    readonly pick: string;
    readonly why: string;
  }[];
}

// one number of the board: its value, a few words beside it, what it counts on hover
interface Stat {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  // its whole, its parts or its change
  readonly sub: string | null;
  // how much of its whole it is, drawn as a bar
  readonly share: number | null;
  readonly note: string | null;
  // the page it opens on, when it has one
  readonly href: string | null;
}

interface VelocityDay {
  readonly day: string;
  readonly tickets: number;
  readonly criteria: number;
}

interface Velocity {
  readonly summary: string;
  readonly days: readonly VelocityDay[];
  readonly ticketsPerDay: number;
  readonly criteriaPerDay: number;
  readonly ticketsLeft: number;
  readonly criteriaLeft: number;
  readonly daysLeft: number | null;
  readonly overDays: number;
}

interface IdeaCard {
  readonly id: string;
  readonly title: string;
  readonly status: string;
  readonly raised: string;
  readonly line: string;
  readonly sections: readonly Section[];
}

export type {
  EpicBadge,
  Column,
  ColumnId,
  EpicCard,
  IdeaCard,
  Reading,
  Section,
  Stat,
  TicketDetail,
  TicketLine,
  Velocity,
  VelocityDay,
};
