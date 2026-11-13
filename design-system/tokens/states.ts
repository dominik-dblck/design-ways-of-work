/**
 * - `states` · the state chips every app draws: draft, review, ready
 */
import type { TokenGroup } from '../designTypes.ts';

// prettier-ignore
const states: readonly TokenGroup[] = [
  {
    title: 'STATE CHIPS · draft, review, ready: one wash + one ink each',
    intro: 'The states every internal app shares, the shared theme’s chips and its diff sides drawn in them. An app\nadds its own states on its own layer, its tokens in its own `productTokens.ts`.',
    darkNote: 'state chips · wash is a deep tint of the hue, ink is the light end of the ramp',
    entries: [
      { note: 'ink on wash measured 18 Sep (Measure · contrast): every pair ≥ 4.5:1' },
      { name: '--st-draft-bg', light: 'var(--n-50)', dark: '#282828' },
      { name: '--st-draft-fg', light: 'var(--n-600)', dark: 'var(--n-300)', why: '5.23', whyDark: '7.47' },
      { name: '--st-review-bg', light: 'var(--y-50)', dark: '#3a3222' },
      { name: '--st-review-fg', light: '#8a6a00', dark: 'var(--y-100)', why: '4.71 · y-500 (#a47c05) reads 3.57 — a y-600 the DS ramp lacks', whyDark: '9.75' },
      { name: '--st-ready-bg', light: 'var(--g-50)', dark: '#12332f' },
      { name: '--st-ready-fg', light: 'var(--g-600)', dark: 'var(--g-200)', why: '5.56', whyDark: '9.26' },
    ],
  },
];

export { states };
