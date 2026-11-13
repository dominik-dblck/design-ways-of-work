/**
 * - `RAIL_HEAD_SX`, `MARK_BOX_SX`, `NARROW_MARK_SX` · the head, the mark's boxes
 * - `EXPAND_SX`, `RAIL_CHEVRON_SX` · the narrow head's widen button and chevron
 * - `SPACER_SX`, `COLLAPSE_SX`, `NAV_LABEL_SX` · the head's controls, a row's label
 */
import { railFadeIn, railMotion } from '../utils/sideNavRailMotionUtils.ts';
import { RAIL_GLYPH_BOX } from './sideNavRailConstants.ts';
import { ONE_LINE_SX } from './sideNavRailSxConstants.ts';

export const RAIL_HEAD_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  pb: 2.25,
} as const;

export const MARK_BOX_SX = {
  position: 'relative',
  width: RAIL_GLYPH_BOX,
  height: RAIL_GLYPH_BOX,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

/** The narrow rail's mark over its word, as tall together as the glyph's box. */
export const NARROW_MARK_SX = {
  flexDirection: 'column',
  alignItems: 'center',
  gap: 0.375,
} as const;

export const EXPAND_SX = {
  position: 'absolute',
  inset: 0,
  ...railMotion('background-color'),
} as const;

export const RAIL_CHEVRON_SX = {
  position: 'absolute',
  display: 'flex',
  color: 'text.secondary',
  ...railFadeIn,
} as const;

export const SPACER_SX = { flex: 1 } as const;

export const COLLAPSE_SX = { flexShrink: 0 } as const;

export const NAV_LABEL_SX = {
  ...ONE_LINE_SX,
  fontWeight: 'fontWeightMedium',
  fontSize: 13,
} as const;
