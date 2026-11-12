/**
 * - `BoardPageHead` · the page's title
 */
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/boardView.ts';

function BoardPageHead(): ReactElement {
  return (
    <Typography variant="h3" component="h1">
      {words.title}
    </Typography>
  );
}

export { BoardPageHead };
