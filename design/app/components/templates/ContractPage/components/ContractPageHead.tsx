/**
 * - `ContractPageHead` · the label, the title, what the page reads
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { contractWords as words } from '../../../../workspace/contractView.ts';
import { Label } from '../../../atoms/Label/index.ts';

function ContractPageHead(): ReactElement {
  return (
    <Stack spacing={1} sx={{ maxWidth: 900 }}>
      <Label tone="secondary">{words.label}</Label>
      <Typography variant="h3" component="h1">
        {words.title}
      </Typography>
      <Typography color="textSecondary">{words.intro}</Typography>
    </Stack>
  );
}

export { ContractPageHead };
