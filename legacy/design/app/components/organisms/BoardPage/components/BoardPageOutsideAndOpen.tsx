/**
 * - `BoardPageOutsideAndOpen` · the ports' questions
 * - then what the backlog leaves open
 */
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import { open, words } from '../../../../../../../design/app/workspace/boardView.ts';
import { SectionHead } from '../../../../../../../design/app/components/atoms/SectionHead/index.ts';
import { TitledList } from '../../../../../../../design/app/components/atoms/TitledList/index.ts';
import { radiusOf } from '../../../../../../../design/app/theme/tokenReads.ts';
import { BoardPagePortGrid } from '../../../../../../../design/app/components/organisms/BoardPage/components/BoardPagePortGrid.tsx';

function BoardPageOutsideAndOpen(): ReactElement {
  return (
    <Stack spacing={3}>
      <SectionHead {...words.ports} />
      <BoardPagePortGrid />
      <SectionHead {...words.open} />
      <Paper
        variant="outlined"
        sx={{ p: 2.5, borderRadius: radiusOf('uiRContainer') }}
      >
        <Stack spacing={2}>
          {open().map((point) => (
            <TitledList
              key={point.area}
              label={point.area}
              lines={[point.why]}
            />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}

export { BoardPageOutsideAndOpen };
