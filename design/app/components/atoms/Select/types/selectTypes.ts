/**
 * - `SelectProps` · the values to pick from, the one picked, its names
 * - `SelectOption` · one value and the words it is listed by
 */
import type { ControlStep } from '../../../../styles/scales.ts';

export type SelectOption<Value extends string> = {
  readonly value: Value;
  readonly label: string;
};

export type SelectProps<Value extends string> = {
  readonly value: Value;
  readonly options: readonly SelectOption<Value>[];
  readonly onChange: (value: Value) => void;
  readonly size?: Exclude<ControlStep, 'lg'>;
  readonly labelledBy?: string;
  readonly disabled?: boolean;
  // handed in, drawn before the pick: what the picked value is, as a mark
  readonly start?: React.ReactElement;
  readonly testId?: string;
};
