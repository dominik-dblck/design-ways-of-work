/**
 * - `CodeBlock` · lines of code, each piece coloured by what it is, in the theme's code face
 */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { CodeLine, TokenKind } from '../../workspace/contract-view.ts';

// a piece's colour, as a palette role
const INK: Readonly<Record<TokenKind, string>> = {
  com: 'text.secondary',
  kw: 'info.dark',
  type: 'text.primary',
  str: 'success.dark',
  num: 'warning.dark',
  txt: 'text.primary',
  warn: 'error.main',
};

// a route and a warning stand out most, a type a little
const weightOf = (piece: CodeLine[number]): number =>
  piece.strong ? 600 : piece.kind === 'type' ? 500 : 400;

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
                  sx={{ color: INK[piece.kind], fontWeight: weightOf(piece),
                    textDecoration: piece.draft ? "underline dotted" : "none" }}
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
