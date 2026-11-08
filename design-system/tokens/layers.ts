/**
 * - `layers` · the z-index scale
 */
import type { TokenGroup } from '../designTypes.ts';

// prettier-ignore
const layers: readonly TokenGroup[] = [
  {
    title: 'Z-INDEX · a scale, not a number somebody picked',
    intro: 'The wireframes used 30, 40, 50, 60, 70, 120, 130, 140, 200. Four layers.',
    entries: [
      { name: '--ui-z-sticky', light: '10', why: 'topbar, context bar, approval bar' },
      { name: '--ui-z-menu', light: '60', why: 'Menu and Popover — anchored to something on the page' },
      { name: '--ui-z-overlay', light: '100', why: 'the dim behind a Dialog' },
      { name: '--ui-z-dialog', light: '110', why: 'the Dialog paper, and a Popover raised inside one' },
    ],
  },
];

export { layers };
