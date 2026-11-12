/**
 * - `ContractPageHead` · the eyebrow, the title, what the page reads
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { contractWords as words } from '../../../../workspace/contractView.ts';

function ContractPageHead(): ReactElement {
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

export { ContractPageHead };
