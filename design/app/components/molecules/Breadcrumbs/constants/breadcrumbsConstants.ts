/**
 * - `CRUMB_SWITCH_SX` · a switcher crumb reads as the trail's own text
 * - `CRUMB_LABEL_SX` · a crumb's glyph before its words
 * - `CRUMB_LINK_SX` · a crumb that links reads in the trail's ink, underlined
 */
export const CRUMB_SWITCH_SX = {
  font: 'inherit',
  gap: 0.75,
} as const;

export const CRUMB_LABEL_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
} as const;

export const CRUMB_LINK_SX = {
  ...CRUMB_LABEL_SX,
  color: 'text.primary',
  textDecoration: 'underline',
  textDecorationColor: 'currentColor',
  '&:hover': { color: 'text.primary', textDecoration: 'underline' },
} as const;
