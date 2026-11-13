'use client';

/**
 * - `DialogContentWrapper` · a dialog's frame: head, scrolling body, pinned, foot
 * - Enter sends the primary, unless it is out or greyed
 */
import Box from '@mui/material/Box';
import { DialogContentWrapperActions } from './components/DialogContentWrapperActions.tsx';
import { DialogContentWrapperBody } from './components/DialogContentWrapperBody.tsx';
import { DIALOG_CONTENT_WRAPPER_TEST_IDS } from './constants/dialogContentWrapperIdConstants.ts';
import { DIALOG_CONTENT_WRAPPER_WORDS } from './constants/dialogContentWrapperWords.ts';
import { DIALOG_FORM_SX } from './constants/dialogContentWrapperConstants.ts';
import type { DialogContentWrapperProps } from './types/dialogContentWrapperTypes.ts';

/** Enter sends the primary through the form, unless it is out or greyed. */
export function DialogContentWrapper(
  props: DialogContentWrapperProps,
): React.ReactElement {
  const { testId } = props;
  const words = props.words ?? DIALOG_CONTENT_WRAPPER_WORDS;
  const testIds = props.testIds ?? DIALOG_CONTENT_WRAPPER_TEST_IDS;
  return (
    <Box
      component="form"
      data-testid={testId}
      onSubmit={(event: React.SyntheticEvent) => {
        event.preventDefault();
        if (props.pending !== true && props.primaryDisabled !== true)
          props.onPrimary();
      }}
      sx={DIALOG_FORM_SX}
    >
      <DialogContentWrapperBody
        dialog={props}
        closeLabel={words.close}
        closeTestId={testIds.close}
      />
      <DialogContentWrapperActions
        dialog={props}
        words={words}
        testIds={testIds}
      />
    </Box>
  );
}
