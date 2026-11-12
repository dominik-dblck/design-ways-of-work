/**
 * - `ContractPageHead` · the eyebrow, the title, what the page reads, its numbers
 */
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { contractWords as words } from '../../../../workspace/contractView.ts';
import type { ContractStat } from '../../../../workspace/contractView.ts';
import { TILES } from '../constants/contractPageHeadConstants.ts';
import { radiusOf } from '../../../../theme/tokenReads.ts';

interface ContractPageHeadProps {
  readonly stats: readonly ContractStat[];
}

function ContractPageHead({ stats }: ContractPageHeadProps): ReactElement {
  return (
    <Stack spacing={3}>
      <Stack spacing={1} sx={{ maxWidth: 900 }}>
        <Typography variant="overline" color="textSecondary">
          {words.eyebrow}
        </Typography>
        <Typography variant="h3" component="h1">
          {words.title}
        </Typography>
        <Typography color="textSecondary">{words.intro}</Typography>
      </Stack>
      <Stack sx={TILES}>
        {stats.map((stat) => (
          <Paper
            key={stat.id}
            variant="outlined"
            sx={{ p: 2.5, borderRadius: radiusOf('uiRContainer') }}
          >
            <Typography variant="h4" component="div">
              {stat.value}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {stat.note}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}

export { ContractPageHead };
