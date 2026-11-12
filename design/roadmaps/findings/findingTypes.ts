/**
 * - `FindingRow`, `FindingSide` · an open finding, and the side that holds it
 */
interface FindingRow {
  readonly id: string;
  readonly side: 'design' | 'repo';
  readonly title: string | null;
  readonly says: string;
}

interface FindingSide {
  readonly side: FindingRow['side'];
  readonly title: string;
  readonly note: string | null;
}

export type { FindingSide, FindingRow };
