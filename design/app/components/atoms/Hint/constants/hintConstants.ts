/**
 * - `HINT_BARE_SLOT` · the tooltip's slot when the title draws its own surface
 */
/** The tooltip's slot when the title draws its own surface · no paper, no padding, no width cap. */
export const HINT_BARE_SLOT = {
  tooltip: { sx: { p: 0, maxWidth: 'none', bgcolor: 'transparent' } },
} as const;
