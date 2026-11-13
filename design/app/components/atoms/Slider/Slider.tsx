/**
 * - `Slider` · a number picked along its range, in its steps
 */
import type { SxProps, Theme } from '@mui/material/styles';
import MuiSlider from '@mui/material/Slider';
import { sxListOf } from '../../../utils/sxListUtils.ts';
import { SLIDER_INSIDE_SX } from '../../../constants/sliderConstants.ts';
import { single } from './utils/sliderValueUtils.ts';

export type SliderProps = {
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly label: string;
  // the value as a person reads it, its unit with it
  readonly format: (value: number) => string;
  readonly disabled?: boolean;
  readonly onChange?: (value: number) => void;
  // the hand let go, on this value
  readonly onCommit?: (value: number) => void;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export function Slider({
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
}: SliderProps): React.ReactElement {
  return (
    <MuiSlider
      data-testid={testId}
      sx={[SLIDER_INSIDE_SX, ...sxListOf(sx)]}
      size="small"
      value={value}
      min={min}
      max={max}
      step={step}
      marks
      disabled={disabled}
      valueLabelDisplay="auto"
      valueLabelFormat={format}
      getAriaValueText={format}
      slotProps={{ input: { 'aria-label': label } }}
      onChange={single(onChange)}
      onChangeCommitted={single(onCommit)}
    />
  );
}
