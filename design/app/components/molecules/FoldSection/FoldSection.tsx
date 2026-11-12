/**
 * - `FoldSection` · a section folded under its head and count; a link to it opens it
 */
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement, ReactNode } from 'react';
import { SectionHead } from '../../atoms/SectionHead/index.ts';
import { ROUNDED } from './constants/foldSectionRoundedConstants.ts';
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
    <Accordion
      id={id}
      expanded={isOpen}
      onChange={(_, isNext) => toggle(isNext)}
      variant="outlined"
      disableGutters
      sx={ROUNDED}
    >
      <AccordionSummary
        expandIcon={<Typography color="textSecondary">▾</Typography>}
      >
        <SectionHead
          label={count === undefined ? label : `${label} · ${count}`}
          note={note}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={spacing}>{children}</Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export { FoldSection };
