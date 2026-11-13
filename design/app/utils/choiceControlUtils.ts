/**
 * - `ChoiceProps` · what a box or a pill takes: state, `inRow`, a name, a test id
 * - `choicePropsOf` · those props as MUI's switch base reads them
 */
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export type ChoiceProps = {
  readonly checked?: boolean;
  readonly disabled?: boolean;
  readonly inRow?: boolean;
  readonly onChange?: (checked: boolean) => void;
  // named to a reader where no visible label is tied to it
  readonly label?: string;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
};

type ChoiceBaseProps = {
  readonly sx: SxProps<Theme> | undefined;
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly 'data-in-row': '' | undefined;
  readonly slotProps: {
    readonly input: InputHTMLAttributes<HTMLInputElement> & {
      readonly 'data-testid'?: string | undefined;
    };
  };
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

/** `inRow` turns the halo off: in a selection row the row is the target. */
export const choicePropsOf = ({
  checked = false,
  disabled = false,
  inRow = false,
  onChange,
  label,
  testId,
  sx,
}: ChoiceProps): ChoiceBaseProps => ({
  sx,
  checked,
  disabled,
  'data-in-row': inRow ? '' : undefined,
  slotProps: { input: { 'aria-label': label, 'data-testid': testId } },
  onChange: (event) => onChange?.(event.target.checked),
});
