/**
 * - `BoardPageStatRow` · the board's numbers in two folds, project and repository
 * - one under the other below a wide screen
 */
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/boardView.ts';
import { numberLines } from '../utils/boardPageStatRowUtils.ts';
import { BoardPageNumberGroup } from './BoardPageNumberGroup.tsx';

// the numbers read once, when the page opens
function BoardPageStatRow(): ReactElement {
  const { project: plan, repository: built } = words;
  const lines = useMemo(numberLines, []);
  return (
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      spacing={2}
      sx={{ alignItems: { lg: 'flex-start' } }}
    >
      <BoardPageNumberGroup
        id="project"
        label={plan.label}
        note={plan.note}
        lines={lines.plan}
        share={3}
      />
      <BoardPageNumberGroup
        id="repository"
        label={built.label}
        note={built.note}
        lines={lines.built}
        share={2}
        waiting={lines.commit === null ? built.waiting : null}
      />
    </Stack>
  );
}

export { BoardPageStatRow };
