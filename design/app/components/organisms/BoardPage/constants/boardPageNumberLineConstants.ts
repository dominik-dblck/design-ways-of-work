/**
 * - `GRID` · a line's numbers as tiles, as many to a row as its width holds
 */

const GRID = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(8.5rem, 1fr))',
  columnGap: 3,
  rowGap: 2,
} as const;

export { GRID };
