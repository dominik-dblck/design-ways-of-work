/**
 * - `ChipMark` · a chip's pair, word and glyph, named as a constant holds them
 * - `chipFaceOf` · its face, the one place a chip's glyph is drawn
 */
import { createElement } from 'react';
import { Glyph } from '../components/atoms/Glyph/index.ts';
import type { GlyphName } from '../components/atoms/Glyph/index.ts';
import type {
  StateChipFace,
  StateChipProps,
} from '../components/atoms/StateChip/index.ts';

export type ChipMark = Pick<StateChipProps, 'state' | 'label'> & {
  readonly glyph: GlyphName;
};

/** The glyph at the chip's inline size, drawn before its word. */
export const chipFaceOf = ({
  state,
  label,
  glyph,
}: ChipMark): StateChipFace => ({
  state,
  label,
  icon: createElement(Glyph, { name: glyph, size: 'inline' }),
});
