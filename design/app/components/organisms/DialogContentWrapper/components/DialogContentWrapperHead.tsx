'use client';

/**
 * - `DialogContentWrapperHead` · the dialog's title, its glyph, its subtitle, the x
 * - the x sits outside `DialogTitle`, which names the dialog by its title alone
 */
import Box from '@mui/material/Box';
import type { GlyphName } from '../../../atoms/Glyph/index.ts';
import DialogTitle from '@mui/material/DialogTitle';
import { Glyph } from '../../../atoms/Glyph/index.ts';
import { Text } from '../../../atoms/Text/index.ts';
import { HintIconButton } from '../../../molecules/HintIconButton/index.ts';
import {
  DIALOG_TITLE_ROW_SX,
  DIALOG_TITLES_SX,
  DIALOG_TITLE_SX,
} from '../constants/dialogContentWrapperConstants.ts';
import { dialogHeadSxOf } from '../utils/dialogContentWrapperSxUtils.ts';

type DialogContentWrapperHeadProps = {
  readonly title: string;
  readonly icon?: GlyphName | undefined;
  readonly subtitle?: string | undefined;
  readonly onClose: () => void;
  readonly closeLabel: string;
  readonly closeTestId: string;
};

/** The x leaves as Cancel and the backdrop do, through the one `onClose`. */
export function DialogContentWrapperHead({
  title,
  icon,
  subtitle,
  onClose,
  closeLabel,
  closeTestId,
}: DialogContentWrapperHeadProps): React.ReactElement {
  return (
    <Box sx={dialogHeadSxOf(subtitle !== undefined)}>
      <Box sx={DIALOG_TITLES_SX}>
        <Box sx={DIALOG_TITLE_ROW_SX}>
          {icon === undefined ? null : <Glyph name={icon} size="medium" />}
          <DialogTitle sx={DIALOG_TITLE_SX}>{title}</DialogTitle>
        </Box>
        {subtitle === undefined ? null : (
          <Text tone="secondary">{subtitle}</Text>
        )}
      </Box>
      <HintIconButton
        label={closeLabel}
        variant="ghost"
        size="sm"
        onClick={onClose}
        testId={closeTestId}
      >
        <Glyph name="x" size="small" />
      </HintIconButton>
    </Box>
  );
}
