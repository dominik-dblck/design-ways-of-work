/**
 * - `ApiSection` · the epic's endpoints, each as the types the build side writes
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/feature-view.ts';
import type { EndpointCode } from '../../../../workspace/contract-view.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
import { EndpointItem } from './EndpointItem.tsx';

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
