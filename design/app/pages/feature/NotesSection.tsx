/**
 * - `NotesSection` · the epic's notebook: its lede, then each section with its lines
 */
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../workspace/feature-view.ts';
import type { FeatureView } from '../../workspace/feature-view.ts';
import { SectionHead } from '../common/SectionHead.tsx';
import { TitledList } from '../common/TitledList.tsx';

function NotesSection({ notes }: { readonly notes: FeatureView['notes'] }): ReactElement {
  return (
    <Stack spacing={1.5} id="notes">
      <SectionHead label={words.notes.label} note={words.notes.note} />
      {notes === null ? (
        <Typography variant="body2" color="textSecondary">{words.notes.none}</Typography>
      ) : (
        <>
          {notes.lede.map((line) => (
            <Typography key={line} variant="body2" color="textSecondary">{line}</Typography>
          ))}
          {notes.sections.map((section) => (
            <Paper key={section.title} variant="outlined" sx={{ p: 2 }}>
              <TitledList label={section.title} lines={section.lines} />
            </Paper>
          ))}
        </>
      )}
    </Stack>
  );
}

export { NotesSection };
