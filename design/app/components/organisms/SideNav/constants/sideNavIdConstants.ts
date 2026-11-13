/**
 * - `SIDE_NAV_TEST_IDS` · the ids the rail writes unless it is handed its own
 */
import type { SideNavTestIds } from '../types/sideNavTypes.ts';

export const SIDE_NAV_TEST_IDS = {
  sideNav: 'side-nav',
  navItem: 'side-nav-item',
  collapse: 'side-nav-collapse',
  expand: 'side-nav-expand',
  trigger: 'side-nav-person-trigger',
  railName: 'side-nav-person-name',
  railEmail: 'side-nav-person-email',
  menuName: 'side-nav-person-menu-name',
  signOut: 'side-nav-sign-out',
} as const satisfies SideNavTestIds;
