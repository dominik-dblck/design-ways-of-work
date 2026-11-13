/**
 * - `ContractBodyStats` · the numbers: endpoints, typed, drafted, to type, no row
 */
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { ContractStat } from '../../../../workspace/contractView.ts';
import { TILES } from '../constants/contractBodyStatsConstants.ts';
import { radiusOf } from '../../../../styles/scales.ts';

interface ContractBodyStatsProps {
  readonly stats: readonly ContractStat[];
}

function ContractBodyStats({ stats }: ContractBodyStatsProps): ReactElement {
  return (
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
  );
}

export { ContractBodyStats };
