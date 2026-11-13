/**
 * - `SEARCH_LIST_SX`, `LIST_BOX_SX`, `FAILED_SX`, `SEARCH_EMPTY_SX` · the search
 * - `ROW_SX`, `ICON_SX`, `ROW_TEXT_SX`, `META_SX` · one row of it
 */
import type { Theme } from '@mui/material/styles';
import { radiusOf } from '../../../../styles/scales.ts';
import { monoFamily } from '../../../../styles/monoFamily.ts';
import type { SearchListMeta } from '../types/searchListTypes.ts';

export const SEARCH_LIST_SX = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
} as const;

export const LIST_BOX_SX = {
  maxHeight: (theme: Theme) => theme.spacing(24.5),
  overflowY: 'auto',
  borderRadius: radiusOf('uiRControl'),
  border: 1,
  borderColor: 'divider',
  bgcolor: 'background.paper',
} as const;

export const FAILED_SX = { py: 1.25, px: 1.5 } as const;

export const SEARCH_EMPTY_SX = {
  py: 1.75,
  px: 1.5,
} as const;

export const ROW_SX = {
  gap: 1.125,
  py: 1.125,
  px: 1.375,
  borderBottom: 1,
  borderColor: 'border.soft',
  '&.Mui-selected, &.Mui-selected:hover': { bgcolor: 'background.subtle' },
} as const;

export const ICON_SX = {
  display: 'inline-flex',
  color: 'text.secondary',
} as const;

export const ROW_TEXT_SX = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
} as const;

// a label reads as it is written, an address in the code face as it is typed
export const META_SX = {
  label: { variant: 'caption', sx: undefined },
  address: {
    variant: 'caption',
    sx: { fontFamily: monoFamily, textTransform: 'none' },
  },
} as const satisfies Readonly<
  Record<
    SearchListMeta,
    {
      readonly variant: 'caption';
      readonly sx: object | undefined;
    }
  >
>;
