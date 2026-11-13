/**
 * - `DAY_CHARTS` · the two charts of the pace, one column, side by side from md
 */

const DAY_CHARTS = {
  display: 'grid',
  gap: 3,
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
} as const;

export { DAY_CHARTS };
