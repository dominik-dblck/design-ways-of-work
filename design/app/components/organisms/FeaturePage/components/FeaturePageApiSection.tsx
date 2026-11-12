/**
 * - `FeaturePageApiSection` · the epic's endpoints
 * - folded as the contract page folds them
 */
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { EndpointCode } from '../../../../workspace/contractView.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { EndpointFolds } from '../../EndpointFolds/index.ts';

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
    >
      {endpoints.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          {words.nothing}
        </Typography>
      ) : (
        <EndpointFolds endpoints={endpoints} />
      )}
    </FoldSection>
  );
}

export { FeaturePageApiSection };
