/**
 * - `RAIL_PADDING_X`, `RAIL_GLYPH_BOX`, `RAIL_WIDE`, `RAIL_NARROW`
 * - `RAIL_LABEL_WIDE`, `RAIL_HEAD_LABEL_WIDE`, `RAIL_COLLAPSE_WIDE` · label room
 */
import { tokens } from '../../../../styles/tokens.ts';

export const RAIL_PADDING_X = 12;

/** The medium control, read rather than picked · every control stands on 28, 32 or 40. */
export const RAIL_GLYPH_BOX = tokens.light.uiHMd;

const RAIL_GAP = 8;
export const RAIL_WIDE = 220;
export const RAIL_NARROW = RAIL_GLYPH_BOX + RAIL_PADDING_X * 2;

/** What is left for a label beside its glyph once the rail is wide. */
export const RAIL_LABEL_WIDE =
  RAIL_WIDE - RAIL_PADDING_X * 2 - RAIL_GLYPH_BOX - RAIL_GAP;

/** The small control the head collapses the rail with. */
export const RAIL_COLLAPSE_WIDE = tokens.light.uiHSm;

/** The head gives the same room back to the collapse control, which the rows have no equivalent of. */
export const RAIL_HEAD_LABEL_WIDE =
  RAIL_LABEL_WIDE - RAIL_COLLAPSE_WIDE - RAIL_GAP;
