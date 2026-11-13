/**
 * - `SaveStateLost` · a save the connection lost: the line in danger, and Retry
 */
import Box from '@mui/material/Box';
import { RetryLine } from '../../RetryLine/index.ts';
import { Glyph } from '../../../atoms/Glyph/index.ts';
import { SAVE_LOST_SX } from '../constants/saveStateConstants.ts';
import { SAVE_STATE_WORDS } from '../constants/saveStateWords.ts';

type SaveStateLostProps = {
  readonly line: string;
  readonly onRetry: () => void;
  readonly testId?: string | undefined;
  readonly retryTestId?: string | undefined;
};

/** The text stays in the field · Retry sends it again. */
export function SaveStateLost({
  line,
  onRetry,
  testId,
  retryTestId,
}: SaveStateLostProps): React.ReactElement {
  return (
    <Box data-testid={testId} data-state="lost" sx={SAVE_LOST_SX}>
      <Glyph name="triangleAlert" size="inline" />
      <RetryLine
        line={line}
        retryLabel={SAVE_STATE_WORDS.retry}
        onRetry={onRetry}
        tone="danger"
        retryTestId={retryTestId}
      />
    </Box>
  );
}
