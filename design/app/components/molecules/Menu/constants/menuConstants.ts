/**
 * - `MENU_ORIGINS` · each placement's two origins; below keeps MUI's own
 * - `MENU_WIDTHS` · the three widths a menu takes, in px
 */
import type { PopoverOrigin } from '@mui/material/Popover';
import type { MenuPlacement, MenuWidth } from '../types/menuTypes.ts';

export const MENU_ORIGINS: Readonly<
  Record<
    MenuPlacement,
    {
      readonly anchorOrigin?: PopoverOrigin;
      readonly transformOrigin?: PopoverOrigin;
    }
  >
> = {
  below: {},
  above: {
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
    transformOrigin: { vertical: 'bottom', horizontal: 'right' },
  },
};

/** A row's actions, a filter's facets on one line, a picker of named things. */
export const MENU_WIDTHS: Readonly<Record<MenuWidth, number>> = {
  narrow: 158,
  medium: 242,
  wide: 288,
};
