/**
 * - `crumbLabelOf` · a crumb's words, its glyph before them where it carries one
 * - `crumbInkOf` · the trail's own ink, or the secondary where a crumb is muted
 */
import { Glyph } from '../../../atoms/Glyph/index.ts';
import type { Crumb } from '../types/breadcrumbsTypes.ts';

/** Laid out by the crumb that holds them · its text then carries the link's own underline. */
export const crumbLabelOf = (crumb: Crumb): React.ReactNode =>
  crumb.glyph === undefined ? (
    crumb.label
  ) : (
    <>
      <Glyph name={crumb.glyph} size="small" />
      {crumb.label}
    </>
  );

// set on every crumb · inherited, a switcher took MUI's secondary
export const crumbInkOf = (
  muted: boolean | undefined,
): 'text.secondary' | 'text.primary' =>
  muted === true ? 'text.secondary' : 'text.primary';
