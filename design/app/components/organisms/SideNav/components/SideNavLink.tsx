'use client';

/**
 * - `SideNavLink` · a route of the rail, a link: its glyph, its label wide
 */
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import { Glyph } from '../../../atoms/Glyph/index.ts';
import { Text } from '../../../atoms/Text/index.ts';
import { RAIL_LABEL_WIDE } from '../constants/sideNavRailConstants.ts';
import { GLYPH_BOX_SX } from '../constants/sideNavRailSxConstants.ts';
import { ROUTE_LABEL_SX } from '../constants/sideNavLinkSxConstants.ts';
import type {
  SideNavItem,
  SideNavLinkComponent,
} from '../types/sideNavTypes.ts';
import { navItemSxOf } from '../utils/sideNavRailSxUtils.ts';
import { SideNavCollapsible } from './SideNavCollapsible.tsx';

type SideNavLinkProps = {
  readonly item: SideNavItem;
  readonly collapsed: boolean;
  readonly linkComponent: SideNavLinkComponent;
  readonly testId?: string | undefined;
};

/** A narrow rail names the route on hover; a wide one writes it. */
export function SideNavLink({
  item,
  collapsed,
  linkComponent,
  testId,
}: SideNavLinkProps): React.ReactElement {
  return (
    <Tooltip
      title={item.label}
      placement="right"
      disableHoverListener={!collapsed}
      disableFocusListener={!collapsed}
      disableTouchListener={!collapsed}
    >
      <ButtonBase
        LinkComponent={linkComponent}
        href={item.href}
        data-testid={testId}
        aria-label={item.label}
        aria-current={item.active ? 'page' : undefined}
        sx={navItemSxOf(item.active, collapsed)}
      >
        <Box sx={GLYPH_BOX_SX}>
          <Glyph name={item.icon} size="medium" />
        </Box>
        <SideNavCollapsible collapsed={collapsed} width={RAIL_LABEL_WIDE}>
          <Text variant="body2" sx={ROUTE_LABEL_SX}>
            {item.label}
          </Text>
        </SideNavCollapsible>
      </ButtonBase>
    </Tooltip>
  );
}
