/**
 * - `roles` · the semantic roles of the surfaces, the inks and the borders
 */
import type { TokenGroup } from '../designTypes.ts';

const roles: readonly TokenGroup[] = [
  {
    title: 'SEMANTIC TOKENS — LIGHT MODE',
    intro: '',
    entries: [
      { name: '--bg-display', light: 'var(--n-25)', dark: 'var(--dbk-black)', why: 'app canvas' },
      { name: '--bg-display-wa', light: 'var(--n-20)', dark: '#15121d', why: 'working-area alt', whyDark: 'back in black' },
      { name: '--bg-primary', light: 'var(--dbk-black)', dark: 'var(--cc-physical)', why: 'primary CTA', whyDark: 'phosphorescent' },
      { name: '--bg-primary-pressed', light: 'var(--n-700)', dark: 'var(--n-200)' },
      { name: '--bg-secondary', light: 'var(--dbk-white)', dark: '#181818' },
      { name: '--bg-tertiary', light: 'var(--n-100)', dark: 'var(--n-500)' },
      { name: '--bg-soft', light: 'var(--n-75)', dark: 'var(--n-900)' },
      { name: '--bg-subtle', light: 'var(--n-50)', dark: '#282828' },
      { name: '--bg-container', light: 'var(--n-35)', dark: 'var(--n-925)' },
      { name: '--bg-sheets', light: 'var(--n-25)', dark: 'var(--n-915)' },
      { name: '--bg-divider', light: 'var(--n-200)', dark: 'var(--n-800)' },
      { name: '--bg-success', light: 'var(--g-400)' },
      { name: '--bg-danger', light: 'var(--r-400)' },
      { name: '--bg-warning', light: 'var(--y-300)' },
      { name: '--bg-label', light: 'var(--b-300)' },
      { name: '--bg-scroll', light: 'var(--tr-black-05)', dark: 'rgba(227,229,232,0.15)' },
      { name: '--fg-primary', light: 'var(--dbk-black)', dark: 'var(--dbk-white)' },
      { name: '--fg-secondary', light: 'var(--dbk-white)', dark: 'var(--dbk-black)' },
      { name: '--fg-tertiary', light: 'var(--n-600)', dark: 'var(--n-300)' },
      { name: '--fg-normal', light: 'var(--n-500)', dark: 'var(--n-400)' },
      { name: '--fg-regular', light: 'var(--n-400)', dark: 'var(--n-500)' },
      { name: '--fg-empty', light: 'var(--n-300)', dark: 'var(--n-600)' },
      { name: '--fg-disabled', light: 'var(--n-200)', dark: 'var(--n-700)' },
      { name: '--fg-success', light: 'var(--g-400)' },
      { name: '--fg-danger', light: 'var(--r-400)' },
      { name: '--fg-link', light: 'var(--b-400)', dark: 'var(--b-300)' },
      { name: '--fg-label', light: 'var(--b-300)' },
      { name: '--fg-accent', light: 'var(--o-300)' },
      { name: '--fg-hot', light: 'var(--o-400)' },
      { name: '--fg-gold', light: 'var(--y-400)' },
      { name: '--bd-primary', light: 'var(--dbk-black)', dark: 'rgba(0,0,0,0)' },
      { name: '--bd-neutral', light: 'var(--n-100)', dark: 'var(--n-800)' },
      { name: '--bd-neutral-soft', light: 'var(--n-50)', dark: 'var(--n-800)' },
      { name: '--bd-container', light: 'var(--n-75)', dark: 'var(--n-700)' },
      { name: '--bd-focused', light: 'var(--n-300)', dark: 'var(--n-500)' },
      { name: '--bd-disabled', light: 'var(--n-200)' },
      { name: '--bd-success', light: 'var(--g-400)' },
      { name: '--bd-danger', light: 'var(--r-400)' },
      { name: '--bd-warning', light: 'var(--y-300)', dark: 'var(--y-500)' },
    ],
  },
];

export { roles };
