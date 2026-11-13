/**
 * - `SearchBoxGlyph` · the magnifier at the field's start, hidden from a reader
 */
import Box from '@mui/material/Box';
import { Glyph } from '../../../atoms/Glyph/index.ts';

export function SearchBoxGlyph(): React.ReactElement {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{ display: 'inline-flex', color: 'text.secondary', mr: 1 }}
    >
      <Glyph name="search" size="medium" />
    </Box>
  );
}
