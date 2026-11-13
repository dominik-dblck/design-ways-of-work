/**
 * - `Divider` · a rule; `inset` stops short of the paper's edge on both sides
 */
import type { SxProps, Theme } from '@mui/material/styles';
import MuiDivider from '@mui/material/Divider';

export type DividerProps = {
  readonly inset?: boolean;
  // a line between two things in a row, as tall as the row
  readonly vertical?: boolean;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function Divider({
  inset = false,
  vertical = false,
  testId,
  sx,
}: DividerProps): React.ReactElement {
  return (
    <MuiDivider
      sx={sx}
      data-testid={testId}
      data-inset={inset ? '' : undefined}
      {...(vertical ? { orientation: 'vertical', flexItem: true } : {})}
    />
  );
}
