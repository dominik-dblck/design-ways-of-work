/**
 * - `SliderBase` · what every slider takes: its range, steps, label and face
 * - `SliderOne`, `SliderCuts` · one number and its handlers, or cuts and theirs
 */
import type { SxProps, Theme } from '@mui/material/styles';

export type SliderBase = {
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly label: string;
  // the value as a person reads it, its unit with it
  readonly format: (value: number) => string;
  readonly disabled?: boolean;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

export type SliderOne = {
  readonly value: number;
  readonly onChange?: (value: number) => void;
  // the hand let go, on this value
  readonly onCommit?: (value: number) => void;
};

export type SliderCuts = {
  readonly value: readonly number[];
  // the cuts as the hand moves them, and the thumb it holds
  readonly onChange?: (value: readonly number[], thumb: number) => void;
  // the hand let go, on these cuts
  readonly onCommit?: (value: readonly number[]) => void;
};
