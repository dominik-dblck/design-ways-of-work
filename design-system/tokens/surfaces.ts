/**
 * - `surfaces` · the floating paper of menus, popovers and dialogs
 */
import type { TokenGroup } from '../designTypes.ts';

// prettier-ignore
const surfaces: readonly TokenGroup[] = [
  {
    title: 'FLOATING SURFACES · one paper, three papers',
    intro: 'Measured 18 Sep: 19 floating surfaces over 15 wireframes, drifting on four axes\n(border n-75 or n-100, radius 8 / 12 / 16, padding 5 / 6 / 10 / 12 / 14, five shadow variants).\nTwo shapes, not nineteen: a Menu is a list of rows, a Popover is a card of prose.\nBoth take --ui-r-popover 12, --bd-container, --ui-shadow-popover; only the padding differs.',
    darkNote: 'floating surfaces · a paper lifts by tone in dark, not by shadow',
    entries: [
      { name: '--ui-paper-bg', light: '#fff', dark: '#181818' },
      { name: '--ui-paper-border', light: '1px solid var(--n-75)', dark: '1px solid var(--n-800)', why: '--bd-container · the n-100 surfaces move onto it' },
      { name: '--ui-paper-pad-menu', light: '6px', why: 'Menu · MenuItem carries its own 8 10' },
      { name: '--ui-paper-pad-popover', light: '12px 14px', why: 'Popover · a card of prose' },
      { name: '--ui-paper-gap', light: '8px', why: 'offset from the anchor · 4 until 22 Sep; every popover wireframe drew 8' },
    ],
  },
];

export { surfaces };
