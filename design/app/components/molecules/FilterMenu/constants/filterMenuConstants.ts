/**
 * - `FACET_WORDS_SX` · a facet's glyph and its word, a step apart, 10 off the box
 * - `PICKED_GLYPHS_SX` · the picked facets' glyphs after the button's word
 */

// the box sits 10 from its words, as a selection row's does · the box itself keeps 5
export const FACET_WORDS_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  ml: 0.625,
} as const;

export const PICKED_GLYPHS_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  ml: 1,
} as const;
