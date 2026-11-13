/**
 * - `DIALOG_FORM_SX`, `DIALOG_INSET_X` · the frame, every band's inset
 * - `DIALOG_TITLES_SX`, `DIALOG_TITLE_ROW_SX`, `DIALOG_TITLE_SX` · the titles
 * - `DIALOG_PINNED_SX`, `DIALOG_ACTIONS_SX`, `DIALOG_SUMMARY_SX` · the foot
 */
export const DIALOG_INSET_X = 2.75;

export const DIALOG_FORM_SX = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
} as const;

export const DIALOG_TITLES_SX = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 0.375,
} as const;

export const DIALOG_TITLE_ROW_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  minWidth: 0,
} as const;

// a title opens on a capital, a name written in lower case among them
export const DIALOG_TITLE_SX = {
  p: 0,
  typography: 'h5',
  '&::first-letter': { textTransform: 'uppercase' },
} as const;

export const DIALOG_PINNED_SX = {
  flexShrink: 0,
  pt: 1.75,
  px: DIALOG_INSET_X,
  pb: 2.25,
  borderTop: 1,
  borderColor: 'border.soft',
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
} as const;

export const DIALOG_ACTIONS_SX = {
  flexShrink: 0,
  py: 1.75,
  px: DIALOG_INSET_X,
  gap: 1,
  borderTop: 1,
  borderColor: 'divider',
} as const;

export const DIALOG_SUMMARY_SX = {
  flex: 1,
  typography: 'caption',
  color: 'text.secondary',
} as const;
