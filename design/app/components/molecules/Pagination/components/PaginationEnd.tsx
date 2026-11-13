/**
 * - `PaginationEnd` · the previous or next page, an icon button with its words
 */
import { HintIconButton } from '../../HintIconButton/index.ts';
import { Glyph } from '../../../atoms/Glyph/index.ts';
import { PAGE_END_GLYPHS } from '../constants/paginationConstants.ts';

type PaginationEndProps = {
  readonly end: 'previous' | 'next';
  readonly disabled: boolean;
  readonly onPress: () => void;
  readonly label: string;
};

/** At the first or the last page, its end is greyed. */
export function PaginationEnd({
  end,
  disabled,
  onPress,
  label,
}: PaginationEndProps): React.ReactElement {
  return (
    <HintIconButton
      label={label}
      variant="ghost"
      size="sm"
      disabled={disabled}
      onClick={onPress}
    >
      <Glyph name={PAGE_END_GLYPHS[end]} size="small" />
    </HintIconButton>
  );
}
