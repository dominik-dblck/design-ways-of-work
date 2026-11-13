/**
 * - `FieldLabel` · a field's label row: its name, a note, a tag, a switch
 */
import Box from '@mui/material/Box';
import { Label } from '../../atoms/Label/index.ts';
import { StateChip } from '../../atoms/StateChip/index.ts';
import { Text } from '../../atoms/Text/index.ts';
import { chipFaceOf } from '../../../utils/chipFaceUtils.ts';
import {
  LABEL_ROW_SX,
  LABEL_WORDS_SX,
} from './constants/fieldLabelConstants.ts';
import type { FieldLabelProps } from './types/fieldLabelTypes.ts';
import { FieldLabelSwitch } from './components/FieldLabelSwitch.tsx';

/** The name, a note beside it, a tag at its end. */
export function FieldLabel({
  label,
  id,
  required = false,
  note,
  tag,
  toggle,
  noteTestId,
  tagTestId,
}: FieldLabelProps): React.ReactElement {
  return (
    <Box sx={LABEL_ROW_SX}>
      <Box sx={LABEL_WORDS_SX}>
        <Label id={id} required={required}>
          {label}
        </Label>
        {note === undefined ? null : (
          <Text testId={noteTestId} tone="micro">
            {note}
          </Text>
        )}
      </Box>
      {tag === undefined ? null : (
        <StateChip {...chipFaceOf(tag)} testId={tagTestId} />
      )}
      {toggle === undefined ? null : <FieldLabelSwitch toggle={toggle} />}
    </Box>
  );
}
