/**
 * - `APP_SHELL_SX`, `APP_SHELL_CONTENT_SX` · the viewport, the content's column
 * - `APP_SHELL_HEADER_SX`, `APP_SHELL_MAIN_SX` · the header row, and main under it
 */
import type { Theme } from '@mui/material/styles';

export const APP_SHELL_SX = {
  display: 'flex',
  height: '100dvh',
  overflow: 'hidden',
} as const;

// the content sheet is a surface, not the colour white
export const APP_SHELL_CONTENT_SX = {
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  bgcolor: 'background.paper',
} as const;

// one row of the wireframe's height, which lives in the toolbar mixin
export const APP_SHELL_HEADER_SX = (theme: Theme) =>
  ({
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: 'divider',
    flexShrink: 0,
  }) as const;

export const APP_SHELL_MAIN_SX = {
  flex: 1,
  minHeight: 0,
  overflow: 'auto',
} as const;
