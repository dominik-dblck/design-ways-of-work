/**
 * - `HintCardRow` · one row: its lead, title, note, and whose faces it names
 * - `HintCardSection` · an eyebrow over rows, ruled off what stands above it
 * - `HintCardProps` · a list read on hover; it holds no action, a control does
 */
import type { FaceStackPerson } from '../../FaceStack/index.ts';

/** A refused note reads in the danger ink; faded faces may hold it, nobody does yet. */
export type HintCardRow = {
  readonly lead?: React.ReactNode;
  readonly title: string;
  readonly note: string;
  readonly refused?: boolean;
  readonly faces?: readonly FaceStackPerson[];
  readonly faded?: boolean;
  readonly testId?: string;
  readonly facesTestId?: string;
};

export type HintCardSection = {
  readonly label: string;
  readonly rows: readonly HintCardRow[];
};

/** The count is how far the list has come; head stands over it, the rest under it. */
export type HintCardProps = {
  readonly label: string;
  readonly count?: string;
  readonly rows: readonly HintCardRow[];
  readonly head?: { readonly label: string; readonly row: HintCardRow };
  readonly tail?: HintCardSection;
  readonly sections?: readonly HintCardSection[];
  readonly width: 296 | 340;
  readonly testId?: string;
};
