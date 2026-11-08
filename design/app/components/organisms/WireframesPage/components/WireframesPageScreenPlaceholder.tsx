/**
 * - `WireframesPageScreenPlaceholder` · one screen
 * - number, title, line, a frame for its drawing
 */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { wireframesWords as words } from '../../../../workspace/wireframes-view.ts';
import type { ScreenCard } from '../../../../workspace/wireframes-view.ts';
import { radiusOf } from '../../../../theme/tokenReads.ts';

function WireframesPageScreenPlaceholder({ screen }: { readonly screen: ScreenCard }): ReactElement {
  return (
    <Paper variant="outlined" id={`w-${screen.num}`} sx={{ p: 2, borderRadius: radiusOf('uiRContainer') }}>
      <Stack spacing={1}>
        <Typography variant="subtitle2">
          {screen.num} · {screen.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">{screen.sub}</Typography>
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            aspectRatio: '16 / 9',
            border: 1,
            borderStyle: 'dashed',
            borderColor: 'divider',
            borderRadius: radiusOf('uiRContainer'),
          }}
        >
          <Typography variant="caption" color="textSecondary">{words.placeholder}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export { WireframesPageScreenPlaceholder };
