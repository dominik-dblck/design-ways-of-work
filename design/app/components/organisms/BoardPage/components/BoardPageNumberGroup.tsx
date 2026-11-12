/**
 * - `BoardPageNumberGroup` · one card of the board's numbers: its head, its lines
 */
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import { radiusOf } from '../../../../theme/tokenReads.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
import { LINE } from '../constants/boardPageNumberGroupConstants.ts';
import { BoardPageStatTile } from './BoardPageStatTile.tsx';
import type { BoardPageStatTileProps } from './BoardPageStatTile.tsx';

interface BoardPageNumberGroupProps {
  readonly label: string;
  readonly note: string;
  readonly lines: readonly (readonly BoardPageStatTileProps[])[];
  // its share of the row's width
  readonly share: number;
}

function BoardPageNumberGroup({
  label,
  note,
  lines,
  share,
}: BoardPageNumberGroupProps): ReactElement {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, borderRadius: radiusOf('uiRContainer'), flex: share }}
    >
      <Stack spacing={1}>
        <SectionHead label={label} note={note} />
        {lines.map((line, at) => (
          <Stack key={at} direction="row" useFlexGap sx={LINE}>
            {line.map((one) => (
              <BoardPageStatTile key={one.label} {...one} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

export { BoardPageNumberGroup };
