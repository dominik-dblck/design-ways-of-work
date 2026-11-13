/**
 * - `buttonFaceOf` · its variant, height and start icon; a spinner while it waits
 * - `buttonPressOf` · greyed or spinning, it keeps focus and its reason, no click
 * - `buttonSplitOf` · the look apart from what a wrapping hint hands the element
 */
import CircularProgress from '@mui/material/CircularProgress';
import { controlGlyph, muiSizeOf } from '../../../../styles/scales.ts';
import { greyedMarksOf } from '../../../../utils/greyedMarksUtils.ts';
import type { GreyedMarks } from '../../../../utils/greyedMarksUtils.ts';
import type {
  ButtonHanded,
  ButtonLook,
  ButtonRest,
  ButtonVariant,
} from '../types/buttonTypes.ts';

export type ButtonFace = {
  readonly variant: ButtonVariant;
  readonly size: (typeof muiSizeOf)[keyof typeof muiSizeOf];
  readonly startIcon: React.ReactNode;
  readonly 'aria-busy': true | undefined;
  readonly 'aria-current': 'page' | undefined;
};

export type ButtonPress = GreyedMarks & {
  readonly disabled: boolean;
  readonly onClick: (() => void) | undefined;
};

export const buttonFaceOf = (look: ButtonLook): ButtonFace => {
  const isLoading = look.loading === true;
  return {
    variant: look.variant ?? 'contained',
    size: muiSizeOf[look.size ?? 'md'],
    startIcon: isLoading ? (
      <CircularProgress size={controlGlyph.medium} color="inherit" />
    ) : (
      look.startIcon
    ),
    'aria-busy': isLoading ? true : undefined,
    'aria-current': look.current === true ? 'page' : undefined,
  };
};

export const buttonPressOf = (look: ButtonLook): ButtonPress => {
  const isHeld = look.greyed === true || look.loading === true;
  return {
    ...greyedMarksOf(isHeld),
    disabled: look.disabled === true && !isHeld,
    onClick: isHeld ? undefined : look.onClick,
  };
};

export const buttonSplitOf = ({
  variant,
  size,
  startIcon,
  disabled,
  greyed,
  loading,
  current,
  onClick,
  ...handed
}: ButtonRest): {
  readonly look: ButtonLook;
  readonly handed: ButtonHanded;
} => ({
  look: {
    variant,
    size,
    startIcon,
    disabled,
    greyed,
    loading,
    current,
    onClick,
  },
  handed,
});
