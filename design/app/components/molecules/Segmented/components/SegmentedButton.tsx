/**
 * - `SegmentedButton` · one option · a glyph alone is named aloud and on hover
 */
import ToggleButton from '@mui/material/ToggleButton';
import { Hint } from '../../../atoms/Hint/index.ts';
import type { SegmentedOption } from '../types/segmentedTypes.ts';

type SegmentedButtonProps = SegmentedOption & {
  readonly testId?: string | undefined;
};

export function SegmentedButton({
  testId,
  ...option
}: SegmentedButtonProps): React.ReactElement {
  if (!('glyph' in option))
    return (
      <ToggleButton data-testid={testId} value={option.value}>
        {option.label}
      </ToggleButton>
    );
  return (
    <Hint title={option.name}>
      <ToggleButton
        data-testid={testId}
        value={option.value}
        aria-label={option.name}
      >
        {option.glyph}
      </ToggleButton>
    </Hint>
  );
}
