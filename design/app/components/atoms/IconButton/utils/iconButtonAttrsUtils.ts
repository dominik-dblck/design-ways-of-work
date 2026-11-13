/**
 * - `iconButtonAttrsOf` · variant, size, look, and a press that greyed goes nowhere
 */
import type { SxProps, Theme } from '@mui/material/styles';
import { muiSizeOf } from '../../../../styles/scales.ts';
import { GREYED_SX, PRESSED_SX } from '../constants/iconButtonConstants.ts';
import type {
  IconButtonLook,
  IconButtonVariant,
} from '../types/iconButtonTypes.ts';

export type IconButtonAttrs = {
  readonly variant: IconButtonVariant;
  readonly size: (typeof muiSizeOf)[keyof typeof muiSizeOf];
  readonly sx: SxProps<Theme>;
  readonly 'aria-disabled': true | undefined;
  readonly disabled: boolean;
  readonly disableRipple: true | undefined;
  readonly onClick: (() => void) | undefined;
};

const sxOf = (look: IconButtonLook): SxProps<Theme> => [
  look.pressed === true && PRESSED_SX,
  look.greyed === true && GREYED_SX,
  ...(Array.isArray(look.sx) ? look.sx : [look.sx]),
];

/** Greyed, it keeps its tab stop and its reason; the click goes nowhere. */
export const iconButtonAttrsOf = (look: IconButtonLook): IconButtonAttrs => {
  const isGreyed = look.greyed === true;
  return {
    variant: look.variant ?? 'ghost',
    size: muiSizeOf[look.size ?? 'md'],
    sx: sxOf(look),
    'aria-disabled': isGreyed ? true : undefined,
    disabled: look.disabled === true && !isGreyed,
    disableRipple: isGreyed ? true : undefined,
    onClick: isGreyed ? undefined : look.onClick,
  };
};
