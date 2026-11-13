/**
 * - `FeaturePageNotesSection` · the epic's notebook, folded
 * - its lede, then each section, its lines as bullets
 */
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { FeatureView } from '../../../../workspace/featureView.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { FeaturePageNoteSectionCard } from './FeaturePageNoteSectionCard.tsx';

function FeaturePageNotesSection({
  notes,
}: {
  readonly notes: FeatureView['notes'];
}): ReactElement {
  return (
    <FoldSection
      id="notes"
      label={words.notes.label}
      note={words.notes.note}
      count={notes?.sections.length ?? 0}
    >
      {notes === null ? (
        <Typography variant="body2" color="textSecondary">
          {words.notes.none}
        </Typography>
      ) : (
        <>
          {notes.lede.map((line) => (
            <Typography key={line} variant="body2" color="textSecondary">
              {line}
            </Typography>
          ))}
          {notes.sections.map((section) => (
            <FeaturePageNoteSectionCard key={section.title} section={section} />
          ))}
        </>
      )}
    </FoldSection>
  );
}

export { FeaturePageNotesSection };
