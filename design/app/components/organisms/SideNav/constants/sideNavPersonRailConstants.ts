/**
 * - `TRIGGER_SX` · the rail's person button, its face in the glyph's box
 * - `RAIL_NAME_SX` · the name beside the face, on one line
 * - `RAIL_LINES_SX`, `RAIL_EMAIL_SX` · the name over the email, one line each
 */
import { RAIL_GLYPH_BOX } from './sideNavRailConstants.ts';
import { ONE_LINE_SX } from './sideNavRailSxConstants.ts';
import { radiusOf } from '../../../../styles/scales.ts';

export const TRIGGER_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  width: '100%',
  justifyContent: 'flex-start',
  height: RAIL_GLYPH_BOX,
  borderRadius: radiusOf('uiRControl'),
  textAlign: 'left',
} as const;

export const RAIL_LINES_SX = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
} as const;

export const RAIL_EMAIL_SX = ONE_LINE_SX;

export const RAIL_NAME_SX = {
  ...ONE_LINE_SX,
  lineHeight: 1.2,
  fontWeight: 'fontWeightMedium',
  fontSize: 12,
} as const;
