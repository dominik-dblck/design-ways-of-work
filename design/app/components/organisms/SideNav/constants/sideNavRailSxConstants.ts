/**
 * - `GLYPH_BOX_SX` · the box a rail glyph, the mark or a face sits in, centred
 * - `ONE_LINE_SX` · a rail label on one line, cut with an ellipsis
 * - `SIDE_NAV_SX` · the rail itself, its width aside: it slides between two
 */
import { unitsOf } from '../../../../styles/scales.ts';
import { railMotion } from '../utils/sideNavRailMotionUtils.ts';
import { RAIL_GLYPH_BOX, RAIL_PADDING_X } from './sideNavRailConstants.ts';

export const GLYPH_BOX_SX = {
  width: RAIL_GLYPH_BOX,
  height: RAIL_GLYPH_BOX,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

export const ONE_LINE_SX = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
} as const;

export const SIDE_NAV_SX = {
  flexShrink: 0,
  borderRight: '1px solid',
  borderColor: 'divider',
  // the canvas tone · action.hover is a translucent overlay and would darken what is behind
  bgcolor: 'background.default',
  display: 'flex',
  flexDirection: 'column',
  // the shell is the viewport, so the rail scrolls itself rather than clip its foot
  minHeight: 0,
  overflowY: 'auto',
  // the width is mid-slide for 220ms and the wide content must be clipped, not spilled
  overflowX: 'hidden',
  gap: 0.5,
  px: unitsOf(RAIL_PADDING_X),
  py: 2,
  ...railMotion('width'),
} as const;
