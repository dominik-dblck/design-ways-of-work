/**
 * - `WireframesPage` · every screen the sheet draws, one section per track, in order
 */
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { wireframesOf, wireframesWords as words } from '../../workspace/wireframes-view.ts';
import { SectionHead } from '../common/SectionHead.tsx';
import { ScreenPlaceholder } from './ScreenPlaceholder.tsx';

function WireframesPage(): ReactElement {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="overline">{words.eyebrow}</Typography>
          <Typography variant="body2" color="textSecondary">{words.intro}</Typography>
        </Stack>
        {wireframesOf().map((group) => (
          <Stack key={group.track} spacing={1.5} id={group.track}>
            <SectionHead label={group.track} note={`${group.screens.length} · ${words.track}`} />
            {group.screens.map((screen) => (
              <ScreenPlaceholder key={screen.id} screen={screen} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}

export { WireframesPage };
