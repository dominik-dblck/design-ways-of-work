/**
 * - `Input` · a text input, one line or several, in the one state it is in
 */
import { muiSizeOf } from '../../../styles/scales.ts';
import OutlinedInput from '@mui/material/OutlinedInput';
import type { InputProps } from './types/inputTypes.ts';
import { inputSlotOf, inputStateOf } from './utils/inputAttrsUtils.ts';

/** It emits the typed value, never the event. */
export function Input(props: InputProps): React.ReactElement {
  const { rows, onChange } = props;
  return (
    <OutlinedInput
      {...inputStateOf(props.state, props.sx)}
      value={props.value}
      placeholder={props.placeholder}
      size={muiSizeOf[props.size ?? 'md']}
      multiline={rows !== undefined}
      minRows={rows}
      startAdornment={props.startAdornment}
      endAdornment={props.endAdornment}
      slotProps={{ input: inputSlotOf(props) }}
      onChange={(event) => onChange?.(event.target.value)}
      onBlur={props.onBlur}
    />
  );
}
