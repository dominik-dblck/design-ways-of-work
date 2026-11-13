/**
 * - `PAGE_HEADER_SX`, `PAGE_HEADER_END_SX` · the row, and what stands at its far end
 */
export const PAGE_HEADER_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.75,
  flex: 1,
  minWidth: 0,
  px: 2.25,
} as const;

export const PAGE_HEADER_END_SX = {
  ml: 'auto',
  display: 'flex',
  alignItems: 'center',
} as const;
