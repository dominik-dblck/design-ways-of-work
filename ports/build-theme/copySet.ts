/**
 * - `BUILD_THEME` · what a reviewed move from the build side copies: its seeds alone
 * - the theme, atoms and molecules are held here (W110): imported, never copied
 */
import type { CopySet } from '../../scripts/syncFiles.ts';
import { HELD } from './held.ts';

// retired here, still read by the build side: a copy's import of it is moved off here, never copied back
const RETIRED = [
  'app/components/atoms/Eyebrow/index.ts',
  'app/components/atoms/Eyebrow/Eyebrow.tsx',
];

const BUILD_THEME: CopySet = {
  // the copy lands in the design home, on the build side's own paths
  into: 'design',
  // the app skeleton (W114): what reads the theme, never the theme itself
  seeds: [
    'app/components/templates/AppShell/',
    'app/components/templates/SignedOutScreen/',
    'app/components/organisms/SideNav/',
    'app/components/organisms/LoginForm/',
    'app/components/molecules/Breadcrumbs/',
    'app/components/atoms/Link/',
    'app/components/organisms/PageHeader/',
    'app/components/organisms/PersonaStrip/',
    'app/components/organisms/DialogContentWrapper/',
  ],
  // imported where it stands: the product's tokens, what this repository holds, what it retired (W116)
  provided: ['app/styles/tokens.ts', ...HELD, ...RETIRED],
  // never copied, never imported: tests, the app's mark and name, its own layer
  left: [
    /\/__tests__\//,
    /\.test\.tsx?$/,
    /^app\/components\/atoms\/(?:AppMark|Wordmark)\//,
    /^app\/styles\/(?:appChips|appTheme|appearance)\.ts$/,
  ],
  // its own record of a move's review, written there before a sha comes here
  reviewed: 'roadmaps/moves/arch-review-{sha}.md',
};

export { BUILD_THEME };
