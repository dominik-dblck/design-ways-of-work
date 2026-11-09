/**
 * - `FeaturePageCombinationFileItem` · one combinations file and its count on demand
 */
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/feature-view.ts';
import type { CombinationView } from '../../../../workspace/feature-view.ts';
import { radiusOf } from '../../../../theme/tokenReads.ts';
import { useFeaturePageCount } from '../hooks/useFeaturePageCount.ts';
import { FeaturePageCombinationTitle } from './FeaturePageCombinationTitle.tsx';

function FeaturePageCombinationFileItem({
  one,
}: {
  readonly one: CombinationView;
}): ReactElement {
  const [line, count] = useFeaturePageCount(one.file);
  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: radiusOf('uiRContainer'), p: 2 }}
    >
      <Stack spacing={1}>
        <FeaturePageCombinationTitle one={one} />
        <Typography variant="body2" color="textSecondary">
          {one.what}
        </Typography>
        {line ? (
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            {line}
          </Typography>
        ) : (
          <Button
            size="small"
            variant="outlined"
            onClick={count}
            sx={{ alignSelf: 'flex-start' }}
          >
            {words.combinations.count}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}

export { FeaturePageCombinationFileItem };
