/**
 * - `GRID` · an epic's row: id, name, bar and count, the bar under them on a phone
 */

// on a phone the bar takes a line of its own under the name
const GRID = {
  display: 'grid',
  gridTemplateAreas: {
    xs: '"id name count" "bar bar bar"',
    sm: '"id name bar count"',
  },
  gridTemplateColumns: {
    xs: '72px minmax(0, 1fr) 56px',
    sm: '72px minmax(0, 2fr) minmax(0, 3fr) 56px',
  },
  columnGap: 2,
  rowGap: 0.75,
  alignItems: 'center',
  width: '100%',
} as const;

export { GRID };
