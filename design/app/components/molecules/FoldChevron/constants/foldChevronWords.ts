/**
 * - `FOLD_CHEVRON_WORDS` · the default words for the chevron, open and shut
 */
import { CONTROL_LABELS } from '../../../../constants/controlLabelsConstants.ts';
import type { FoldChevronWords } from '../types/foldChevronTypes.ts';

export const FOLD_CHEVRON_WORDS = {
  collapse: CONTROL_LABELS.collapse,
  expand: CONTROL_LABELS.expand,
} as const satisfies FoldChevronWords;
