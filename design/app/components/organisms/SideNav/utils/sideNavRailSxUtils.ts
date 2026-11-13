/**
 * - `navItemSxOf` · a route's look, the page's outlined
 * - `markSxOf` · the brand mark, gone while the pointer rests and the chevron shows
 */
import type { SxProps, Theme } from '@mui/material/styles';
import { railMotion } from './sideNavRailMotionUtils.ts';
import { RAIL_GLYPH_BOX } from '../constants/sideNavRailConstants.ts';
import { SELECTED_SX } from '../../../../constants/selectedConstants.ts';
import { radiusOf } from '../../../../styles/scales.ts';

// narrow, the glyph is the whole button · no gap to a label of no width pushes it off centre
export const navItemSxOf = (
  active: boolean,
  collapsed: boolean,
): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: collapsed ? 0 : 1,
  width: '100%',
  justifyContent: collapsed ? 'center' : 'flex-start',
  height: RAIL_GLYPH_BOX,
  borderRadius: radiusOf('uiRControl'),
  textAlign: 'left',
  border: 1,
  borderColor: 'transparent',
  bgcolor: 'transparent',
  color: 'text.primary',
  ...(active ? SELECTED_SX : {}),
  ...railMotion('background-color'),
});

/** The mark is the brand's and states its own ink · a ghost button would grey a glyph. */
export const markSxOf = (pointed: boolean): SxProps<Theme> => ({
  display: 'flex',
  color: 'text.primary',
  opacity: pointed ? 0 : 1,
  ...railMotion('opacity'),
});
