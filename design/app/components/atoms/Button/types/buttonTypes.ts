/**
 * - `ButtonProps` · its own props, and what a wrapping hint hands the element
 * - `ButtonVariant`, `ButtonSize` · its three looks and its three heights
 */
import type { SxProps, Theme } from '@mui/material/styles';
import type { ControlStep } from '../../../../styles/scales.ts';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = ControlStep;

/** Greyed keeps its tab stop and why; disabled leaves the tab order · pressed is a toggle's state. */
export type ButtonProps = Omit<
  React.DOMAttributes<HTMLButtonElement>,
  'children' | 'onClick' | 'dangerouslySetInnerHTML'
> & {
  readonly ref?: React.Ref<HTMLButtonElement>;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly startIcon?: React.ReactNode;
  readonly disabled?: boolean;
  readonly greyed?: boolean;
  readonly describedBy?: string;
  readonly labelledBy?: string;
  // its state in a sentence · read to a screen reader, never shown on hover
  readonly description?: string;
  readonly popup?: 'menu';
  readonly expanded?: boolean;
  readonly loading?: boolean;
  readonly current?: boolean;
  readonly pressed?: boolean;
  readonly onClick?: () => void;
  readonly children: React.ReactNode;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

/** What reaches the split: its look, and what a wrapping hint hands the element. */
export type ButtonRest = Omit<
  ButtonProps,
  | 'describedBy'
  | 'labelledBy'
  | 'description'
  | 'popup'
  | 'expanded'
  | 'pressed'
  | 'children'
  | 'testId'
  | 'sx'
>;

/** A look prop arrives absent, or present and undefined, as a destructured prop does. */
export type ButtonLook = {
  readonly [
    Key in
      | 'variant'
      | 'size'
      | 'startIcon'
      | 'disabled'
      | 'greyed'
      | 'loading'
      | 'current'
      | 'onClick'
  ]?: ButtonProps[Key] | undefined;
};

export type ButtonHanded = Omit<ButtonRest, keyof ButtonLook>;
