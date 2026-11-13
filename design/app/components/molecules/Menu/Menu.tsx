/**
 * - `Menu` · MUI's own menu: its focus trap, its escape, focus back to the anchor
 * - rows that need more than a label are drawn by the caller and handed in
 */
import MuiMenu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import { MENU_ORIGINS, MENU_WIDTHS } from './constants/menuConstants.ts';
import type { MenuGroup, MenuPlacement, MenuWidth } from './types/menuTypes.ts';
import { menuItemsOf, menuSlotsOf } from './utils/menuItemsUtils.tsx';

export type MenuProps = {
  readonly anchorEl: HTMLElement | null;
  readonly groups?: readonly MenuGroup[];
  readonly width?: MenuWidth;
  readonly header?: React.ReactNode;
  readonly placement?: MenuPlacement;
  readonly onClose?: () => void;
  readonly children?: React.ReactNode;
};

/** Inside a dialog it opens in the dialog, so the dialog's focus trap holds it. */
export function Menu({
  anchorEl,
  groups = [],
  width = 'narrow',
  header,
  placement = 'below',
  onClose,
  children,
}: MenuProps): React.ReactElement {
  return (
    <MuiMenu
      {...MENU_ORIGINS[placement]}
      open={anchorEl !== null}
      anchorEl={anchorEl}
      container={anchorEl?.closest('.MuiDialog-root') ?? null}
      onClose={onClose}
      slotProps={menuSlotsOf(MENU_WIDTHS[width])}
    >
      {header === undefined ? null : <Box>{header}</Box>}
      {menuItemsOf(groups)}
      {children}
    </MuiMenu>
  );
}
