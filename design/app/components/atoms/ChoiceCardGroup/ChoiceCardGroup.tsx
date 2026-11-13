'use client';

/**
 * - `ChoiceCardGroup` · a radio group of choice cards, side by side
 */
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { ChoiceCardGroupName } from './types/choiceCardGroupTypes.ts';

/** Named by the label it is labelled by, or by its own words when it has none. */
export function ChoiceCardGroup({
  children,
  ...name
}: ChoiceCardGroupName & {
  readonly children: ReactNode;
}): React.ReactElement {
  return (
    <Box
      role="radiogroup"
      aria-labelledby={name.labelledBy}
      aria-label={name.label}
      sx={{ display: 'flex', gap: 1 }}
    >
      {children}
    </Box>
  );
}
