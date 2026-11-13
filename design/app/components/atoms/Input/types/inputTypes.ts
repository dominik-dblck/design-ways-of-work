/**
 * - `InputProps` · a text field's one input: its value, its state, its names
 * - `InputSize`, `InputState` · the controls' heights, and the one state it is in
 */
import type { SxProps, Theme } from '@mui/material/styles';
import type { ControlStep } from '../../../../styles/scales.ts';

export type InputSize = ControlStep;

/** One state, never four booleans · a field reads locked, read only or failing, never two. */
export type InputState =
  'default' | 'active' | 'locked' | 'readonly' | 'error' | 'warn';

/** `rows` makes it several lines, at least that many · a single line when absent. */
export type InputProps = {
  readonly value: string;
  readonly onChange?: (value: string) => void;
  readonly onBlur?: () => void;
  readonly placeholder?: string;
  readonly size?: InputSize;
  readonly state?: InputState;
  readonly startAdornment?: React.ReactNode;
  readonly endAdornment?: React.ReactNode;
  readonly label?: string;
  readonly labelledBy?: string;
  readonly describedBy?: string;
  readonly required?: boolean;
  readonly rows?: number;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};
