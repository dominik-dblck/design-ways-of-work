/**
 * - `Segmented` · one choice visible at once, MUI's roving tabindex
 */
import type { SxProps, Theme } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SegmentedButton } from './components/SegmentedButton.tsx';
import { muiSizeOf } from '../../../styles/scales.ts';
import type { ControlStep } from '../../../styles/scales.ts';
import type { SegmentedOption, SegmentedName } from './types/segmentedTypes.ts';

export type SegmentedProps<T extends string = string> = SegmentedName & {
  readonly options: readonly SegmentedOption<T>[];
  readonly value: T;
  readonly onPick: (value: T) => void;
  readonly size?: ControlStep;
  // colour only, never geometry
  readonly tone?: 'panel' | 'solid';
  readonly disabled?: boolean;
  readonly sx?: SxProps<Theme>;
  readonly testId?: string;
  readonly optionTestId?: string;
};

export function Segmented<T extends string = string>({
  options,
  value,
  onPick,
  size = 'md',
  tone = 'panel',
  disabled = false,
  sx,
  testId,
  optionTestId,
  labelledBy,
  label,
}: SegmentedProps<T>): React.ReactElement {
  return (
    <ToggleButtonGroup
      aria-labelledby={labelledBy}
      aria-label={label}
      exclusive
      value={value}
      size={muiSizeOf[size]}
      disabled={disabled}
      data-tone={tone}
      data-testid={testId}
      sx={sx}
      onChange={(_event, next: T | null) => {
        if (next !== null) onPick(next);
      }}
    >
      {options.map((option) => (
        <SegmentedButton key={option.value} {...option} testId={optionTestId} />
      ))}
    </ToggleButtonGroup>
  );
}
