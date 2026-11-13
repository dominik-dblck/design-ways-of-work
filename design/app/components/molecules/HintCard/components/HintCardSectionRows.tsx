/**
 * - `HintCardSectionRows` · a section under the list: a line, its label, its rows
 */
import Box from '@mui/material/Box';
import { Label } from '../../../atoms/Label/index.ts';
import {
  HINT_CARD_RULE_SX,
  HINT_CARD_SX,
} from '../constants/hintCardConstants.ts';
import type { HintCardSection } from '../types/hintCardTypes.ts';
import { HintCardLine } from './HintCardLine.tsx';

type HintCardSectionRowsProps = {
  readonly section: HintCardSection;
};

/** Each section stands over a line of its own. */
export function HintCardSectionRows({
  section,
}: HintCardSectionRowsProps): React.ReactElement {
  return (
    <Box sx={HINT_CARD_SX}>
      <Box sx={HINT_CARD_RULE_SX} />
      <Label>{section.label}</Label>
      {section.rows.map((row) => (
        <HintCardLine key={row.title} {...row} />
      ))}
    </Box>
  );
}
