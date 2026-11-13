/**
 * - `HintCardLine` · one row: what leads it, its title, the note, the faces it names
 */
import Box from '@mui/material/Box';
import { Text } from '../../../atoms/Text/index.ts';
import { FaceStack } from '../../FaceStack/index.ts';
import {
  HINT_LEAD_SX,
  HINT_LINE_SX,
  HINT_LINE_TEXT_SX,
} from '../constants/hintCardConstants.ts';
import type { HintCardRow } from '../types/hintCardTypes.ts';

export type HintCardLineProps = HintCardRow;

/** An empty note draws nothing under the title. */
export function HintCardLine({
  lead,
  title,
  note,
  faces = [],
  faded = false,
  refused = false,
  testId,
  facesTestId,
}: HintCardLineProps): React.ReactElement {
  return (
    <Box data-testid={testId} sx={HINT_LINE_SX}>
      {lead === undefined ? null : (
        <Box component="span" sx={HINT_LEAD_SX}>
          {lead}
        </Box>
      )}
      <Box sx={HINT_LINE_TEXT_SX}>
        <Text variant="body1" tone="primary" strong>
          {title}
        </Text>
        {note === '' ? null : (
          <Text variant="body2" tone={refused ? 'danger' : 'secondary'}>
            {note}
          </Text>
        )}
      </Box>
      {faces.length === 0 ? null : (
        <FaceStack people={faces} faded={faded} faceTestId={facesTestId} />
      )}
    </Box>
  );
}
