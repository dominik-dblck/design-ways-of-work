/**
 * - `isOneThumb` · one number, not a list of cuts
 * - `handlersOf` · MUI's two handlers, each handing on what the caller reads
 */
import type { SliderCuts, SliderOne } from '../types/sliderTypes.ts';

type Reported = number | readonly number[];

type Handlers = {
  readonly onChange: (event: Event, reported: Reported, thumb: number) => void;
  readonly onChangeCommitted: (
    event: Event | React.SyntheticEvent,
    reported: Reported,
  ) => void;
};

export const isOneThumb = (props: SliderOne | SliderCuts): props is SliderOne =>
  typeof props.value === 'number';

// the cuts MUI reports, as a list whatever their count
const listOf = (reported: Reported): readonly number[] =>
  typeof reported === 'number' ? [reported] : reported;

export function handlersOf(props: SliderOne | SliderCuts): Handlers {
  if (isOneThumb(props))
    return {
      onChange: (_, reported) => {
        if (typeof reported === 'number') props.onChange?.(reported);
      },
      onChangeCommitted: (_, reported) => {
        if (typeof reported === 'number') props.onCommit?.(reported);
      },
    };
  return {
    onChange: (...[, reported, thumb]) =>
      props.onChange?.(listOf(reported), thumb),
    onChangeCommitted: (_, reported) => props.onCommit?.(listOf(reported)),
  };
}
