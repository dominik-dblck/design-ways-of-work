/**
 * - `CoverPanel` · the test cases and the states the journeys cover, a bar each, and what is not
 */
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { CoverLine, CoverView } from '../../workspace/feature-view.ts';

function CoverRow({ line }: { readonly line: CoverLine }): ReactElement {
  return (
    <Stack spacing={0.75}>
      <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="body2">{line.title}</Typography>
        <Chip size="small" color={line.ok ? 'success' : 'warning'} label={line.chip} />
      </Stack>
      <LinearProgress variant="determinate" value={line.share} color={line.ok ? 'success' : 'warning'} />
    </Stack>
  );
}

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
