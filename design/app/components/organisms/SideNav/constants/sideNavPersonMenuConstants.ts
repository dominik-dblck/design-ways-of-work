/**
 * - `FACE_SX`, `PERSON_HEAD_SX`, `PERSON_NAME_SX` · the face, the head, the name
 * - `MENU_ORIGIN`, `MENU_SLOTS` · where the menu opens, its list and its paper
 * - `SIGN_OUT_SX`, `SIGN_OUT_REFUSED_SX` · Sign out, and why it did not go through
 */
import type { Theme } from '@mui/material/styles';
import { radiusOf } from '../../../../styles/scales.ts';

export const FACE_SX = {
  width: (theme: Theme) => theme.mixins.control.small,
  aspectRatio: '1 / 1',
  fontSize: 11,
  fontWeight: 'fontWeightBold',
  flexShrink: 0,
} as const;

export const PERSON_HEAD_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 1.25,
  pt: 0.5,
  pb: 1.5,
} as const;

export const PERSON_NAME_SX = {
  fontWeight: 'fontWeightMedium',
  fontSize: 12,
  lineHeight: 1.3,
} as const;

export const MENU_ORIGIN = {
  anchor: { vertical: 'top', horizontal: 'left' },
  transform: { vertical: 'bottom', horizontal: 'left' },
} as const;

export const MENU_SLOTS = {
  list: { sx: { py: 0.75, minWidth: 212 } },
  paper: {
    sx: {
      borderRadius: radiusOf('uiRPopover'),
      border: '1px solid',
      borderColor: 'divider',
    },
  },
} as const;

/** The glyph's edge meets the avatar's and APPEARANCE's · 6 of margin and 4 of padding. */
export const SIGN_OUT_SX = {
  mt: 1,
  fontSize: 12,
  borderRadius: radiusOf('uiRControl'),
  mx: 0.75,
  px: 0.5,
} as const;

export const SIGN_OUT_REFUSED_SX = {
  display: 'block',
  px: 1.25,
  pt: 0.75,
  maxWidth: 212,
} as const;
