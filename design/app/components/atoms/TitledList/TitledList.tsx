/**
 * - `TitledList` · a label and its lines, one under another; nothing when none
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';

interface TitledListProps {
  readonly label: string;
  readonly lines: readonly (string | null)[];
}

function TitledList({ label, lines }: TitledListProps): ReactElement | null {
  const shown = lines.filter((line) => line !== null);
  if (shown.length === 0) return null;
  return (
    <Stack spacing={0.75}>
      <Typography variant="overline" color="textSecondary" component="h3">
        {label}
      </Typography>
      {shown.map((line, at) => (
        <Typography key={at} variant="body2">
          {line}
        </Typography>
      ))}
    </Stack>
  );
}

export { TitledList };
