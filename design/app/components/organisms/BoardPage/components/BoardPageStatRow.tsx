/**
 * - `BoardPageStatRow` · the board's numbers in two cards
 * - the project, then the repository; one under the other on a phone
 */
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import type { ReactElement } from 'react';
import {
  project,
  repository,
  stats,
  words,
} from '../../../../workspace/boardView.ts';
import { BoardPageNumberGroup } from './BoardPageNumberGroup.tsx';

// the numbers read once, when the page opens
function BoardPageStatRow(): ReactElement {
  const counted = useMemo(
    () => ({ plan: stats(), spec: project(), built: repository() }),
    [],
  );
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
      <BoardPageNumberGroup
        label={words.project.label}
        note={words.project.note}
        lines={[counted.plan, counted.spec]}
        share={2}
      />
      <BoardPageNumberGroup
        label={words.repository.label}
        note={words.repository.note}
        lines={[counted.built]}
        share={1}
      />
    </Stack>
  );
}

export { BoardPageStatRow };
