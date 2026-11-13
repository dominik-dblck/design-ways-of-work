/**
 * - `heldOf` · the button alone, or in a holder its hint's id names
 */
import Box from '@mui/material/Box';
import { HINT_HOLDER_SX } from '../../../../constants/hintHolderConstants.ts';

/** A named holder round the button · the element the hover's words sit on. */
export const heldOf = (
  shown: React.ReactElement,
  hintTestId: string | undefined,
): React.ReactElement =>
  hintTestId === undefined ? (
    shown
  ) : (
    <Box component="span" sx={HINT_HOLDER_SX}>
      {shown}
    </Box>
  );
