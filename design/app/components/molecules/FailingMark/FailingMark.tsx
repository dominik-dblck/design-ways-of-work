/**
 * - `FailingMark` · a mark with a red dot on its corner while a check fails
 */
import Box from '@mui/material/Box';
import { BadgeDot } from '../BadgeDot/index.ts';
import { FAILING_MARK_SX } from './constants/failingMarkConstants.ts';

export type FailingMarkProps = {
  // each line a check that fails · none, no dot
  readonly failing: readonly string[];
  readonly quiet?: boolean;
  readonly testId?: string;
  readonly children: React.ReactNode;
};

/** The dot names every failing line, and lists them on hover. */
export function FailingMark({
  failing,
  quiet = false,
  testId,
  children,
}: FailingMarkProps): React.ReactElement {
  return (
    <Box component="span" sx={FAILING_MARK_SX}>
      {children}
      {failing.length > 0 ? (
        <BadgeDot
          tone="error"
          at="corner"
          label={failing.join(' · ')}
          hint={{ lines: failing, tone: 'error' }}
          quiet={quiet}
          testId={testId}
        />
      ) : null}
    </Box>
  );
}
