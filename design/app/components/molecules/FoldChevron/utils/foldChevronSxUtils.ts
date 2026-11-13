/**
 * - `turnSxOf` · the chevron turned down when open
 */
import type { SxProps, Theme } from '@mui/material/styles';

export const turnSxOf = (open: boolean): SxProps<Theme> => ({
  display: 'inline-flex',
  transform: open ? 'rotate(90deg)' : undefined,
});
