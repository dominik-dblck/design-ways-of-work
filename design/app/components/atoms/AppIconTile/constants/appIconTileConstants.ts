/**
 * - `APP_ICON_TILE_SX`, `APP_ICON_CORNERS` · the tile, its corner by its shape
 */

// the platform's white, not the theme's paper · the same in either scheme
export const APP_ICON_TILE_SX = {
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  aspectRatio: '1',
  border: 1,
  borderColor: 'divider',
  bgcolor: 'common.white',
  color: 'common.black',
  '& > svg': { display: 'block', width: '72%', height: '72%' },
} as const;

// an iPhone's corner about a fifth of its side · an Android's round
export const APP_ICON_CORNERS = { squared: '22%', round: '50%' } as const;
