/**
 * - `BUILD_THEME` · what the build side's theme and atoms copy: seeds, what stays there
 */
import type { CopySet } from '../../scripts/syncFiles.ts';

const BUILD_THEME: CopySet = {
  // the copy lands in the design home, on the build side's own paths
  into: 'design',
  seeds: [
    'app/styles/theme.ts',
    'app/styles/preference.ts',
    'app/styles/scales.ts',
    'app/styles/tones.ts',
    'app/styles/theme/',
    'app/components/atoms/',
    // the plain molecules (W108); what they read comes by their imports
    'app/components/molecules/BadgeDot/',
    'app/components/molecules/ChoiceCard/',
    'app/components/molecules/Dialog/',
    'app/components/molecules/Drawer/',
    'app/components/molecules/FaceStack/',
    'app/components/molecules/FailingMark/',
    'app/components/molecules/FieldLabel/',
    'app/components/molecules/FilterMenu/',
    'app/components/molecules/FoldChevron/',
    'app/components/molecules/HintButton/',
    'app/components/molecules/HintCard/',
    'app/components/molecules/HintIconButton/',
    'app/components/molecules/HintLines/',
    'app/components/molecules/Menu/',
    'app/components/molecules/NotFoundNotice/',
    'app/components/molecules/Notification/',
    'app/components/molecules/Pagination/',
    'app/components/molecules/Popover/',
    'app/components/molecules/RetryLine/',
    'app/components/molecules/SaveState/',
    'app/components/molecules/SearchBox/',
    'app/components/molecules/SearchList/',
    'app/components/molecules/Segmented/',
    'app/components/molecules/SelectionRow/',
  ],
  // the product's own, imported where it stands: its tokens, written by its build
  provided: ['app/styles/tokens.ts'],
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
