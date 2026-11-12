/**
 * - `Fold` · a rounded fold: its head always shown, its body once opened
 */
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import type { ReactElement, ReactNode } from 'react';
import { ROUNDED } from './constants/foldRoundedConstants.ts';

interface FoldProps {
  // its id on the page, so a link can reach it
  readonly id: string;
  readonly isOpen: boolean;
  readonly onOpen: (isOpen: boolean) => void;
  readonly head: ReactNode;
  readonly children: ReactNode;
}

function Fold({ id, isOpen, onOpen, head, children }: FoldProps): ReactElement {
  return (
    <Accordion
      id={id}
      expanded={isOpen}
      onChange={(_, isNext) => onOpen(isNext)}
      variant="outlined"
      disableGutters
      sx={ROUNDED}
    >
      <AccordionSummary
        expandIcon={<Typography color="textSecondary">▾</Typography>}
      >
        {head}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export { Fold };
