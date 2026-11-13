/**
 * - `BoardPageKindLegend` · each kind of ticket, its chip beside what it means
 */
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { kinds, words } from '../../../../workspace/boardView.ts';
import { Heading } from '../../../atoms/Heading/index.ts';

function BoardPageKindLegend(): ReactElement {
  return (
    <Stack spacing={1.5}>
      <Heading level={2} quiet note={words.kinds.note}>
        {words.kinds.label}
      </Heading>
      <Box
        sx={{
          display: 'grid',
          gap: 1.5,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
        }}
      >
        {kinds().map((kind) => (
          <Stack key={kind.label} direction="row" spacing={1.5}>
            <Chip size="small" variant="outlined" label={kind.label} />
            <Typography variant="body2" color="textSecondary">
              {kind.means}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
}

export { BoardPageKindLegend };
