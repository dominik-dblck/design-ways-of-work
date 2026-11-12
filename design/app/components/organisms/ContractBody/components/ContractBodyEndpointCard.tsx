/**
 * - `ContractBodyEndpointCard` · one endpoint: ticket, name, kind and state, code
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { contractWords as words } from '../../../../workspace/contractView.ts';
import type { EndpointCode } from '../../../../workspace/contractView.ts';
import { CodeBlock } from '../../../molecules/CodeBlock/index.ts';
import { TONES } from '../constants/contractBodyEndpointCardConstants.ts';

interface ContractBodyEndpointCardProps {
  readonly endpoint: EndpointCode;
}

function ContractBodyEndpointCard({
  endpoint,
}: ContractBodyEndpointCardProps): ReactElement {
  return (
    <Stack spacing={1} id={endpoint.anchor}>
      <Stack
        direction="row"
        spacing={1.25}
        useFlexGap
        sx={{ alignItems: 'baseline', flexWrap: 'wrap' }}
      >
        <Typography variant="overline" color="textSecondary">
          {endpoint.ticket}
        </Typography>
        <Typography variant="subtitle1" sx={{ flex: 1, minWidth: 200 }}>
          {endpoint.title}
        </Typography>
        <Chip
          size="small"
          variant="outlined"
          color={TONES[endpoint.state]}
          label={`${words.kinds[endpoint.kind]} · ${words.states[endpoint.state]}`}
        />
      </Stack>
      <CodeBlock lines={endpoint.lines} />
    </Stack>
  );
}

export { ContractBodyEndpointCard };
