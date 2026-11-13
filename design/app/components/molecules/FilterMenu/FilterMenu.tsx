/**
 * - `FilterMenu` · a button naming what is picked, and the facets in its menu
 * - what is picked shown as words, or as the facets' glyphs
 */
import { useState } from 'react';
import { Button } from '../../atoms/Button/index.ts';
import { Glyph } from '../../atoms/Glyph/index.ts';
import type { GlyphName } from '../../atoms/Glyph/index.ts';
import { Menu } from '../Menu/index.ts';
import { focusedElement } from '../../../utils/focusedElementUtils.ts';
import type { FilterMenuFacet } from './types/filterMenuTypes.ts';
import {
  facetItemsOf,
  filterGlyphFaceOf,
  filterLabelOf,
} from './utils/filterMenuItemsUtils.tsx';

export type FilterMenuProps<Id extends string = string> = {
  readonly placeholder: string;
  // drawn before the button's words
  readonly glyph?: GlyphName;
  readonly facets: readonly FilterMenuFacet<Id>[];
  readonly onToggle: (id: Id) => void;
  readonly disabled?: boolean;
  readonly testId?: string;
  readonly optionTestId?: string;
  readonly picked?: 'words' | 'glyphs';
};

/** A facet pressed flips and the menu stays open, so several are picked in one go. */
export function FilterMenu<Id extends string>({
  placeholder,
  glyph,
  facets,
  onToggle,
  disabled = false,
  testId,
  optionTestId,
  picked = 'words',
}: FilterMenuProps<Id>): React.ReactElement {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button
        variant="outlined"
        startIcon={
          glyph === undefined ? undefined : <Glyph name={glyph} size="small" />
        }
        disabled={disabled}
        testId={testId}
        onClick={() => setAnchor(focusedElement())}
      >
        {picked === 'glyphs'
          ? filterGlyphFaceOf({ placeholder, facets })
          : filterLabelOf({ placeholder, facets })}
      </Button>
      <Menu anchorEl={anchor} width="medium" onClose={() => setAnchor(null)}>
        {facetItemsOf({ facets, pick: onToggle, testId: optionTestId })}
      </Menu>
    </>
  );
}
