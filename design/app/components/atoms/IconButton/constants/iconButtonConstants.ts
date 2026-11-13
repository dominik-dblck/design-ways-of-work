/**
 * - `PRESSED_SX`, `GREYED_SX` · a toggle pressed, a greyed button
 */
export const PRESSED_SX = {
  backgroundColor: 'background.subtle',
  color: 'text.primary',
} as const;

export const GREYED_SX = {
  color: 'text.disabled',
  cursor: 'not-allowed',
} as const;
