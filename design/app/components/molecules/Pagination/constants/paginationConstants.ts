/**
 * - `PAGE_END_GLYPHS` · the two ends' glyphs, one per word
 * - `PAGINATION_SX`, `PAGE_SX`, `PAGE_CURRENT_SX` · the row, a page, the current one
 * - `PAGINATION_INLINE_SX` · the pager inside another line's band
 */
import type { GlyphName } from '../../../atoms/Glyph/index.ts';
import type { PAGINATION_WORDS } from './paginationWords.ts';
import { controlHeight } from '../../../../styles/scales.ts';

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

// a page number is at least as wide as it is tall · a lone digit is 15 px, under WCAG's 24 (2.5.8)
export const PAGE_SX = {
  minWidth: controlHeight.small,
} as const;

export const PAGE_CURRENT_SX = {
  ...PAGE_SX,
  bgcolor: 'background.subtle',
  color: 'text.primary',
} as const;
