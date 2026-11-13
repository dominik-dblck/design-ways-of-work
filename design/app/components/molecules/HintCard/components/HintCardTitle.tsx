/**
 * - `HintCardTitle` · the list's eyebrow, and how far it has come in plain case
 */
import Box from '@mui/material/Box';
import { Eyebrow } from '../../../atoms/Eyebrow/index.ts';
import { Text } from '../../../atoms/Text/index.ts';
import { HINT_CARD_TITLE_SX } from '../constants/hintCardConstants.ts';

type HintCardTitleProps = {
  readonly eyebrow: string;
  readonly count?: string | undefined;
};

/** No count, the eyebrow stands alone. */
export function HintCardTitle({
  eyebrow,
  count,
}: HintCardTitleProps): React.ReactElement {
  return (
    <Box sx={HINT_CARD_TITLE_SX}>
      <Eyebrow>{eyebrow}</Eyebrow>
      {count === undefined ? null : <Text tone="secondary">· {count}</Text>}
    </Box>
  );
}
