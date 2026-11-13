/**
 * - `inputSlotOf` · the element's own names: test id, label, what describes it
 * - `inputStateOf` · the outline's attributes and look for the one state it is in
 */
import type { SxProps, Theme } from '@mui/material/styles';
import type { InputHTMLAttributes } from 'react';
import { INPUT_STATE_SX } from '../constants/inputConstants.ts';
import type { InputProps, InputState } from '../types/inputTypes.ts';
import { sxListOf } from '../../../../utils/sxListUtils.ts';

export type InputSlot = InputHTMLAttributes<HTMLInputElement> & {
  readonly 'data-testid'?: string | undefined;
};

export type InputStateAttrs = {
  readonly error: boolean;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly autoFocus: boolean;
  readonly sx: SxProps<Theme>;
};

export const inputSlotOf = (input: InputProps): InputSlot => ({
  'data-testid': input.testId,
  'aria-label': input.label,
  'aria-labelledby': input.labelledBy,
  'aria-describedby': input.describedBy,
  'aria-required': input.required === true ? true : undefined,
});

/** Active takes the focus as it mounts; locked is the attribute, read only keeps the focus. */
export const inputStateOf = (
  state: InputState = 'default',
  sx?: SxProps<Theme>,
): InputStateAttrs => ({
  error: state === 'error',
  disabled: state === 'locked',
  readOnly: state === 'readonly',
  autoFocus: state === 'active',
  sx: [...sxListOf(INPUT_STATE_SX[state]), ...sxListOf(sx)],
});
