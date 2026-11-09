/**
 * - `BoardPageHead` · the page's eyebrow
 * - its title and the line that says what it shows
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/board-view.ts';

function BoardPageHead(): ReactElement {
  return (
    <Stack spacing={1} sx={{ maxWidth: 900 }}>
      <Typography variant="overline" color="textSecondary">
        {words.eyebrow}
      </Typography>
      <Typography variant="h3" component="h1">
        {words.title}
      </Typography>
      <Typography color="textSecondary">{words.intro}</Typography>
    </Stack>
  );
}

export { BoardPageHead };
