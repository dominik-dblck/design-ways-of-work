/**
 * - `FeaturePageSourceSection` · the source check
 * - copies in scope, the ratchet, each kind
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import { SectionHead } from '../../../atoms/SectionHead/index.ts';
import { inkOf } from '../utils/featurePageSourceSectionInkUtils.ts';
import { useFeaturePageStanding } from '../hooks/useFeaturePageStanding.ts';

function FeaturePageSourceSection(): ReactElement {
  const standing = useFeaturePageStanding();
  return (
    <Stack spacing={1.5} id="source">
      <SectionHead label={words.source.label} note={words.source.note} />
      <Typography
        variant="body2"
        sx={{ color: standing?.rises.length ? 'error.main' : 'text.secondary' }}
      >
        {standing ? words.source.line(standing) : words.source.running}
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        {(standing?.kinds ?? []).map((one) => (
          <Chip
            key={one.kind}
            size="small"
            variant="outlined"
            label={`${one.kind} ${one.n} / ${one.base}`}
            sx={{ color: inkOf(one) }}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export { FeaturePageSourceSection };
