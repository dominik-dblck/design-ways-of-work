/**
 * - `FeaturePageDecisionsSection` · the feature ticket's edges
 * - question, options, the pick
 */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { Section } from '../../../../workspace/boardView.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { TitledList } from '../../../molecules/TitledList/index.ts';

function FeaturePageDecisionsSection({
  sections,
}: {
  readonly sections: readonly Section[];
}): ReactElement {
  return (
    <FoldSection
      id="decisions"
      label={words.decisions.label}
      note={words.decisions.note}
      count={sections.length}
    >
      {sections.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          {words.nothing}
        </Typography>
      ) : (
        sections.map((section) => (
          <Paper key={section.label} variant="outlined" sx={{ p: 2 }}>
            <TitledList {...section} />
          </Paper>
        ))
      )}
    </FoldSection>
  );
}

export { FeaturePageDecisionsSection };
