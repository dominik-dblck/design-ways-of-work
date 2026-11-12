/**
 * - `ROUNDED` · each fold rounded on its own, with no rule drawn above it
 */
import { radiusOf } from '../../../../theme/tokenReads.ts';

const ROUNDED = {
  borderRadius: radiusOf('uiRContainer'),
  '&:first-of-type, &:last-of-type': { borderRadius: radiusOf('uiRContainer') },
  '&::before': { display: 'none' },
} as const;

export { ROUNDED };
