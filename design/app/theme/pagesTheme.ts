/**
 * - `pagesTheme` · the pages' theme: the shared one, with code's type
 */
import type { Theme } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import { themeWith } from '../styles/theme.ts';
import { lengthOf, tokenTextOf } from './tokenReads.ts';

const CODE_TYPE: CSSProperties = {
  fontFamily: tokenTextOf('fontMono'),
  fontSize: lengthOf('uiLabel'),
  lineHeight: 1.6,
  whiteSpace: 'pre',
};

// the pages draw no state of their own: the shared states, chips and code inks alone
const shared = themeWith({
  statePairs: {},
  chips: {},
  chipVariants: [],
  palette: {},
});

// the code variant joins the shared type; the theme is otherwise as built
const pagesTheme: Theme = {
  ...shared,
  typography: { ...shared.typography, code: CODE_TYPE },
};

export { pagesTheme };

// its type carries the code variant
declare module '@mui/material/styles' {
  interface TypographyVariants {
    code: CSSProperties;
  }
  interface TypographyVariantsOptions {
    code?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}
