/**
 * - `Switch` · an on-or-off control
 */
import type { SxProps, Theme } from '@mui/material/styles';
import MuiSwitch from '@mui/material/Switch';

export type SwitchProps = {
  readonly checked?: boolean;
  readonly disabled?: boolean;
  readonly label?: string;
  readonly onChange?: (checked: boolean) => void;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function Switch({
  checked = false,
  disabled = false,
  label,
  onChange,
  testId,
  sx,
}: SwitchProps): React.ReactElement {
  return (
    <MuiSwitch
      data-testid={testId}
      sx={sx}
      checked={checked}
      disabled={disabled}
      slotProps={
        label === undefined ? undefined : { input: { 'aria-label': label } }
      }
      onChange={(event) => onChange?.(event.target.checked)}
    />
  );
}
