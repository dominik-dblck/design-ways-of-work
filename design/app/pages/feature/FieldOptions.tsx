/**
 * - `FieldOptions` · what any field may set, each with its type and what it means
 */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../workspace/feature-view.ts';
import type { FieldOptionView } from '../../workspace/feature-view.ts';

function FieldOptions({ options }: { readonly options: readonly FieldOptionView[] }): ReactElement | null {
  if (!options.length) return null;
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" component="h3">{words.fields.options}</Typography>
      <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' } }}>
        {options.map((one) => (
          <Paper key={one.name} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{one.name}</Typography>
              <Typography variant="caption" color="textSecondary" sx={{ fontFamily: 'monospace' }}>{one.ts}</Typography>
            </Stack>
            <Typography variant="caption" color="textSecondary" component="div">{one.means}</Typography>
          </Paper>
        ))}
      </Box>
    </Stack>
  );
}

export { FieldOptions };
