'use client';

/**
 * - `SideNavHeader` · the rail's head: the mark, the word, the collapse control
 * - one tree at both widths · narrowing takes width from the word and the control
 */
import Box from '@mui/material/Box';
import { HintIconButton } from '../../../molecules/HintIconButton/index.ts';
import { Glyph } from '../../../atoms/Glyph/index.ts';
import {
  COLLAPSE_SX,
  RAIL_HEAD_SX,
  SPACER_SX,
} from '../constants/sideNavRailHeadConstants.ts';
import {
  RAIL_COLLAPSE_WIDE,
  RAIL_HEAD_LABEL_WIDE,
} from '../constants/sideNavRailConstants.ts';
import type {
  SideNavBrand,
  SideNavTestIds,
  SideNavWords,
} from '../types/sideNavTypes.ts';
import { SideNavCollapsible } from './SideNavCollapsible.tsx';
import { SideNavRailMark } from './SideNavRailMark.tsx';

export type SideNavHeaderProps = {
  readonly collapsed: boolean;
  readonly onToggle: (next: boolean) => void;
  readonly brand: SideNavBrand | undefined;
  readonly words: SideNavWords;
  readonly testIds: SideNavTestIds;
};

/** The collapse control is the outlined small icon button, not one dressed like it. */
export function SideNavHeader({
  collapsed,
  onToggle,
  brand,
  words,
  testIds,
}: SideNavHeaderProps): React.ReactElement {
  return (
    <Box sx={RAIL_HEAD_SX}>
      <SideNavRailMark
        collapsed={collapsed}
        onExpand={() => onToggle(false)}
        brand={brand}
        label={words.expand}
        testId={testIds.expand}
      />
      <SideNavCollapsible collapsed={collapsed} width={RAIL_HEAD_LABEL_WIDE}>
        {brand?.word('md')}
      </SideNavCollapsible>
      <Box sx={SPACER_SX} />
      <SideNavCollapsible collapsed={collapsed} width={RAIL_COLLAPSE_WIDE}>
        <HintIconButton
          variant="outlined"
          size="sm"
          label={words.collapse}
          onClick={() => onToggle(true)}
          testId={testIds.collapse}
          sx={COLLAPSE_SX}
        >
          <Glyph name="chevronLeft" size="small" />
        </HintIconButton>
      </SideNavCollapsible>
    </Box>
  );
}
