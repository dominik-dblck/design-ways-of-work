/**
 * - `INK` · a piece's colour by its kind, a palette role
 */
import type { TokenKind } from '../../../../workspace/contract-view.ts';

// a piece's colour, as a palette role
const INK: Readonly<Record<TokenKind, string>> = {
  com: 'text.secondary',
  kw: 'info.dark',
  type: 'text.primary',
  str: 'success.dark',
  num: 'warning.dark',
  txt: 'text.primary',
  warn: 'error.main',
};

export { INK };
