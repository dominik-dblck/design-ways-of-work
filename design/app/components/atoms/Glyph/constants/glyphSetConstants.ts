/**
 * - `GLYPHS`, `GlyphName` · every glyph the app draws, by name, from three sets
 */
import { EDITOR_GLYPHS } from './glyphSetEditorConstants.ts';
import { INTERFACE_GLYPHS } from './glyphSetInterfaceConstants.ts';
import { PREVIEW_GLYPHS } from './glyphSetPreviewConstants.ts';

/** Every glyph the app draws, by the name a call site gives · the Glyph folder alone reads lucide-react. */
export const GLYPHS = {
  ...INTERFACE_GLYPHS,
  ...EDITOR_GLYPHS,
  ...PREVIEW_GLYPHS,
} as const;

export type GlyphName = keyof typeof GLYPHS;
