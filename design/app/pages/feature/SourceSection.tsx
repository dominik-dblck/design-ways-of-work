/**
 * - `SourceSection` · the source check: the copies in the scope, the ratchet, each kind
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../workspace/feature-view.ts';
import { scanAll, standingOf } from '../../workspace/source-view.ts';
import type {
  KindStanding,
  SourceStanding,
} from '../../workspace/source-view.ts';
import { SectionHead } from '../common/SectionHead.tsx';

// a count over its base rises, under it fell, at it holds
const inkOf = ({ n, base }: KindStanding): string =>
  n > base ? 'error.main' : n < base ? 'success.main' : 'text.secondary';

function useStanding(): SourceStanding | null {
  const [standing, setStanding] = useState<SourceStanding | null>(null);
  useEffect(() => {
    let live = true;
    void scanAll().then((found) => {
      if (live) setStanding(standingOf(found));
    });
    return () => {
      live = false;
    };
  }, []);
  return standing;
}

function SourceSection(): ReactElement {
  const standing = useStanding();
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

export { SourceSection };
