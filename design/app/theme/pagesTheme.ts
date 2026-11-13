/**
 * - `pagesTheme` · the pages' theme: the shared one, with code's type and inks
 */
import type { Theme } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import { themeWith } from '../styles/theme.ts';
import { colourOf, lengthOf, tokenTextOf } from './tokenReads.ts';

// TypeScript as the original drew it: keywords blue, type names amber, strings green · one ramp in both modes
const CODE_INKS = {
  keyword: colourOf('b300'),
  type: colourOf('o500'),
  string: colourOf('g600'),
  number: colourOf('y500'),
  comment: colourOf('n500'),
};

const CODE_TYPE: CSSProperties = {
  fontFamily: tokenTextOf('fontMono'),
  fontSize: lengthOf('uiLabel'),
  lineHeight: 1.6,
  whiteSpace: 'pre',
};

// the pages draw no state of their own: the shared states and chips alone, code's inks the one slot added
const shared = themeWith({
  statePairs: {},
  chips: {},
  chipVariants: [],
  palette: { code: CODE_INKS },
});

// the code variant joins the shared type; the theme is otherwise as built
const pagesTheme: Theme = {
  ...shared,
  typography: { ...shared.typography, code: CODE_TYPE },
};

export { pagesTheme };

// its type carries the code variant and the code inks
declare module '@mui/material/styles' {
  interface TypographyVariants {
    code: CSSProperties;
  }
  interface TypographyVariantsOptions {
    code?: CSSProperties;
  }
  interface CodeInks {
    keyword: string;
    type: string;
    string: string;
    number: string;
    comment: string;
  }
  interface Palette {
    code: CodeInks;
  }
  interface PaletteOptions {
    code?: CodeInks;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}
