/**
 * - `DecisionsSection` · the feature ticket's edges: each question, its options and the pick
 */
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../workspace/feature-view.ts';
import type { Section } from '../../workspace/board-view.ts';
import { SectionHead } from '../common/SectionHead.tsx';
import { TitledList } from '../common/TitledList.tsx';

function DecisionsSection({ sections }: { readonly sections: readonly Section[] }): ReactElement {
  return (
    <Stack spacing={1.5} id="decisions">
      <SectionHead label={words.decisions.label} note={words.decisions.note} />
      {sections.length === 0 ? (
        <Typography variant="body2" color="textSecondary">{words.nothing}</Typography>
      ) : (
        sections.map((section) => (
          <Paper key={section.label} variant="outlined" sx={{ p: 2 }}>
            <TitledList {...section} />
          </Paper>
        ))
      )}
    </Stack>
  );
}

export { DecisionsSection };
