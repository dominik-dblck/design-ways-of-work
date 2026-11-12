/**
 * - `FoldList` · folds opened one at a time, or all at once, or none
 */
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { ReactElement, ReactNode } from 'react';
import { Fold } from '../../atoms/Fold/index.ts';
import { useFoldListOpened } from './hooks/useFoldListOpened.ts';

interface FoldListProps {
  // each fold's id on the page, so a link can reach it
  readonly folds: readonly {
    readonly id: string;
    readonly head: ReactNode;
    readonly body: ReactNode;
  }[];
  readonly showAll: string;
  readonly hideAll: string;
}

function FoldList({ folds, showAll, hideAll }: FoldListProps): ReactElement {
  const [opened, openOnly, toggle] = useFoldListOpened();
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          onClick={() => openOnly(folds.map((fold) => fold.id))}
        >
          {showAll}
        </Button>
        <Button size="small" onClick={() => openOnly([])}>
          {hideAll}
        </Button>
      </Stack>
      {folds.map((fold) => (
        <Fold
          key={fold.id}
          id={fold.id}
          isOpen={opened.has(fold.id)}
          onOpen={(isOpen) => toggle(fold.id, isOpen)}
          head={fold.head}
        >
          {fold.body}
        </Fold>
      ))}
    </Stack>
  );
}

export { FoldList };
