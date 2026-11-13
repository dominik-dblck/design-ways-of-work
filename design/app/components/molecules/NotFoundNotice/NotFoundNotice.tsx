/**
 * - `NotFoundNotice` · what is missing, why it may be, and the way back
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '../../atoms/Button/index.ts';
import { Text } from '../../atoms/Text/index.ts';

export type NotFoundNoticeProps = {
  readonly title: string;
  readonly line: string;
  readonly backLabel: string;
  readonly onBack: () => void;
  readonly testId?: string;
  readonly backTestId?: string;
};

export function NotFoundNotice({
  title,
  line,
  backLabel,
  onBack,
  testId,
  backTestId,
}: NotFoundNoticeProps): React.ReactElement {
  return (
    <Box
      data-testid={testId}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1,
        py: 4,
        px: 3,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Text variant="body2" tone="secondary">
        {line}
      </Text>
      <Button
        variant="outlined"
        onClick={onBack}
        testId={backTestId}
        sx={{ mt: 0.75 }}
      >
        {backLabel}
      </Button>
    </Box>
  );
}
