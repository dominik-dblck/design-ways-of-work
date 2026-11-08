/**
 * - `ApiSection` · the epic's endpoints, each as the types the build side writes
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/feature-view.ts';
import type { EndpointCode } from '../../../../workspace/contract-view.ts';
import { CodeBlock } from '../../../atoms/CodeBlock/index.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';

function EndpointItem({ endpoint }: { readonly endpoint: EndpointCode }): ReactElement {
  return (
    <Stack spacing={1} id={endpoint.anchor}>
      <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="subtitle1">{endpoint.title}</Typography>
        <Chip size="small" variant="outlined" label={`${endpoint.kind} · ${endpoint.ticket}`} />
        {endpoint.state === "typed" ? null : <Chip size="small" color="warning" label={words.api[endpoint.state]} />}
      </Stack>
      <CodeBlock lines={endpoint.lines} />
    </Stack>
  );
}

function ApiSection({ endpoints }: { readonly endpoints: readonly EndpointCode[] }): ReactElement {
  return (
    <Stack spacing={2} id="api">
      <SectionHead label={words.api.label} note={words.api.note} />
      {endpoints.length === 0 ? (
        <Typography variant="body2" color="textSecondary">{words.nothing}</Typography>
      ) : (
        endpoints.map((endpoint) => <EndpointItem key={endpoint.anchor} endpoint={endpoint} />)
      )}
    </Stack>
  );
}

export { ApiSection };
