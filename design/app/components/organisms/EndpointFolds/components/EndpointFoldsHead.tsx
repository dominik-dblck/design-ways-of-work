/**
 * - `EndpointFoldsHead` · one endpoint's head: ticket, name, kind and state
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { contractWords as words } from '../../../../workspace/contractView.ts';
import type { EndpointCode } from '../../../../workspace/contractView.ts';
import { Label } from '../../../atoms/Label/index.ts';
import { TONES } from '../constants/endpointFoldsHeadConstants.ts';

interface EndpointFoldsHeadProps {
  readonly endpoint: EndpointCode;
}

function EndpointFoldsHead({ endpoint }: EndpointFoldsHeadProps): ReactElement {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      useFlexGap
      sx={{ alignItems: 'baseline', flexWrap: 'wrap', width: '100%' }}
    >
      <Label tone="secondary">{endpoint.ticket}</Label>
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
  );
}

export { EndpointFoldsHead };
