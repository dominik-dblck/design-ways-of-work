/**
 * - `SearchBoxPending` · the spinner while an answer is out
 */
import CircularProgress from '@mui/material/CircularProgress';
import { controlGlyph } from '../../../../styles/scales.ts';

export function SearchBoxPending({
  testId,
  label,
}: {
  readonly testId?: string | undefined;
  readonly label: string;
}): React.ReactElement {
  return (
    <CircularProgress
      data-testid={testId}
      size={controlGlyph.small}
      color="inherit"
      aria-label={label}
      sx={{ color: 'text.secondary', flexShrink: 0 }}
    />
  );
}
