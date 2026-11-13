/**
 * - `HintCardTitle` · the list's label, and how far it has come
 */
import Box from '@mui/material/Box';
import { Label } from '../../../atoms/Label/index.ts';
import { Text } from '../../../atoms/Text/index.ts';
import { HINT_CARD_TITLE_SX } from '../constants/hintCardConstants.ts';

type HintCardTitleProps = {
  readonly label: string;
  readonly count?: string | undefined;
};

/** No count, the label stands alone. */
export function HintCardTitle({
  label,
  count,
}: HintCardTitleProps): React.ReactElement {
  return (
    <Box sx={HINT_CARD_TITLE_SX}>
      <Label>{label}</Label>
      {count === undefined ? null : <Text tone="secondary">· {count}</Text>}
    </Box>
  );
}
