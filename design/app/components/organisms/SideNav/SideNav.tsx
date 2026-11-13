'use client';

/**
 * - `SideNav` · the rail: the brand, the routes it is handed, the person at its foot
 * - only its width changes; the fold is the caller's, handed in and handed back
 */
import Box from '@mui/material/Box';
import { SideNavHeader } from './components/SideNavHeader.tsx';
import { SideNavLinks } from './components/SideNavLinks.tsx';
import { SideNavPersonMenu } from './components/SideNavPersonMenu.tsx';
import { SIDE_NAV_TEST_IDS } from './constants/sideNavIdConstants.ts';
import { RAIL_NARROW, RAIL_WIDE } from './constants/sideNavRailConstants.ts';
import { SIDE_NAV_SX } from './constants/sideNavRailSxConstants.ts';
import { SIDE_NAV_WORDS } from './constants/sideNavWords.ts';
import type { SideNavProps } from './types/sideNavPropsTypes.ts';

/** No person, no foot · no brand, no mark · no link handed, a plain anchor. */
export function SideNav(props: SideNavProps): React.ReactElement {
  const { onToggle, brand, person } = props;
  const isCollapsed = props.collapsed;
  const words = props.words ?? SIDE_NAV_WORDS;
  const testIds = props.testIds ?? SIDE_NAV_TEST_IDS;
  return (
    <Box
      data-testid={testIds.sideNav}
      component="nav"
      sx={{ ...SIDE_NAV_SX, width: isCollapsed ? RAIL_NARROW : RAIL_WIDE }}
    >
      <SideNavHeader
        collapsed={isCollapsed}
        {...{ onToggle, brand, words, testIds }}
      />
      <SideNavLinks
        items={props.items}
        collapsed={isCollapsed}
        linkComponent={props.linkComponent ?? 'a'}
        testId={testIds.navItem}
      />
      <Box sx={{ flex: 1 }} />
      {person && (
        <SideNavPersonMenu
          {...{ person, words, testIds }}
          collapsed={isCollapsed}
          appearance={props.appearance}
          onSignOut={props.onSignOut}
        />
      )}
    </Box>
  );
}
