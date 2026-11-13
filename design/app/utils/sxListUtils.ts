/**
 * - `sxListOf` · a caller's `sx` as the entries a component spreads after its own
 */
import type { SxProps, Theme } from '@mui/material/styles';

type SxList = Extract<SxProps<Theme>, ReadonlyArray<unknown>>;

// `Array.isArray` narrows to a mutable array, so a readonly list would stay in the other branch
const isAList = (sx: SxProps<Theme>): sx is SxList => Array.isArray(sx);

/** MUI's own pattern · an `sx` is one style or a list, and a list is spread, never nested. */
export function sxListOf(sx: SxProps<Theme> | undefined): SxList {
  if (sx === undefined) return [];
  return isAList(sx) ? sx : [sx];
}
