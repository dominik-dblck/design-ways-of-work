/**
 * - `HintCardHead` · the section over the list: its label, one row, a line under
 */
import Box from '@mui/material/Box';
import { Label } from '../../../atoms/Label/index.ts';
import { HINT_CARD_RULE_SX } from '../constants/hintCardConstants.ts';
import type { HintCardProps } from '../types/hintCardTypes.ts';
import { HintCardLine } from './HintCardLine.tsx';

type HintCardHeadProps = {
  readonly head: NonNullable<HintCardProps['head']>;
};

/** It stands in the card's own column, ruled off the list. */
export function HintCardHead({ head }: HintCardHeadProps): React.ReactElement {
  return (
    <>
      <Label>{head.label}</Label>
      <HintCardLine {...head.row} />
      <Box sx={HINT_CARD_RULE_SX} />
    </>
  );
}
