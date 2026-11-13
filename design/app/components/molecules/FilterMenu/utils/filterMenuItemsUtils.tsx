/**
 * - `facetItemsOf` · the menu's rows, each the target, a line before one apart
 * - `filterLabelOf` · the button's words: the placeholder and what is picked
 * - `filterGlyphFaceOf` · the placeholder, the picks' glyphs, their words read
 */
import Box from '@mui/material/Box';
import { Checkbox } from '../../../atoms/Checkbox/index.ts';
import { Divider } from '../../../atoms/Divider/index.ts';
import { Glyph } from '../../../atoms/Glyph/index.ts';
import { ListItem } from '../../../atoms/ListItem/index.ts';
import { VISUALLY_HIDDEN } from '../../../../constants/visuallyHiddenConstants.ts';
import { sentenceCaseOf } from '../../../../utils/sentenceCaseUtils.ts';
import {
  FACET_WORDS_SX,
  PICKED_GLYPHS_SX,
} from '../constants/filterMenuConstants.ts';
import type { FilterMenuFacet } from '../types/filterMenuTypes.ts';

/** Built as elements, so the menu's list sees each row as its own item. */
export const facetItemsOf = <Id extends string>(at: {
  readonly facets: readonly FilterMenuFacet<Id>[];
  readonly pick: (id: Id) => void;
  readonly testId: string | undefined;
}): readonly React.ReactElement[] =>
  at.facets.flatMap((facet) => [
    ...(facet.divided === true
      ? [<Divider key={`${facet.id}-line`} inset />]
      : []),
    <ListItem
      key={facet.id}
      dense
      testId={at.testId}
      onClick={() => at.pick(facet.id)}
    >
      <Checkbox checked={facet.on} inRow />
      <Box component="span" sx={FACET_WORDS_SX}>
        {facet.glyph === undefined ? null : (
          <Glyph name={facet.glyph} size="small" />
        )}
        {sentenceCaseOf(facet.label)}
      </Box>
    </ListItem>,
  ]);

export const filterLabelOf = (at: {
  readonly placeholder: string;
  readonly facets: readonly FilterMenuFacet[];
}): string => {
  const { placeholder, facets } = at;
  const picked = facets
    .filter((facet) => facet.on)
    .map((facet) => sentenceCaseOf(facet.label));
  if (picked.length === 0) return placeholder;
  return `${placeholder} · ${picked.join(', ')}`;
};

export const filterGlyphFaceOf = (at: {
  readonly placeholder: string;
  readonly facets: readonly FilterMenuFacet[];
}): React.ReactNode => {
  const picked = at.facets.filter((facet) => facet.on);
  if (picked.length === 0) return at.placeholder;
  return (
    <>
      {at.placeholder}
      <Box component="span" aria-hidden sx={PICKED_GLYPHS_SX}>
        {picked.map((facet) =>
          facet.glyph === undefined ? null : (
            <Glyph key={facet.id} name={facet.glyph} size="small" />
          ),
        )}
      </Box>
      <Box component="span" sx={VISUALLY_HIDDEN}>
        {filterLabelOf(at).slice(at.placeholder.length)}
      </Box>
    </>
  );
};
