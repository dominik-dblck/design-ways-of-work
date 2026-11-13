/**
 * - `INK` · a piece's colour by its kind, a palette role
 */
import type { TokenKind } from '../../../../workspace/contractView.ts';

// a piece's colour, as a palette role: the theme's code inks, as the original drew them
const INK: Readonly<Record<TokenKind, string>> = {
  com: 'code.comment',
  kw: 'code.keyword',
  type: 'code.type',
  str: 'code.string',
  num: 'code.number',
  txt: 'text.primary',
  warn: 'text.danger',
};

export { INK };
