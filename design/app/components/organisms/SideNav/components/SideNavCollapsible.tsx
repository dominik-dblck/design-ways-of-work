/**
 * - `SideNavCollapsible` · the text beside the icons, gone to no width
 * - nothing in the rail moves when it narrows
 */
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { railMotion } from '../utils/sideNavRailMotionUtils.ts';

export type SideNavCollapsibleProps = {
  readonly collapsed: boolean;
  // the room the content is allowed once the rail is wide
  readonly width?: number;
  readonly children: ReactNode;
};

export function SideNavCollapsible({
  collapsed,
  width = 160,
  children,
}: SideNavCollapsibleProps): React.ReactElement {
  return (
    <Box
      aria-hidden={collapsed || undefined}
      inert={collapsed}
      sx={{
        overflow: 'hidden',
        minWidth: 0,
        maxWidth: collapsed ? 0 : width,
        opacity: collapsed ? 0 : 1,
        ...railMotion('max-width', 'opacity'),
      }}
    >
      {children}
    </Box>
  );
}
