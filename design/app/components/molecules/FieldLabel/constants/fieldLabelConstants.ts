/**
 * - `LABEL_ROW_SX`, `LABEL_WORDS_SX` · the row, and the name with its note
 * - `LABEL_TOGGLE_SX` · the switch's label
 */
export const LABEL_ROW_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
} as const;

export const LABEL_WORDS_SX = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'baseline',
  gap: 1,
} as const;

export const LABEL_TOGGLE_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  flexShrink: 0,
  cursor: 'pointer',
  color: 'text.secondary',
} as const;
