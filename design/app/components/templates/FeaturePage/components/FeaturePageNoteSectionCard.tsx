/**
 * - `FeaturePageNoteSectionCard` · one section of the notebook, its lines as bullets
 */
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { NotesView } from '../../../../workspace/featureView.ts';
import { FeaturePageNoteItem } from './FeaturePageNoteItem.tsx';

interface FeaturePageNoteSectionCardProps {
  readonly section: NotesView['sections'][number];
}

function FeaturePageNoteSectionCard({
  section,
}: FeaturePageNoteSectionCardProps): ReactElement {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.5} divider={<Divider flexItem />}>
        <Typography variant="overline" color="textSecondary" component="h3">
          {section.title}
        </Typography>
        {section.lines.map((line, at) => (
          <FeaturePageNoteItem key={at} line={line} />
        ))}
      </Stack>
    </Paper>
  );
}

export { FeaturePageNoteSectionCard };
