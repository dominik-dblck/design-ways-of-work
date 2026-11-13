/**
 * - `IconButtonProps` · a square button with a glyph; `label` is its accessible name
 * - `IconButtonVariant`, `IconButtonSize`, `IconButtonLook` · looks, sizes, press
 */
import type { SxProps, Theme } from '@mui/material/styles';
import type { ControlStep } from '../../../../styles/scales.ts';

export type IconButtonVariant = 'outlined' | 'ghost' | 'filled';
export type IconButtonSize = ControlStep;

/** Greyed keeps its pointer and its tab stop, and the click goes nowhere. */
export type IconButtonProps = Omit<
  React.DOMAttributes<HTMLButtonElement>,
  'children' | 'onClick' | 'dangerouslySetInnerHTML'
> & {
  readonly ref?: React.Ref<HTMLButtonElement>;
  readonly label: string;
  readonly variant?: IconButtonVariant;
  readonly size?: IconButtonSize;
  readonly disabled?: boolean;
  readonly greyed?: boolean;
  readonly describedBy?: string;
  readonly pressed?: boolean;
  readonly expanded?: boolean;
  readonly onClick?: () => void;
  readonly children: React.ReactNode;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

/** A look prop arrives absent, or present and undefined, as a destructured prop does. */
export type IconButtonLook = {
  readonly [
    Key in
      'variant' | 'size' | 'disabled' | 'greyed' | 'pressed' | 'onClick' | 'sx'
  ]?: IconButtonProps[Key] | undefined;
};
