/**
 * - `StateChip` · a document state or type named, never a colour
 */
import Chip from '@mui/material/Chip';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ChipKey } from './types/stateChipTypes.ts';

export type StateChipProps = {
  readonly state: ChipKey;
  readonly label: string;
  // handed in, so the chip draws one element · every chip leads with one
  readonly icon: React.ReactElement;
  // handed in too, after the word: a tool's mark on a published state
  readonly trail?: React.ReactElement;
  // medium where a state stands on its own: the bar, a row, a group's head
  readonly size?: 'small' | 'medium';
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function StateChip({
  state,
  label,
  icon,
  trail,
  size = 'small',
  testId,
  sx,
}: StateChipProps): React.ReactElement {
  return (
    <Chip
      variant="state"
      color={state}
      label={
        trail === undefined ? (
          label
        ) : (
          <>
            {label}
            {trail}
          </>
        )
      }
      icon={icon}
      size={size}
      sx={sx}
      data-testid={testId}
    />
  );
}
