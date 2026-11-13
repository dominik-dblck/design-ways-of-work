/**
 * - `HINT_LINES_MARKS` · each kind's glyph and its ink
 */
import type { GlyphName } from '../../../atoms/Glyph/index.ts';

/** Each kind's mark · the glyph that leads a line, and its ink. */
export const HINT_LINES_MARKS = {
  error: { glyph: 'triangleAlert', color: 'error.main' },
} as const satisfies Record<
  string,
  { readonly glyph: GlyphName; readonly color: string }
>;
