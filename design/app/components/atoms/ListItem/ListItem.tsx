/**
 * - `ListItem` · one row of a list: its icon, then its words
 */
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import MenuItem from '@mui/material/MenuItem';
import { GLYPH_GAP_SX } from './constants/listItemConstants.ts';
import type { ListItemProps } from './types/listItemTypes.ts';
import { listItemAttrsOf } from './utils/listItemAttrsUtils.ts';

/** Dense, it is a menu item; otherwise a sidebar row. */
export function ListItem({
  icon,
  dense,
  children,
  ...row
}: ListItemProps): React.ReactElement {
  const attrs = listItemAttrsOf(row);
  const glyph =
    icon === undefined ? null : (
      <Box component="span" sx={GLYPH_GAP_SX}>
        {icon}
      </Box>
    );
  if (dense === true)
    return (
      <MenuItem {...attrs}>
        {glyph}
        {children}
      </MenuItem>
    );
  return (
    <ListItemButton {...attrs}>
      {glyph}
      {children}
    </ListItemButton>
  );
}
