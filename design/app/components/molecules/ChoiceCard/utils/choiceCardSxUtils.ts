/**
 * - `choiceCardSxOf` · a card's look: ringed when picked, grey when refused
 * - `choiceSpanSxOf` · the span a hint holds, growing with the card
 */
import type { SxProps, Theme } from '@mui/material/styles';
import { radiusOf } from '../../../../styles/scales.ts';
import { SELECTED_SX } from '../../../../constants/selectedConstants.ts';

export type ChoiceCardLook = {
  readonly grow: boolean;
  readonly selected: boolean;
  readonly disabled: boolean;
  readonly centred: boolean;
};

/** No caption, the icon and the label sit centred on one line. */
export const choiceCardSxOf = (look: ChoiceCardLook): SxProps<Theme> => ({
  flex: look.grow ? 1 : undefined,
  minWidth: 0,
  py: 1.375,
  px: 1.5,
  borderRadius: radiusOf('uiRControl'),
  border: 1,
  borderColor: 'divider',
  bgcolor: 'background.paper',
  display: 'flex',
  alignItems: look.centred ? 'center' : 'flex-start',
  justifyContent: 'flex-start',
  gap: 0.875,
  textAlign: 'left',
  color: look.disabled ? 'text.disabled' : 'text.primary',
  cursor: look.disabled ? 'not-allowed' : undefined,
  '&:hover': { bgcolor: look.disabled ? undefined : 'action.hover' },
  ...(look.selected ? SELECTED_SX : {}),
  ...(look.disabled ? { color: 'text.disabled' } : {}),
});

export const choiceSpanSxOf = (grow: boolean): SxProps<Theme> => ({
  display: 'inline-flex',
  flex: grow ? 1 : undefined,
});
