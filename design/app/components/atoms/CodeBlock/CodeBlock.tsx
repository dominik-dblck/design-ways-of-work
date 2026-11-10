/**
 * - `CodeBlock` · lines of code, each piece coloured by its kind, in the code face
 */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { CodeLine } from '../../../workspace/contractView.ts';
import { INK } from './constants/codeBlockInkConstants.ts';
import { weightOf } from './utils/codeBlockWeightUtils.ts';

interface CodeBlockProps {
  readonly lines: readonly CodeLine[];
}

function CodeBlock({ lines }: CodeBlockProps): ReactElement {
  return (
    <Paper variant="outlined" sx={{ p: 2, overflowX: 'auto' }}>
      {lines.map((line, at) => (
        <Typography key={at} variant="code" component="div">
          {line.length === 0
            ? ' '
            : line.map((piece, index) => (
                <Box
                  key={index}
                  component="span"
                  sx={{
                    color: INK[piece.kind],
                    fontWeight: weightOf(piece),
                    textDecoration: piece.draft ? 'underline dotted' : 'none',
                  }}
                >
                  {piece.text}
                </Box>
              ))}
        </Typography>
      ))}
    </Paper>
  );
}

export { CodeBlock };
