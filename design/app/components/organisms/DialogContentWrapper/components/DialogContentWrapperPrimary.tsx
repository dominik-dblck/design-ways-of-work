'use client';

/**
 * - `DialogContentWrapperPrimary` · the dialog's one move, spinning while it is out
 */
import { Glyph } from '../../../atoms/Glyph/index.ts';
import { HintButton } from '../../../molecules/HintButton/index.ts';
import type { DialogContentWrapperProps } from '../types/dialogContentWrapperTypes.ts';

/** Greyed with a reason, it says it on hover; greyed without one, it takes no press. */
export function DialogContentWrapperPrimary({
  dialog,
}: {
  readonly dialog: DialogContentWrapperProps;
}): React.ReactElement {
  const isDisabled = dialog.primaryDisabled ?? false;
  const { primaryWhy } = dialog;
  const why = isDisabled ? primaryWhy : undefined;
  const { primaryTestId } = dialog;
  return (
    <HintButton
      variant="contained"
      loading={dialog.pending ?? false}
      disabled={isDisabled && why === undefined}
      {...(why === undefined ? {} : { why })}
      {...(primaryTestId === undefined ? {} : { testId: primaryTestId })}
      startIcon={
        dialog.primaryIcon === undefined ? undefined : (
          <Glyph name={dialog.primaryIcon} size="small" />
        )
      }
      onClick={dialog.onPrimary}
    >
      {dialog.primaryLabel}
    </HintButton>
  );
}
