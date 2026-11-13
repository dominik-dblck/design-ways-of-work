/**
 * - `FilterMenuFacet` · one facet: its id, its words and glyph, whether it is on
 */
import type { GlyphName } from '../../../atoms/Glyph/index.ts';
/** A divided facet stands under a line, apart from the facets above it. */
export type FilterMenuFacet<Id extends string = string> = {
  readonly id: Id;
  readonly label: string;
  readonly on: boolean;
  readonly divided?: boolean;
  readonly glyph?: GlyphName;
};
