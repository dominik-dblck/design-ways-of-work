/**
 * - `SectionHead` · a section's label in capitals, and the line beside it
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';

interface SectionHeadProps {
  readonly label: string;
  readonly note: string;
}

function SectionHead({ label, note }: SectionHeadProps): ReactElement {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      useFlexGap
      sx={{ alignItems: 'baseline', flexWrap: 'wrap' }}
    >
      <Typography variant="overline" component="h2">
        {label}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {note}
      </Typography>
    </Stack>
  );
}

export { SectionHead };
