/**
 * - `FieldLabelToggle` · the switch a label row ends in: words, glyph, on or off
 * - `FieldLabelProps` · the row: the eyebrow, a note, a tag, a switch at its end
 */
import type { GlyphName } from '../../../atoms/Glyph/index.ts';
import type { ChipMark } from '../../../../utils/chipFaceUtils.ts';

export type FieldLabelToggle = {
  readonly label: string;
  readonly icon?: GlyphName;
  readonly selected: boolean;
  readonly onToggle: () => void;
  readonly testId?: string;
};

/** The note is a word beside the label · the version the field last changed in. */
export type FieldLabelProps = {
  readonly label: string;
  readonly id?: string;
  readonly required?: boolean;
  readonly note?: string;
  readonly tag?: ChipMark;
  readonly toggle?: FieldLabelToggle;
  readonly noteTestId?: string;
  readonly tagTestId?: string;
};
