/**
 * - `paletteFor` · the MUI palette of one mode, code's inks too, each a token's
 */
import type { PaletteOptions } from '@mui/material/styles';
import type { Mode } from '../styles/tokens.ts';
import { colourOf } from './tokenReads.ts';

type Read = (key: Parameters<typeof colourOf>[0]) => string;

// TypeScript as the original drew it: keywords blue, type names amber, strings green
const codeInksOf = (read: Read): NonNullable<PaletteOptions['code']> => ({
  keyword: read('b300'),
  type: read('o500'),
  string: read('g600'),
  number: read('y500'),
  comment: read('n500'),
});

function paletteFor(mode: Mode): PaletteOptions {
  const read: Read = (key) => colourOf(key, mode);
  return {
    mode,
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
    text: {
      primary: read('fgPrimary'),
      secondary: read('fgTertiary'),
      disabled: read('fgDisabled'),
    },
    background: { default: read('bgSecondary'), paper: read('uiPaperBg') },
    divider: read('bgDivider'),
    code: codeInksOf(read),
  };
}

export { paletteFor };
