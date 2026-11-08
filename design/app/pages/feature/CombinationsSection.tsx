/**
 * - `CombinationsSection` · each fact combinations file, its rows counted when asked
 */
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { countLine, featureWords as words } from '../../workspace/feature-view.ts';
import type { CombinationView, FeatureView } from '../../workspace/feature-view.ts';
import { SectionHead } from '../common/SectionHead.tsx';

// counting walks every row for seconds, so it runs when asked, after the line has drawn
function useCount(file: string): readonly [string | null, () => void] {
  const [line, setLine] = useState<string | null>(null);
  const count = (): void => {
    setLine(words.combinations.counting);
    setTimeout(() => setLine(countLine(file)), 60);
  };
  return [line, count];
}

function CombinationFile({ one }: { readonly one: CombinationView }): ReactElement {
  const [line, count] = useCount(one.file);
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1.5} useFlexGap sx={{ alignItems: 'baseline', flexWrap: 'wrap' }}>
          <Typography variant="subtitle2" sx={{ fontFamily: 'monospace' }}>{one.file}</Typography>
          <Typography variant="caption" color="textSecondary">{`${one.call} · ${one.criteria}`}</Typography>
        </Stack>
        <Typography variant="body2" color="textSecondary">{one.what}</Typography>
        {line ? (
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{line}</Typography>
        ) : (
          <Button size="small" variant="outlined" onClick={count} sx={{ alignSelf: 'flex-start' }}>
            {words.combinations.count}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}

function CombinationsSection({ view }: { readonly view: FeatureView }): ReactElement | null {
  const missing = !view.combinations.length && view.statesNamed > 0;
  if (!view.combinations.length && !missing) return null;
  return (
    <Stack spacing={1.5} id="combinations">
      <SectionHead label={words.combinations.label} note={words.combinations.note} />
      {missing ? (
        <Typography variant="body2" color="error">{words.combinations.missing(view.statesNamed, view.epic)}</Typography>
      ) : null}
      {view.combinations.map((one) => (
        <CombinationFile key={one.file} one={one} />
      ))}
    </Stack>
  );
}

export { CombinationsSection };
