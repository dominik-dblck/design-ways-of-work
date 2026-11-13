/**
 * - `SELECTED_SX` · a secondary control on: its own fill, the strong border
 */

// a hovered one on keeps its ground · the strong border tells it from a hover
export const SELECTED_SX = {
  bgcolor: 'background.selected',
  borderColor: 'border.strong',
  color: 'text.primary',
  '&:hover': { bgcolor: 'background.selected' },
} as const;
