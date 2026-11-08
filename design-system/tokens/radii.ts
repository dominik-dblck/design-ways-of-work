/**
 * - `radii` · the radius scale, and which control takes which step
 */
import type { TokenGroup } from '../designTypes.ts';

// prettier-ignore
const radii: readonly TokenGroup[] = [
  {
    title: 'RADII',
    intro: '',
    entries: [
      { name: '--r-pill', light: '999px', why: 'primary CTAs' },
      { name: '--r-2xl', light: '32px', why: 'sheets, templates' },
      { name: '--r-xl', light: '24px', why: 'large cards' },
      { name: '--r-lg', light: '20px', why: 'cards' },
      { name: '--r-md', light: '16px', why: 'containers, list cells' },
      { name: '--r-sm', light: '12px', why: 'inputs, chips' },
      { name: '--r-xs', light: '8px', why: 'badges, small tags' },
      { name: '--r-xxs', light: '4px' },
    ],
  },
  {
    title: 'RADII · the DS scale, and which control takes which step',
    intro: 'The wireframes drew 5 / 7 / 9 / 10 / 14 and moved onto these 18 Sep.',
    entries: [
      { name: '--ui-r-tag', light: 'var(--r-xxs)', why: '4  · state and type chips, role tags' },
      { name: '--ui-r-control', light: 'var(--r-xs)', why: '8  · buttons, inputs, menu items, nav rows, icon buttons · MUI shape.borderRadius' },
      { name: '--ui-r-popover', light: 'var(--r-sm)', why: '12 · popovers, menus, dialogs' },
      { name: '--ui-r-container', light: 'var(--r-md)', why: '16 · panels, list containers' },
      { name: '--ui-r-card', light: 'var(--r-lg)', why: '20 · cards' },
      { name: '--ui-r-pill', light: 'var(--r-pill)', why: '999 · avatars, the agent toggle, the approvals indicator (ApprovalsPill — not a button); never buttons (PM, 18 Sep — the wireframes; RowMenu ··· moved to 8)' },
    ],
  },
];

export { radii };
