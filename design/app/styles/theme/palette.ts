/**
 * - `paletteFor` · one palette shape, resolved per mode from the roles that flip
 */
import type { PaletteOptions } from '@mui/material/styles';
import type { LightToken, Mode } from '../tokens.ts';

type Read = (key: LightToken) => string;

const intentsOf = (read: Read) => ({
  primary: {
    main: read('bgPrimary'),
    dark: read('bgPrimaryPressed'),
    contrastText: read('fgSecondary'),
  },
  secondary: {
    main: read('n50'),
    dark: read('n75'),
    contrastText: read('fgPrimary'),
  },
  error: {
    main: read('r400'),
    dark: read('r500'),
    contrastText: read('dbkWhite'),
  },
  warning: { main: read('y300'), contrastText: read('dbkBlack') },
  success: { main: read('g400'), contrastText: read('dbkBlack') },
  info: {
    main: read('b300'),
    dark: read('b400'),
    contrastText: read('dbkWhite'),
  },
});

const greyOf = (read: Read) => ({
  50: read('n50'),
  100: read('n100'),
  200: read('n200'),
  300: read('n300'),
  400: read('n400'),
  500: read('n500'),
  600: read('n600'),
  700: read('n700'),
  800: read('n800'),
  900: read('n900'),
});

// roles, not ramp steps · a primitive has no dark value, so it would repaint nothing
const rolesOf = (read: Read) => ({
  background: {
    default: read('bgDisplay'),
    paper: read('bgSecondary'),
    subtle: read('bgSubtle'),
    soft: read('bgSoft'),
    container: read('bgContainer'),
    selected: read('uiSelectedFill'),
  },
  text: {
    primary: read('fgPrimary'),
    secondary: read('fgTertiary'),
    disabled: read('fgDisabled'),
    micro: read('inkMicro'),
    danger: read('inkDanger'),
    empty: read('fgEmpty'),
    link: read('inkLink'),
  },
  divider: read('bdContainer'),
  border: {
    soft: read('bdNeutralSoft'),
    neutral: read('bdNeutral'),
    strong: read('bdStrong'),
  },
  action: {
    hover: read('uiHoverFill'),
    selected: read('bgPrimary'),
    disabledBackground: read('bgSubtle'),
  },
});

/** The palette for a mode · `read` resolves a role, so a role dark leaves out is light's. */
export const paletteFor = (mode: Mode, read: Read): PaletteOptions => ({
  mode,
  ...intentsOf(read),
  grey: greyOf(read),
  ...rolesOf(read),
});

declare module '@mui/material/styles' {
  interface Palette {
    border: { soft: string; neutral: string; strong: string };
  }
  interface PaletteOptions {
    border?: { soft: string; neutral: string; strong: string };
  }
  interface TypeBackground {
    subtle: string;
    soft: string;
    container: string;
    selected: string;
  }
  interface TypeText {
    micro: string;
    danger: string;
    empty: string;
    link: string;
  }
}
