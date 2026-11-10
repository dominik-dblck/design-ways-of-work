/**
 * - `FeaturePageCombinationsSection` · each fact combinations file
 * - its rows counted when asked
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { FeatureView } from '../../../../workspace/featureView.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
import { FeaturePageCombinationFileItem } from './FeaturePageCombinationFileItem.tsx';

function FeaturePageCombinationsSection({
  view,
}: {
  readonly view: FeatureView;
}): ReactElement | null {
  const isMissing = !view.combinations.length && view.statesNamed > 0;
  if (!view.combinations.length && !isMissing) return null;
  return (
    <Stack spacing={1.5} id="combinations">
      <SectionHead
        label={words.combinations.label}
        note={words.combinations.note}
      />
      {isMissing ? (
        <Typography variant="body2" color="error">
          {words.combinations.missing(view.statesNamed, view.epic)}
        </Typography>
      ) : null}
      {view.combinations.map((one) => (
        <FeaturePageCombinationFileItem key={one.file} one={one} />
      ))}
    </Stack>
  );
}

export { FeaturePageCombinationsSection };
