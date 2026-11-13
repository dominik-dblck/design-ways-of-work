/**
 * - `HintLines` · several sentences of one kind, each behind its kind's mark
 */
import Box from '@mui/material/Box';
import { Glyph } from '../../atoms/Glyph/index.ts';
import { HINT_LINES_MARKS } from './constants/hintLinesConstants.ts';

/** Several sentences of one kind · each on its own line behind its kind's mark. */
export type HintLinesProps = {
  readonly lines: readonly string[];
  readonly tone: keyof typeof HINT_LINES_MARKS;
};

export function HintLines({ lines, tone }: HintLinesProps): React.ReactElement {
  return (
    <Box
      component="ul"
      sx={{
        m: 0,
        p: 0,
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
      }}
    >
      {lines.map((line, at) => (
        <Box
          component="li"
          key={`${String(at)}-${line}`}
          sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75 }}
        >
          <Box
            component="span"
            aria-hidden
            sx={{
              display: 'inline-flex',
              flexShrink: 0,
              pt: 0.25,
              color: HINT_LINES_MARKS[tone].color,
            }}
          >
            <Glyph name={HINT_LINES_MARKS[tone].glyph} size="small" />
          </Box>
          {line}
        </Box>
      ))}
    </Box>
  );
}
