/**
 * - `glyphLedOf` · a segment's words with a glyph before them
 */
import { Glyph } from '../../../atoms/Glyph/index.ts';
import type { GlyphName } from '../../../atoms/Glyph/index.ts';

/** The glyph is the words' companion, never their name · the words stay what is read. */
export const glyphLedOf = (
  glyph: GlyphName,
  words: React.ReactNode,
): React.ReactNode => (
  <>
    <Glyph name={glyph} size="small" />
    {words}
  </>
);
