/**
 * - `BUILD_THEME` · what a reviewed move from the build side copies: its seeds alone
 * - the theme, atoms and molecules are held here (W110): imported, never copied
 */
import type { CopySet } from '../../scripts/syncFiles.ts';
import { HELD } from './held.ts';

const BUILD_THEME: CopySet = {
  // the copy lands in the design home, on the build side's own paths
  into: 'design',
  // the app skeleton (W114): what reads the theme, never the theme itself
  seeds: [
    'app/components/templates/AppShell/',
    'app/components/templates/SignedOutScreen/',
    'app/components/organisms/SideNav/',
    'app/components/organisms/LoginForm/',
  ],
  // imported where it stands: the product's tokens, and what this repository holds
  provided: ['app/styles/tokens.ts', ...HELD],
  // never copied, never imported: tests, the app's mark, name and router link, its own layer
  left: [
    /\/__tests__\//,
    /\.test\.tsx?$/,
    /^app\/components\/atoms\/(?:AppMark|Link|Wordmark)\//,
    /^app\/styles\/(?:appChips|appTheme|appearance)\.ts$/,
  ],
  // its own record of a move's review, written there before a sha comes here
  reviewed: 'roadmaps/moves/arch-review-{sha}.md',
};

export { BUILD_THEME };
