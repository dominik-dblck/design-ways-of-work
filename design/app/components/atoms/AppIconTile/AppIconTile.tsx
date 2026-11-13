/**
 * - `AppIconTile` · an app's icon: the white tile its mark stands on
 */
import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import {
  APP_ICON_CORNERS,
  APP_ICON_TILE_SX,
} from './constants/appIconTileConstants.ts';

export type AppIconTileProps = {
  readonly size: number;
  readonly shape: keyof typeof APP_ICON_CORNERS;
  // the mark, most of the tile and centred by it
  readonly children: ReactNode;
};

/** Decorative · the sender's name beside it says whose it is. */
export function AppIconTile({
  size,
  shape,
  children,
}: AppIconTileProps): React.ReactElement {
  return (
    <Box
      aria-hidden
      sx={{
        ...APP_ICON_TILE_SX,
        width: size,
        borderRadius: APP_ICON_CORNERS[shape],
      }}
    >
      {children}
    </Box>
  );
}
