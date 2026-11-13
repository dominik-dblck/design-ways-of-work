/**
 * - `FeaturePageCombinationsSection` · each fact combinations file
 * - its rows counted when asked
 */
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { FeatureView } from '../../../../workspace/featureView.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { FeaturePageCombinationFileItem } from './FeaturePageCombinationFileItem.tsx';

function FeaturePageCombinationsSection({
  view,
}: {
  readonly view: FeatureView;
}): ReactElement | null {
  const isMissing = !view.combinations.length && view.statesNamed > 0;
  if (!view.combinations.length && !isMissing) return null;
  return (
    <FoldSection
      id="combinations"
      label={words.combinations.label}
      note={words.combinations.note}
      count={view.combinations.length}
    >
      {isMissing ? (
        <Typography variant="body2" color="error">
          {words.combinations.missing(view.statesNamed, view.epic)}
        </Typography>
      ) : null}
      {view.combinations.map((one) => (
        <FeaturePageCombinationFileItem
          key={one.file}
          one={one}
          countOf={view.countOf}
        />
      ))}
    </FoldSection>
  );
}

export { FeaturePageCombinationsSection };
