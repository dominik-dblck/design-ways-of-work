/**
 * - `Select` · one pick among a few named values, in the platform's own list
 */
import Box from '@mui/material/Box';
import MuiSelect from '@mui/material/Select';
import { muiSizeOf } from '../../../styles/scales.ts';
import type { SelectProps } from './types/selectTypes.ts';

/** It emits the picked option's value, never the event. */
export function Select<Value extends string>(
  props: SelectProps<Value>,
): React.ReactElement {
  const { options, onChange } = props;
  return (
    <MuiSelect
      native
      fullWidth
      value={props.value}
      disabled={props.disabled}
      size={muiSizeOf[props.size ?? 'md']}
      startAdornment={props.start}
      inputProps={{
        'data-testid': props.testId,
        'aria-labelledby': props.labelledBy,
      }}
      onChange={(event) => {
        const picked = options.find(
          (option) => option.value === event.target.value,
        );
        if (picked !== undefined) onChange(picked.value);
      }}
    >
      {options.map((option) => (
        <Box component="option" key={option.value} value={option.value}>
          {option.label}
        </Box>
      ))}
    </MuiSelect>
  );
}
