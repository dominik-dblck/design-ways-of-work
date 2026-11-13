/**
 * - `HintButton` · a button with its reason: greyed, it says why on hover
 */
import { useId } from 'react';
import { Button } from '../../atoms/Button/index.ts';
import type { ButtonProps } from '../../atoms/Button/index.ts';
import { Hint } from '../../atoms/Hint/index.ts';
import { Why } from '../../atoms/Why/index.ts';
import { heldOf } from './utils/hintButtonHolderUtils.tsx';

export type HintButtonProps = Omit<ButtonProps, 'greyed' | 'describedBy'> & {
  // greyed: it keeps its tab stop, a screen reader reads it, the click goes nowhere
  readonly why?: string;
  // what the hover says while it is live
  readonly hint?: string;
  // the hover says nothing · a whole panel that says why for its controls
  readonly quiet?: boolean;
  readonly whyTestId?: string;
  // names the holder the hover's words sit on
  readonly hintTestId?: string;
};

/** The hover says the why while greyed, else the hint; with neither it draws none. */
export function HintButton({
  why,
  hint,
  quiet,
  whyTestId,
  hintTestId,
  disabled = false,
  loading = false,
  children,
  ...button
}: HintButtonProps): React.ReactElement {
  const describedBy = useId();
  const isReachable = why !== undefined || loading;
  const shown = (
    <Button
      {...button}
      disabled={disabled}
      loading={loading}
      greyed={why !== undefined}
      describedBy={why === undefined ? undefined : describedBy}
    >
      {children}
      {why === undefined ? null : (
        <Why id={describedBy} testId={whyTestId}>
          {why}
        </Why>
      )}
    </Button>
  );
  // one tree whatever the hover says, so a button going live keeps its focus
  return (
    <Hint
      title={disabled && !isReachable ? '' : (why ?? hint ?? '')}
      quiet={quiet}
      testId={hintTestId}
    >
      {heldOf(shown, hintTestId)}
    </Hint>
  );
}
