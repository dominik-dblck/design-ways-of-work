/**
 * - `FeaturePageEndpointItem` · one endpoint: its title, kind, state and code
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/feature-view.ts';
import type { EndpointCode } from '../../../../workspace/contract-view.ts';
import { CodeBlock } from '../../../atoms/CodeBlock/index.ts';

function FeaturePageEndpointItem({
  endpoint,
}: {
  readonly endpoint: EndpointCode;
}): ReactElement {
  return (
    <Stack spacing={1} id={endpoint.anchor}>
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ alignItems: 'center', flexWrap: 'wrap' }}
      >
        <Typography variant="subtitle1">{endpoint.title}</Typography>
        <Chip
          size="small"
          variant="outlined"
          label={`${endpoint.kind} · ${endpoint.ticket}`}
        />
        {endpoint.state === 'typed' ? null : (
          <Chip
            size="small"
            color="warning"
            label={words.api[endpoint.state]}
          />
        )}
      </Stack>
      <CodeBlock lines={endpoint.lines} />
    </Stack>
  );
}

export { FeaturePageEndpointItem };
