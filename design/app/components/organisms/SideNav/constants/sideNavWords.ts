/**
 * - `SIDE_NAV_WORDS` · the rail's words by default: its controls, the three modes
 */
import type { SideNavWords } from '../types/sideNavTypes.ts';

export const SIDE_NAV_WORDS = {
  expand: 'Expand the sidebar',
  collapse: 'Collapse the sidebar',
  appearance: 'Appearance',
  modes: { light: 'Light', dark: 'Dark', system: 'Auto' },
  signOut: 'Sign out',
  signingOut: 'Signing out…',
  signOutFailed: 'The session did not end. Try again.',
} as const satisfies SideNavWords;
