/**
 * - `menuItemsOf` · the menu's rows by group, a line between two groups
 * - `menuSlotsOf` · the menu's paper and its list's width
 */
import Box from '@mui/material/Box';
import type { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import { Badge } from '../../../atoms/Badge/index.ts';
import { Divider } from '../../../atoms/Divider/index.ts';
import { ListItem } from '../../../atoms/ListItem/index.ts';
import type { MenuGroup } from '../types/menuTypes.ts';

/** Built as elements, so the menu's list sees each row as its own item. */
export const menuItemsOf = (
  groups: readonly MenuGroup[],
): readonly (React.ReactElement | null)[] =>
  groups.flatMap((group, at) => [
    at === 0 ? null : <Divider key={`divider-${String(at)}`} inset />,
    ...group.map((entry) => (
      <ListItem
        key={entry.label}
        dense
        tone={entry.tone}
        icon={entry.icon}
        onClick={entry.onSelect}
        testId={entry.testId}
      >
        {entry.label}
        {entry.badge === undefined ? null : (
          <Badge variant="count" count={entry.badge}>
            <Box />
          </Badge>
        )}
      </ListItem>
    )),
  ]);

/** A greyed row stays focusable, so the keyboard reaches what it says. */
export const menuSlotsOf = (width: number): MuiMenuProps['slotProps'] => ({
  paper: { variant: 'menu' },
  list: { sx: { width }, disabledItemsFocusable: true },
});
