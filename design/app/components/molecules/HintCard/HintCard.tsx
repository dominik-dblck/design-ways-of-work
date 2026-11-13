/**
 * - `HintCard` · a list read on hover or focus, on the popover's paper
 */
import Paper from '@mui/material/Paper';
import { HINT_CARD_SX } from './constants/hintCardConstants.ts';
import type { HintCardProps } from './types/hintCardTypes.ts';
import { HintCardHead } from './components/HintCardHead.tsx';
import { HintCardLine } from './components/HintCardLine.tsx';
import { HintCardSectionRows } from './components/HintCardSectionRows.tsx';
import { HintCardTitle } from './components/HintCardTitle.tsx';

/** A tail with no rows draws nothing; every other section draws its eyebrow. */
export function HintCard({
  eyebrow,
  count,
  rows,
  head,
  tail,
  sections = [],
  width,
  testId,
}: HintCardProps): React.ReactElement {
  const shown =
    tail === undefined || tail.rows.length === 0
      ? sections
      : [tail, ...sections];
  return (
    <Paper
      variant="popover"
      data-testid={testId}
      sx={{ ...HINT_CARD_SX, width }}
    >
      {head === undefined ? null : <HintCardHead head={head} />}
      <HintCardTitle eyebrow={eyebrow} count={count} />
      {rows.map((row) => (
        <HintCardLine key={row.title} {...row} />
      ))}
      {shown.map((section) => (
        <HintCardSectionRows key={section.eyebrow} section={section} />
      ))}
    </Paper>
  );
}
