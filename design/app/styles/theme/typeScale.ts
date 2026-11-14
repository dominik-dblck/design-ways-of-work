/**
 * - `TYPOGRAPHY` · the type scale on the brand font
 */
import type { ThemeOptions } from '@mui/material/styles';
import type { LightToken } from '../tokens.ts';
import { length } from '../tokenReads.ts';

const SNUG = length('lhSnug');
const NORMAL = length('lhNormal');
const px = (key: LightToken): string => `${length(key)}px`;

/** The variants every `Text` reads · h1–h3 and subtitle1 take the DS ramp. */
export const TYPOGRAPHY: ThemeOptions['typography'] = {
  // next/font sets the basis face · a page with no loader falls back to the token stack, never the browser's serif
  fontFamily: 'var(--font-basis, var(--font-sans))',
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: { fontSize: px('tH1'), fontWeight: 500, lineHeight: SNUG },
  h2: { fontSize: px('tH2'), fontWeight: 500, lineHeight: SNUG },
  h3: { fontSize: px('tH3'), fontWeight: 500, lineHeight: SNUG },
  h4: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: SNUG,
    letterSpacing: '-0.02em',
  },
  h5: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: SNUG,
    letterSpacing: '-0.02em',
  },
  h6: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: NORMAL,
    letterSpacing: '-0.01em',
  },
  subtitle1: { fontSize: px('tH5'), fontWeight: 500, lineHeight: 1.2 },
  subtitle2: { fontSize: '12px', fontWeight: 500, lineHeight: 1.2 },
  body1: { fontSize: '14px', fontWeight: 400, lineHeight: NORMAL },
  body2: { fontSize: '12px', fontWeight: 400, lineHeight: NORMAL },
  caption: { fontSize: '10px', fontWeight: 400, lineHeight: 1.2 },
  // the small label over a thing: the body face, its words as written, never in capitals
  overline: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: 0,
    textTransform: 'none',
  },
};
