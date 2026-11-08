/**
 * - `CoverPanel` · the cases and states the journeys cover, a bar each, and the rest
 */
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { CoverView } from '../../../../workspace/feature-view.ts';
import { CoverRow } from './CoverRow.tsx';

function CoverPanel({ cover }: { readonly cover: CoverView }): ReactElement {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        <CoverRow line={cover.cases} />
        {cover.states ? <CoverRow line={cover.states} /> : null}
        {cover.problems.map((problem) => (
          <Typography key={problem} variant="body2" color="error">{problem}</Typography>
        ))}
      </Stack>
    </Paper>
  );
}

export { CoverPanel };
