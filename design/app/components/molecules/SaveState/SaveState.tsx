/**
 * - `SaveState` · the foot of a panel that autosaves, drawing what it is handed
 * - the screen owns the timer, the save and the retry; the text never leaves
 */
import Box from '@mui/material/Box';
import { Text } from '../../atoms/Text/index.ts';
import { Glyph } from '../../atoms/Glyph/index.ts';
import { SAVE_STATE_WORDS } from './constants/saveStateWords.ts';
import type { SaveStateShown, SaveStateWords } from './types/saveStateTypes.ts';
import { saveStateLineOf, saveLineSxOf } from './utils/saveStateLineUtils.ts';
import { SaveStateLost } from './components/SaveStateLost.tsx';

export type SaveStateProps = SaveStateShown & {
  readonly onRetry: () => void;
  readonly testId?: string;
  readonly retryTestId?: string;
  readonly words?: SaveStateWords | undefined;
};

/** A failed save is read out as it lands; the rest is a quiet status. */
export function SaveState(props: SaveStateProps): React.ReactElement {
  const { testId, words = SAVE_STATE_WORDS } = props;
  const hasFailed = props.state !== 'saved' && props.state !== 'saving';
  if (props.state === 'lost')
    return (
      <SaveStateLost
        line={saveStateLineOf(props, words)}
        retryLabel={words.retry}
        onRetry={props.onRetry}
        testId={testId}
        retryTestId={props.retryTestId}
      />
    );
  return (
    <Box
      data-testid={testId}
      data-state={props.state}
      role={hasFailed ? 'alert' : 'status'}
      sx={saveLineSxOf(hasFailed)}
    >
      {hasFailed ? <Glyph name="triangleAlert" size="inline" /> : null}
      <Text variant="caption" tone="inherit">
        {saveStateLineOf(props, words)}
      </Text>
    </Box>
  );
}
