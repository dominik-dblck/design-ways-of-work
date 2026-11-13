'use client';

/**
 * - `FoldChevron` · a fold's chevron, turned down while what it folds is open
 */
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { Glyph } from '../../atoms/Glyph/index.ts';
import { HintIconButton } from '../HintIconButton/index.ts';
import { FOLD_CHEVRON_WORDS } from './constants/foldChevronWords.ts';
import type { FoldChevronWords } from './types/foldChevronTypes.ts';
import { turnSxOf } from './utils/foldChevronSxUtils.ts';

export type FoldChevronProps = {
  readonly open: boolean;
  readonly testId?: string;
  readonly sx?: SxProps<Theme>;
  readonly words?: FoldChevronWords | undefined;
};

/** Its press is the fold's own row · it says Collapse or Expand. */
export function FoldChevron({
  open,
  testId,
  sx,
  words = FOLD_CHEVRON_WORDS,
}: FoldChevronProps): React.ReactElement {
  return (
    <HintIconButton
      label={open ? words.collapse : words.expand}
      variant="ghost"
      size="sm"
      expanded={open}
      testId={testId}
      sx={sx}
    >
      <Box component="span" sx={turnSxOf(open)}>
        <Glyph name="chevronRight" size="small" />
      </Box>
    </HintIconButton>
  );
}
