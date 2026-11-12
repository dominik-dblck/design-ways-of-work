/**
 * - `FeaturePageApiSection` · the epic's endpoints
 * - each as the types the build side writes
 */
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { EndpointCode } from '../../../../workspace/contractView.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { FeaturePageEndpointItem } from './FeaturePageEndpointItem.tsx';

function FeaturePageApiSection({
  endpoints,
}: {
  readonly endpoints: readonly EndpointCode[];
}): ReactElement {
  return (
    <FoldSection
      id="api"
      label={words.api.label}
      note={words.api.note}
      count={endpoints.length}
      spacing={2}
    >
      {endpoints.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          {words.nothing}
        </Typography>
      ) : (
        endpoints.map((endpoint) => (
          <FeaturePageEndpointItem key={endpoint.anchor} endpoint={endpoint} />
        ))
      )}
    </FoldSection>
  );
}

export { FeaturePageApiSection };
