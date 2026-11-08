/**
 * - `paletteFor` · the MUI palette of one mode, every value a token's
 */
import type { PaletteOptions } from '@mui/material/styles';
import type { Mode } from '../styles/tokens.ts';
import { colourOf } from './tokenReads.ts';

function paletteFor(mode: Mode): PaletteOptions {
  const read = (key: Parameters<typeof colourOf>[0]): string =>
    colourOf(key, mode);
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
  };
}

export { paletteFor };
