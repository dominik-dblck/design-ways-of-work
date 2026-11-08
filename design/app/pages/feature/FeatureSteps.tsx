/**
 * - `FeatureSteps` · the feature's standing at each refine step, one not begun muted
 */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { FeatureView } from '../../workspace/feature-view.ts';

// a step not begun reads todo, or a dash
const NOT_BEGUN = /^(todo|—)/;

function FeatureSteps({ steps }: { readonly steps: FeatureView['steps'] }): ReactElement | null {
  if (!steps.length) return null;
  return (
    <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(0, 1fr))' } }}>
      {steps.map((one) => (
        <Paper key={one.step} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
          <Typography variant="overline" color="textSecondary" component="div">{one.step}</Typography>
          <Typography variant="caption" component="div" color={NOT_BEGUN.test(one.standing) ? 'textSecondary' : 'textPrimary'}>
            {one.standing}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export { FeatureSteps };
