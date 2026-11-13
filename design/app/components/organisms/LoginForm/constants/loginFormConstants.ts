/**
 * - `LOGIN_CARD_SX`, `LOGIN_BRAND_SX`, `LOGIN_DENIED_SX` · card, mark, the error
 * - `LOGIN_TAGLINE_SX` · the line over the mark
 * - `LOGIN_WAY_SX`, `LOGIN_FOOT_SX` · a way in, who may use it
 */
// the design's 440 is the content's · its 36px sides and the border stand outside it
export const LOGIN_CARD_SX = {
  maxWidth: 514,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  pt: 8,
  px: 4.5,
  pb: 7,
} as const;

export const LOGIN_TAGLINE_SX = { fontSize: 22, lineHeight: 1.3 } as const;

export const LOGIN_BRAND_SX = {
  mt: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1.75,
} as const;

export const LOGIN_DENIED_SX = {
  mt: 3,
  textAlign: 'left',
  width: '100%',
} as const;

export const LOGIN_WAY_SX = {
  mt: 1,
  width: '100%',
  fontSize: '0.875rem',
  fontWeight: 'fontWeightMedium',
  borderColor: 'divider',
} as const;

export const LOGIN_FOOT_SX = { mt: 2.5 } as const;
