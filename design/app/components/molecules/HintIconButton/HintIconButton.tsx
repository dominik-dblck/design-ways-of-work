/**
 * - `HintIconButton` · a square glyph button named by a required Hint
 */
import { useId } from 'react';
import { Hint } from '../../atoms/Hint/index.ts';
import { IconButton } from '../../atoms/IconButton/index.ts';
import type { IconButtonProps } from '../../atoms/IconButton/index.ts';
import { Why } from '../../atoms/Why/index.ts';

export type HintIconButtonProps = Omit<
  IconButtonProps,
  'greyed' | 'describedBy'
> & {
  // shown instead of the label once greyed, and the click goes nowhere
  readonly why?: string;
  // the label is for a screen reader only · the hover shows nothing unless it is greyed
  readonly quiet?: boolean;
  readonly whyTestId?: string;
};

export function HintIconButton({
  why,
  quiet = false,
  whyTestId,
  children,
  ...button
}: HintIconButtonProps): React.ReactElement {
  const describedBy = useId();
  const isGreyed = why !== undefined;
  return (
    <Hint title={why ?? button.label} quiet={quiet && !isGreyed}>
      <IconButton
        {...button}
        greyed={isGreyed}
        describedBy={isGreyed ? describedBy : undefined}
      >
        {children}
        {isGreyed ? (
          <Why id={describedBy} testId={whyTestId}>
            {why}
          </Why>
        ) : null}
      </IconButton>
    </Hint>
  );
}
