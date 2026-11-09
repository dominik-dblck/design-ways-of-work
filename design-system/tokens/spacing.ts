/**
 * - `spacing` · the 4pt grid
 */
import type { TokenGroup } from '../designTypes.ts';

const spacing: readonly TokenGroup[] = [
  {
    title: 'SPACING (4pt grid)',
    intro: '',
    entries: [
      { name: '--sp-1', light: '4px' },
      { name: '--sp-2', light: '8px' },
      { name: '--sp-3', light: '12px' },
      { name: '--sp-4', light: '16px' },
      { name: '--sp-5', light: '20px' },
      { name: '--sp-6', light: '24px' },
      { name: '--sp-8', light: '32px' },
      { name: '--sp-10', light: '40px' },
      { name: '--sp-12', light: '48px' },
      { name: '--sp-16', light: '64px' },
      { name: '--sp-20', light: '80px' },
      { name: '--sp-24', light: '96px' },
    ],
  },
];

export { spacing };
