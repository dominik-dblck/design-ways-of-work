/**
 * - `PAGE_END_GLYPHS` · the two ends' glyphs, one per word
 * - `PAGINATION_SX`, `PAGE_CURRENT_SX` · the pager's row, the page it stands on
 * - `PAGINATION_INLINE_SX` · the pager inside another line's band
 */
import type { GlyphName } from '../../../atoms/Glyph/index.ts';
import type { PAGINATION_WORDS } from './paginationWords.ts';

export const PAGE_END_GLYPHS = {
  previous: 'chevronLeft',
  next: 'chevronRight',
} as const satisfies Record<keyof typeof PAGINATION_WORDS, GlyphName>;

export const PAGINATION_SX = {
  display: 'flex',
  justifyContent: 'flex-end',
  py: 1.5,
  px: 2.25,
} as const;

export const PAGINATION_INLINE_SX = {
  display: 'flex',
  justifyContent: 'flex-end',
} as const;

export const PAGE_CURRENT_SX = {
  bgcolor: 'background.subtle',
  color: 'text.primary',
} as const;
