/**
 * - `BoardPageColumn` · one column
 * - its label, its count, its line, and the cards in it
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement, ReactNode } from 'react';
import { Heading } from '../../../atoms/Heading/index.ts';

interface BoardPageColumnProps {
  readonly label: string;
  readonly note: string;
  readonly count: number;
  readonly children: ReactNode;
}

function BoardPageColumn({
  label,
  note,
  count,
  children,
}: BoardPageColumnProps): ReactElement {
  return (
    <Stack spacing={1.5} sx={{ minWidth: 0 }}>
      <Stack spacing={0.25}>
        <Heading level={2} quiet>
          {`${label} · ${count}`}
        </Heading>
        <Typography variant="caption" color="textSecondary">
          {note}
        </Typography>
      </Stack>
      {children}
    </Stack>
  );
}

export { BoardPageColumn };
