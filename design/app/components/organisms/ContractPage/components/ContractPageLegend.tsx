/**
 * - `ContractPageLegend` · how a typed, a drafted, an untyped name look, and why
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { LegendItem } from '../../../../workspace/contractView.ts';
import { CodePieces } from '../../../atoms/CodePieces/index.ts';

interface ContractPageLegendProps {
  readonly legend: readonly LegendItem[];
}

function ContractPageLegend({ legend }: ContractPageLegendProps): ReactElement {
  return (
    <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {legend.map((entry) => (
        <Typography key={entry.state} variant="body2" color="textSecondary">
          <Typography component="span" variant="code">
            <CodePieces line={entry.sample} />
          </Typography>
          {` ${entry.note}`}
        </Typography>
      ))}
    </Stack>
  );
}

export { ContractPageLegend };
