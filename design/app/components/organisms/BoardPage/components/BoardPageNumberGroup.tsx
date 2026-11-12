/**
 * - `BoardPageNumberGroup` · one fold of the board's numbers: its head, its lines
 */
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { BoardPageNumberLine } from './BoardPageNumberLine.tsx';
import type { BoardPageNumberLineProps } from './BoardPageNumberLine.tsx';

interface BoardPageNumberGroupProps {
  // the fold's anchor: a link to it opens it
  readonly id: string;
  readonly label: string;
  readonly note: string;
  readonly lines: readonly BoardPageNumberLineProps[];
  // its share of the row's width
  readonly share: number;
  // a line in place of numbers not yet reported
  readonly waiting?: string | null;
}

function BoardPageNumberGroup({
  id,
  label,
  note,
  lines,
  share,
  waiting = null,
}: BoardPageNumberGroupProps): ReactElement {
  return (
    <Box sx={{ flex: share, minWidth: 0 }}>
      <FoldSection id={id} label={label} note={note} spacing={2}>
        {waiting === null ? null : (
          <Typography variant="caption" color="textSecondary">
            {waiting}
          </Typography>
        )}
        <Stack spacing={2} divider={<Divider flexItem />}>
          {lines
            .filter((line) => line.numbers.length > 0)
            .map((line) => (
              <BoardPageNumberLine key={line.name} {...line} />
            ))}
        </Stack>
      </FoldSection>
    </Box>
  );
}

export { BoardPageNumberGroup };
