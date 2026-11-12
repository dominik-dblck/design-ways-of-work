/**
 * - `CodeBlock` · lines of code, each piece coloured by its kind, in the code face
 */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { CodeLine } from '../../../workspace/contractView.ts';
import { CodePieces } from '../../atoms/CodePieces/index.ts';

interface CodeBlockProps {
  readonly lines: readonly CodeLine[];
}

function CodeBlock({ lines }: CodeBlockProps): ReactElement {
  return (
    <Paper variant="outlined" sx={{ p: 2, overflowX: 'auto' }}>
      {lines.map((line, at) => (
        <Typography key={at} variant="code" component="div">
          {line.length === 0 ? ' ' : <CodePieces line={line} />}
        </Typography>
      ))}
    </Paper>
  );
}

export { CodeBlock };
