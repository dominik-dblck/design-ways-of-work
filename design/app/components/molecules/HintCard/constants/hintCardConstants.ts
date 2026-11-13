/**
 * - `HINT_CARD_SX`, `HINT_CARD_RULE_SX` · a column of the card, the line between
 * - `HINT_CARD_TITLE_SX` · the eyebrow row, its count beside it
 * - `HINT_LINE_SX`, `HINT_LEAD_SX`, `HINT_LINE_TEXT_SX` · one row and its parts
 */
export const HINT_CARD_SX = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
} as const;

export const HINT_CARD_RULE_SX = {
  borderTop: 1,
  borderColor: 'divider',
} as const;

export const HINT_CARD_TITLE_SX = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 0.75,
} as const;

export const HINT_LINE_SX = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 1.25,
} as const;

export const HINT_LEAD_SX = { display: 'inline-flex', pt: 0.25 } as const;

export const HINT_LINE_TEXT_SX = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  flex: 1,
} as const;
