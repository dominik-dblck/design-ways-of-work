/**
 * - `VISUALLY_HIDDEN` · read by a screen reader, drawn nowhere
 */

/** Read by a screen reader and the page's text, drawn nowhere · a line the hover shows. */
export const VISUALLY_HIDDEN = {
  position: 'absolute',
  width: '1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
} as const;
