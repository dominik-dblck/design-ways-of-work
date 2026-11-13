/**
 * - `Slider` · a number picked along its range, or a range cut at each thumb
 * - a list of cuts draws a thumb at each, never passing the next
 */
import MuiSlider from '@mui/material/Slider';
import { sxListOf } from '../../../utils/sxListUtils.ts';
import { SLIDER_INSIDE_SX } from '../../../constants/sliderConstants.ts';
import { handlersOf, isOneThumb } from './utils/sliderValueUtils.ts';
import type { SliderBase, SliderCuts, SliderOne } from './types/sliderTypes.ts';

/** One number, one thumb; a list of cuts, a thumb at each. */
export type SliderProps = SliderBase & (SliderOne | SliderCuts);

export function Slider(props: SliderProps): React.ReactElement {
  const { min, max, step, label, format, testId, sx } = props;
  const isDisabled = props.disabled ?? false;
  // one thumb names its input; cuts name each thumb and never swap
  const named = isOneThumb(props)
    ? { value: props.value, slotProps: { input: { 'aria-label': label } } }
    : { value: [...props.value], getAriaLabel: () => label, disableSwap: true };
  return (
    <MuiSlider
      data-testid={testId}
      sx={[SLIDER_INSIDE_SX, ...sxListOf(sx)]}
      size="small"
      min={min}
      max={max}
      step={step}
      marks
      disabled={isDisabled}
      valueLabelDisplay="auto"
      valueLabelFormat={format}
      getAriaValueText={format}
      {...named}
      {...handlersOf(props)}
    />
  );
}
