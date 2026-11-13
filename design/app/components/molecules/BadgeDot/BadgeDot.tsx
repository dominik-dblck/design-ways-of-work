/**
 * - `BadgeDot` · a dot on its own: its label its name, its hint what a hover shows
 */
import Box from '@mui/material/Box';
import { Hint } from '../../atoms/Hint/index.ts';
import { HintLines } from '../HintLines/index.ts';
import type { HintLinesProps } from '../HintLines/index.ts';
import { badgeDotSxOf } from '../../atoms/Badge/index.ts';
import type { BadgeDotAt, BadgeDotTone } from '../../atoms/Badge/index.ts';

/** On a corner it is ringed off what it sits on; inline it is small and plain. */
export type BadgeDotProps = {
  readonly tone: BadgeDotTone;
  readonly label: string;
  readonly at: BadgeDotAt;
  readonly hint?: string | HintLinesProps;
  readonly delay?: number;
  readonly quiet?: boolean;
  readonly testId?: string | undefined;
};

/** No hint, the dot stands alone; a hint as lines draws them under one another. */
export function BadgeDot({
  tone,
  label,
  at,
  hint,
  delay,
  quiet = false,
  testId,
}: BadgeDotProps): React.ReactElement {
  const dot = (
    <Box
      component="span"
      role="img"
      data-testid={testId}
      aria-label={label}
      sx={badgeDotSxOf(tone, at)}
    />
  );
  if (hint === undefined) return dot;
  return (
    <Hint
      title={typeof hint === 'string' ? hint : <HintLines {...hint} />}
      delay={delay}
      quiet={quiet}
    >
      {dot}
    </Hint>
  );
}
