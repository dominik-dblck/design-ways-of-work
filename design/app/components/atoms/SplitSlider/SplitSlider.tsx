/**
 * - `SplitSlider` · a range cut into parts, a thumb at each cut, never passing
 */
import type { SxProps, Theme } from '@mui/material/styles';
import MuiSlider from '@mui/material/Slider';
import { sxListOf } from '../../../utils/sxListUtils.ts';
import { SLIDER_INSIDE_SX } from '../../../constants/sliderConstants.ts';
import { thumbsOf } from './utils/splitSliderValueUtils.ts';

export type SplitSliderProps = {
  readonly value: readonly number[];
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly label: string;
  // a cut as a person reads it
  readonly format: (value: number) => string;
  readonly disabled?: boolean;
  // the cuts as the hand moves them, and the thumb it holds
  readonly onChange?: (value: readonly number[], thumb: number) => void;
  // the hand let go, on these cuts
  readonly onCommit?: (value: readonly number[]) => void;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function SplitSlider({
  value,
  min,
  max,
  step,
  label,
  format,
  disabled = false,
  onChange,
  onCommit,
  testId,
  sx,
}: SplitSliderProps): React.ReactElement {
  return (
    <MuiSlider
      data-testid={testId}
      sx={[SLIDER_INSIDE_SX, ...sxListOf(sx)]}
      size="small"
      value={[...value]}
      min={min}
      max={max}
      step={step}
      marks
      disableSwap
      disabled={disabled}
      valueLabelDisplay="auto"
      valueLabelFormat={format}
      getAriaValueText={format}
      getAriaLabel={() => label}
      onChange={(...[, next, thumb]) => onChange?.(thumbsOf(next), thumb)}
      onChangeCommitted={(_, next) => onCommit?.(thumbsOf(next))}
    />
  );
}
