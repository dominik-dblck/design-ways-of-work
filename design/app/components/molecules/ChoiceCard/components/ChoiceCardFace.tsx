/**
 * - `ChoiceCardFace` · a card's icon, its label, and the caption and note under it
 */
import Box from '@mui/material/Box';
import { Text } from '../../../atoms/Text/index.ts';
import {
  CHOICE_ICON_SX,
  CHOICE_TEXT_SX,
} from '../constants/choiceCardConstants.ts';

type ChoiceCardFaceProps = {
  readonly label: string;
  readonly caption?: string;
  readonly note?: string;
  readonly icon?: React.ReactNode;
  readonly selected: boolean;
};

/** The picked card's label is set heavier. */
export function ChoiceCardFace({
  label,
  caption,
  note,
  icon,
  selected,
}: ChoiceCardFaceProps): React.ReactElement {
  return (
    <>
      {icon === undefined ? null : (
        <Box component="span" sx={CHOICE_ICON_SX}>
          {icon}
        </Box>
      )}
      <Box sx={CHOICE_TEXT_SX}>
        <Text variant="body2" strong={selected}>
          {label}
        </Text>
        {caption === undefined ? null : <Text tone="micro">{caption}</Text>}
        {note === undefined ? null : (
          <Text variant="overline" tone="micro">
            {note}
          </Text>
        )}
      </Box>
    </>
  );
}
