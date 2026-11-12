/**
 * - `numberLines` · the board's numbers, read once, as the lines of its two folds
 */
import {
  project,
  repository,
  stats,
  words,
} from '../../../../workspace/boardView.ts';
import type { BoardPageNumberLineProps } from '../components/BoardPageNumberLine.tsx';

interface NumberLines {
  readonly plan: readonly BoardPageNumberLineProps[];
  readonly built: readonly BoardPageNumberLineProps[];
  // the commit the repository was last read at, null until a report carries one
  readonly commit: string | null;
}

function numberLines(): NumberLines {
  const { project: plan, repository: built } = words;
  const { commit, now, atClose } = repository();
  return {
    plan: [
      { name: plan.plan, means: null, numbers: stats() },
      { name: plan.spec, means: null, numbers: project() },
    ],
    built: [
      { name: built.now, means: built.notes.now, at: commit, numbers: now },
      { name: built.atClose, means: built.notes.atClose, numbers: atClose },
    ],
    commit,
  };
}

export { numberLines };
