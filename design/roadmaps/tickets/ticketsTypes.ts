/**
 * - `AuthoredRow`, `TicketWhy`, `TicketKind` · a written row, its why, its kind
 * - `Ticket`, `BoardTicket`, `TicketReceipt`, `Resolved` · built, board, read
 */
import type { EpicId, StoryId, TicketId } from '../ids.ts';
import type * as EDGES from '../edges.ts';
import type * as RECEIPTS from '../receipts.ts';

type TicketKind =
  | 'command'
  | 'schema'
  | 'infra'
  | 'port'
  | 'projection'
  | 'query'
  | 'rule'
  | 'run'
  | 'fixture'
  | 'feature';

// written for the PM, not for the build side: product words, real names, no paths
interface TicketWhy {
  readonly today: string;
  readonly after: string;
  readonly unlocks: string;
  readonly not: string;
  readonly oneLine: string;
  readonly replaced?: string;
  readonly dsScan?: string;
}

// id · epic · story · kind · title · acceptance · touches · depends · note · why
type AuthoredRow = readonly [
  id: string,
  epic: EpicId,
  story: StoryId,
  kind: TicketKind,
  title: string,
  acceptance: readonly string[],
  touches: readonly string[],
  depends: readonly TicketId[],
  note?: string,
  why?: TicketWhy,
];

interface Ticket {
  readonly id: string;
  readonly epic: string;
  readonly story: string;
  readonly kind: TicketKind;
  readonly title: string;
  readonly command: string | null;
  readonly acceptance: readonly string[];
  readonly touches: readonly string[];
  readonly depends: readonly string[];
  readonly note: string;
  readonly why: TicketWhy | null;
  readonly status: string;
}

interface Resolved {
  readonly ref: string;
  readonly kind: string;
  readonly title: string;
  readonly body: string;
  readonly where: string | null;
}

type TicketReceipt = (typeof RECEIPTS)['receipts'][string];

interface BoardTicket extends Ticket {
  readonly column: string;
  readonly waitingOn: readonly string[];
  readonly caveats: readonly string[];
  readonly dueAt: readonly { readonly from: string; readonly text: string }[];
  readonly edges: readonly NonNullable<
    (typeof EDGES)['byTicket'][string]
  >[number][];
  readonly receipt: TicketReceipt | null;
  readonly receiptFlags: readonly string[];
  readonly kindLabel: string;
  readonly kindWash: string;
  readonly kindInk: string;
  readonly kindMeans: string;
  readonly description: string;
  readonly read: readonly string[];
}

export type { AuthoredRow, BoardTicket, TicketReceipt, Resolved, Ticket };
