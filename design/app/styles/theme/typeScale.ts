/**
 * - `TYPOGRAPHY` · the type scale on the brand font
 * - `MONO_FAMILY` · the code face, as its token's variable
 */
import type { ThemeOptions } from '@mui/material/styles';
import type { LightToken } from '../tokens.ts';
import { asVariable, length } from '../tokenReads.ts';

/** The code face · a mono eyebrow, a count, a code. */
export const MONO_FAMILY = `var(${asVariable('fontMono')})`;

const SNUG = length('lhSnug');
const NORMAL = length('lhNormal');
const px = (key: LightToken): string => `${length(key)}px`;

/** The variants every `Text` reads · h1–h3 and subtitle1 take the DS ramp. */
export const TYPOGRAPHY: ThemeOptions['typography'] = {
  fontFamily: 'var(--font-basis)',
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
  overline: {
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontFamily: MONO_FAMILY,
  },
};
