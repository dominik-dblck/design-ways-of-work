'use client';

/**
 * - `SideNavRailMark` · the mark; narrow, over the word and a button that widens it
 * - the chevron is mounted on hover, never parked unseen, and fades in as it mounts
 */
import Box from '@mui/material/Box';
import { HintIconButton } from '../../../molecules/HintIconButton/index.ts';
import { Glyph } from '../../../atoms/Glyph/index.ts';
import {
  RAIL_CHEVRON_SX,
  EXPAND_SX,
  MARK_BOX_SX,
  NARROW_MARK_SX,
} from '../constants/sideNavRailHeadConstants.ts';
import { useSideNavRailPointed } from '../hooks/useSideNavRailPointed.ts';
import type { SideNavBrand } from '../types/sideNavTypes.ts';
import { markSxOf } from '../utils/sideNavRailSxUtils.ts';
import { sxListOf } from '../../../../utils/sxListUtils.ts';

type SideNavRailMarkProps = {
  readonly collapsed: boolean;
  readonly onExpand: () => void;
  readonly brand: SideNavBrand | undefined;
  readonly label: string;
  readonly testId?: string | undefined;
};

/** The mark sits in the glyph's box, so nothing jumps when the rail slides · no brand, a chevron alone. */
export function SideNavRailMark({
  collapsed,
  onExpand,
  brand,
  label,
  testId,
}: SideNavRailMarkProps): React.ReactElement {
  const { pointed: isPointed, enter, leave } = useSideNavRailPointed(collapsed);
  if (!collapsed) return <Box sx={MARK_BOX_SX}>{brand?.mark('md')}</Box>;
  return (
    <Box onMouseEnter={enter} onMouseLeave={leave} sx={MARK_BOX_SX}>
      <HintIconButton
        label={label}
        onClick={onExpand}
        testId={testId}
        sx={EXPAND_SX}
      >
        {brand && (
          <Box sx={[NARROW_MARK_SX, ...sxListOf(markSxOf(isPointed))]}>
            {brand.mark('sm')}
            {brand.word('sm')}
          </Box>
        )}
        {isPointed || !brand ? (
          <Box sx={RAIL_CHEVRON_SX}>
            <Glyph name="chevronRight" size="small" />
          </Box>
        ) : null}
      </HintIconButton>
    </Box>
  );
}
