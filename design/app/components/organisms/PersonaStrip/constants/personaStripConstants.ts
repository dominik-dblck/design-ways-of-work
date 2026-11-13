/**
 * - `DIAL_PLACE_SX`, `FACE_FILL_SX` · where the dial floats, a face filling a fab
 * - `DIAL_FAB_SX`, `ACTION_FAB_SX`, `STATIC_LABEL_SX` · the fabs and labels
 */

/** Bottom-right, above MUI's own modals but out of the way of a page's own content. */
export const DIAL_PLACE_SX = {
  position: 'fixed',
  bottom: 100,
  right: 24,
} as const;

export const FACE_FILL_SX = { width: '100%', height: '100%' } as const;

/** No padding and the clip let a face be the button, not a picture on one. */
export const DIAL_FAB_SX = {
  fontSize: 15,
  fontWeight: 'fontWeightBold',
  letterSpacing: 0.5,
  p: 0,
  overflow: 'hidden',
} as const;

/** The reader's own row is ringed; a photograph has no bold weight to say it. */
export const ACTION_FAB_SX = {
  fontSize: 13,
  p: 0,
  overflow: 'hidden',
  outlineColor: 'primary.main',
  outlineOffset: 2,
} as const;

/** One line each · a label that wraps is taller than its row, and ten climb over one another. */
export const STATIC_LABEL_SX = {
  whiteSpace: 'nowrap',
  fontSize: 13,
  lineHeight: 1.6,
  boxShadow: 1,
} as const;
