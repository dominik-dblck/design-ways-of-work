/**
 * - `elevation` · the shadows and blurs, and the three a tool uses
 */
import type { TokenGroup } from '../designTypes.ts';

const elevation: readonly TokenGroup[] = [
  {
    title: 'ELEVATION',
    intro: '',
    entries: [
      { name: '--shadow-min', light: '0 12px 32px rgba(0,0,0,0.02), 0 1px 1px rgba(0,0,0,0.02)' },
      { name: '--shadow-nuanced', light: '0 12px 32px rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.05)' },
      { name: '--shadow-subtle', light: '0 3px 3px rgba(0,0,0,0.03)', why: 'resting surfaces' },
      { name: '--shadow-card', light: '0 8px 6px rgba(0,0,0,0.10), 0 4px 4px rgba(0,0,0,0.15)', why: 'lifted cards' },
      { name: '--shadow-intense', light: '0 8px 7px rgba(0,0,0,0.10), 0 3px 3px rgba(0,0,0,0.15)', why: 'overlays' },
      { name: '--shadow-bold', light: '0 4px 4px rgba(0,0,0,0.65)' },
      { name: '--shadow-solid', light: '2px 2px 0 var(--dbk-black)', why: 'marketing moments alone (pricing, CTA tiles), never in the app' },
      { name: '--shadow-solid-blue', light: '2px 2px 0 var(--b-400)' },
      { name: '--shadow-navigation', light: '0 -4px 4px rgba(0,0,0,0.05)' },
      { name: '--shadow-tab', light: '0 3px 15px rgba(0,0,0,0.10)' },
      { name: '--shadow-avatar', light: '0 6px 16px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.05)', why: 'profile pictures' },
      { name: '--shadow-lumos', light: '0 5px 14px rgba(0,0,0,0.10), 0 2px 4px rgba(253,240,200,0.60)' },
      { name: '--blur-default', light: 'blur(4px)' },
      { name: '--blur-nav', light: 'blur(20px)' },
      { name: '--blur-popover', light: 'blur(54px)' },
      { name: '--blur-selector', light: 'blur(9px)' },
      { name: '--blur-swipe', light: 'blur(7px)' },
    ],
  },
  {
    title: 'ELEVATION · the three the tool uses',
    intro: '',
    entries: [
      { name: '--ui-shadow-rest', light: 'var(--shadow-subtle)', dark: '0 0 0 1px rgba(255,255,255,0.06)' },
      { name: '--ui-shadow-popover', light: 'var(--shadow-card)', dark: '0 0 0 1px rgba(255,255,255,0.10)' },
      { name: '--ui-shadow-dialog', light: 'var(--shadow-intense)', dark: '0 0 0 1px rgba(255,255,255,0.14)' },
    ],
  },
];

export { elevation };
