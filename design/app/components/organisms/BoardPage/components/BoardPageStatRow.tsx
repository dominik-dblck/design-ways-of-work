/**
 * - `BoardPageStatRow` · the board's numbers in two folds: the project, the repository
 * - one under the other below a wide screen
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
  const { project: plan, repository: built } = words;
  const counted = useMemo(
    () => ({ plan: stats(), spec: project(), repo: repository() }),
    [],
  );
  const { commit, now, atClose } = counted.repo;
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
        lines={[
          { name: plan.plan, means: null, numbers: counted.plan },
          { name: plan.spec, means: null, numbers: counted.spec },
        ]}
        share={3}
      />
      <BoardPageNumberGroup
        id="repository"
        label={built.label}
        note={built.note}
        lines={[
          { name: built.now, means: built.notes.now, at: commit, numbers: now },
          {
            name: built.atClose,
            means: built.notes.atClose,
            numbers: atClose,
          },
        ]}
        share={2}
        waiting={commit === null ? built.waiting : null}
      />
    </Stack>
  );
}

export { BoardPageStatRow };
