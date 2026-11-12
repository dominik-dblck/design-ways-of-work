/**
 * - `theme` · the workspace's one MUI theme, both modes, every value a token's (D22)
 * - no stylesheet and no raw colour: a component reads the theme, never a CSS file
 */
import { createTheme } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import { paletteFor } from './palette.ts';
import { lengthOf, tokenTextOf } from './tokenReads.ts';

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-theme' },
  colorSchemes: {
    light: { palette: paletteFor('light') },
    dark: { palette: paletteFor('dark') },
  },
  typography: {
    fontFamily: tokenTextOf('fontSans'),
    fontSize: lengthOf('uiBody'),
    overline: {
      fontFamily: tokenTextOf('uiEyebrowFont'),
      fontSize: lengthOf('uiEyebrow'),
      fontWeight: 500,
      letterSpacing: '0.1em',
      lineHeight: 1.4,
    },
    code: {
      fontFamily: tokenTextOf('fontMono'),
      fontSize: lengthOf('uiLabel'),
      lineHeight: 1.6,
      whiteSpace: 'pre',
    },
  },
  shape: { borderRadius: lengthOf('uiRControl') },
});

export { theme };

// built with CSS variables on, its type carries the colour schemes, the code variant and inks
declare module '@mui/material/styles' {
  interface CssThemeVariables {
    enabled: true;
  }
  interface TypographyVariants {
    code: CSSProperties;
  }
  interface TypographyVariantsOptions {
    code?: CSSProperties;
  }
  // the inks a line of code is drawn in, each a design system colour
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
