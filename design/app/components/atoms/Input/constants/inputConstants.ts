/**
 * - `INPUT_STATE_SX` · the look a warning and a read-only field add to the outline
 */
import type { SxProps, Theme } from '@mui/material/styles';
import type { InputState } from '../types/inputTypes.ts';

export const INPUT_STATE_SX: Readonly<
  Partial<Record<InputState, SxProps<Theme>>>
> = {
  // yellow while typed in too · the focused edge would otherwise hide it until the field is left
  warn: {
    '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline':
      { borderColor: 'warning.dark' },
  },
  readonly: {
    bgcolor: 'background.container',
    color: 'text.secondary',
    '& .MuiInputBase-input': { cursor: 'default' },
    '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline':
      { borderColor: 'border.neutral', borderWidth: 1 },
  },
};
