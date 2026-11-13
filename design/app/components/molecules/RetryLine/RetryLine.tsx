/**
 * - `RetryLine` · a read that failed, where its rows would stand, and Retry
 */
import Box from '@mui/material/Box';
import { Button } from '../../atoms/Button/index.ts';
import { Text } from '../../atoms/Text/index.ts';

export type RetryLineProps = {
  readonly line: string;
  readonly retryLabel: string;
  readonly onRetry: () => void;
  readonly tone?: 'neutral' | 'danger';
  readonly testId?: string;
  readonly retryTestId?: string | undefined;
};

export function RetryLine({
  line,
  retryLabel,
  onRetry,
  tone = 'neutral',
  testId,
  retryTestId,
}: RetryLineProps): React.ReactElement {
  return (
    <Box
      role="alert"
      data-testid={testId}
      sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
    >
      <Text variant="body2" tone={tone === 'danger' ? 'danger' : 'secondary'}>
        {line}
      </Text>
      <Button
        variant="outlined"
        size="sm"
        onClick={onRetry}
        testId={retryTestId}
      >
        {retryLabel}
      </Button>
    </Box>
  );
}
