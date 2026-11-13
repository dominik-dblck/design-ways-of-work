/**
 * - `ListItemProps` · one row: a menu item when dense, a sidebar row when not
 * - `ListItemTone` · the row's ink: default, or danger
 */
import type { SxProps, Theme } from '@mui/material/styles';

export type ListItemTone = 'default' | 'danger';

/** The icon goes before the words in the row's ink · describedBy names its reason. */
export type ListItemProps = {
  readonly selected?: boolean;
  readonly disabled?: boolean;
  readonly describedBy?: string;
  readonly icon?: React.ReactNode;
  readonly tone?: ListItemTone;
  readonly dense?: boolean;
  readonly onClick?: () => void;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
  readonly children: React.ReactNode;
};
