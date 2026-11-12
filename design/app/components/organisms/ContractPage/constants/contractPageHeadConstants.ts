/**
 * - `TILES` · the numbers' grid: two a row on a phone, five on a wide page
 */

const TILES = {
  display: 'grid',
  gap: 2,
  gridTemplateColumns: {
    xs: 'repeat(2, minmax(0, 1fr))',
    md: 'repeat(5, minmax(0, 1fr))',
  },
} as const;

export { TILES };
