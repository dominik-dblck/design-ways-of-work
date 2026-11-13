/**
 * - `SearchBoxPending` · the spinner while an answer is out
 */
import CircularProgress from '@mui/material/CircularProgress';
import { controlGlyph } from '../../../../styles/scales.ts';
import { SEARCH_BOX_WORDS } from '../constants/searchBoxWords.ts';

export function SearchBoxPending({
  testId,
}: {
  readonly testId?: string | undefined;
}): React.ReactElement {
  return (
    <CircularProgress
      data-testid={testId}
      size={controlGlyph.small}
      color="inherit"
      aria-label={SEARCH_BOX_WORDS.pending}
      sx={{ color: 'text.secondary', flexShrink: 0 }}
    />
  );
}
