/**
 * - `CodePieces` · one line of code, each piece coloured by its kind
 */
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import type { CodeLine } from '../../../workspace/contractView.ts';
import { INK } from './constants/codePiecesInkConstants.ts';
import { weightOf } from './utils/codePiecesWeightUtils.ts';

interface CodePiecesProps {
  readonly line: CodeLine;
}

function CodePieces({ line }: CodePiecesProps): ReactElement {
  return (
    <>
      {line.map((piece, index) => (
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
    </>
  );
}

export { CodePieces };
