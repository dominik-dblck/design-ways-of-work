/**
 * - `dialogBodySxOf`, `dialogHeadSxOf`, `dialogContentSxOf` · body, head, content
 */
import type { SxProps, Theme } from '@mui/material/styles';
import { DIALOG_INSET_X } from '../constants/dialogContentWrapperConstants.ts';

export const dialogBodySxOf = (bare: boolean): SxProps<Theme> => ({
  bgcolor: 'background.default',
  pb: bare ? 2.25 : 0,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
});

const WITH_SUBTITLE = {
  pt: 2.5,
  px: DIALOG_INSET_X,
  pb: 1.75,
  borderBottom: 1,
  borderColor: 'border.soft',
} as const;

/** A subtitle rules the head off the content. */
export const dialogHeadSxOf = (subtitled: boolean): SxProps<Theme> => ({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'flex-start',
  gap: 1,
  ...(subtitled ? WITH_SUBTITLE : { pt: 2.25, px: DIALOG_INSET_X, pb: 0 }),
});

/** The content fades at whichever edge has more to scroll. */
export const dialogContentSxOf = (maskImage: string): SxProps<Theme> => ({
  pt: 1.75,
  px: DIALOG_INSET_X,
  pb: 2.25,
  minHeight: 0,
  overflowY: 'auto',
  maskImage,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});
