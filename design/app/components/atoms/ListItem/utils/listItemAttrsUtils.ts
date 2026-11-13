/**
 * - `listItemAttrsOf` · what both elements of a row take: state, reason, tone, press
 */
import type { SxProps, Theme } from '@mui/material/styles';
import type { ListItemProps, ListItemTone } from '../types/listItemTypes.ts';

export type ListItemAttrs = {
  readonly 'data-testid': string | undefined;
  readonly 'data-tone': ListItemTone;
  readonly 'aria-describedby': string | undefined;
  readonly sx: SxProps<Theme> | undefined;
  readonly selected: boolean;
  readonly disabled: boolean;
  readonly onClick: (() => void) | undefined;
};

/** One shape at two paddings · the difference is a prop, not two wrappers. */
export const listItemAttrsOf = (
  row: Omit<ListItemProps, 'icon' | 'dense' | 'children'>,
): ListItemAttrs => ({
  'data-testid': row.testId,
  'data-tone': row.tone ?? 'default',
  'aria-describedby': row.describedBy,
  sx: row.sx,
  selected: row.selected ?? false,
  disabled: row.disabled ?? false,
  onClick: row.onClick,
});
