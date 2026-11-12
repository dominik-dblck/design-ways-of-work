/**
 * - `FoldSection` · a section folded under its head and count; a link to it opens it
 */
import Stack from '@mui/material/Stack';
import type { ReactElement, ReactNode } from 'react';
import { Fold } from '../../atoms/Fold/index.ts';
import { SectionHead } from '../../atoms/SectionHead/index.ts';
import { useFoldSectionOpened } from './hooks/useFoldSectionOpened.ts';

interface FoldSectionProps {
  readonly id: string;
  readonly label: string;
  readonly note: string;
  // how many things the section holds, beside its label
  readonly count?: number | undefined;
  readonly spacing?: number;
  readonly children: ReactNode;
}

function FoldSection({
  id,
  label,
  note,
  count,
  spacing = 1.5,
  children,
}: FoldSectionProps): ReactElement {
  const [isOpen, toggle] = useFoldSectionOpened(id);
  return (
    <Fold
      id={id}
      isOpen={isOpen}
      onOpen={toggle}
      head={
        <SectionHead
          label={count === undefined ? label : `${label} · ${count}`}
          note={note}
        />
      }
    >
      <Stack spacing={spacing}>{children}</Stack>
    </Fold>
  );
}

export { FoldSection };
