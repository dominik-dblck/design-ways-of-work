/**
 * - `inks` · the inks no role holds: micro, annotation, link, signal
 */
import type { TokenGroup } from '../designTypes.ts';

// prettier-ignore
const inks: readonly TokenGroup[] = [
  {
    title: 'MICRO INK · 10px and 11px text takes a stronger step',
    intro: 'A ratio is measured on a large sample; a 10px mono eyebrow at the same ratio reads weaker,\nbecause thin strokes at small sizes lose effective contrast. --fg-tertiary passes the 4.5 floor\non every surface (5.23 – 5.96 light) and the PM still could not read the CAPTION and OVERLINE\nsamples (18 Sep). So anything under 12px — captions, eyebrows, the mono labels, badge counts —\ntakes --ink-micro, which clears 7:1 on every surface we own:\n   light  n-700  7.13 – 8.13\n   dark   n-200  8.97 – 12.77\n--fg-tertiary stays the ink for 12px and up. This is a floor, not a preference: the rule\n`micro` in ds-scan.js fires on muted text below 12px that is not on this token.',
    darkNote: '--ink-on-signal and --bg-danger-solid are NOT repeated · a signal fill is the same value in\nboth modes, so its ink is too (see the light block)',
    entries: [
      { name: '--ink-micro', light: 'var(--n-700)', dark: 'var(--n-200)', whyDark: '8.97 – 12.77' },
    ],
  },
  {
    title: 'TWO DS ROLES THAT ARE NOT TEXT INK HERE',
    intro: '--fg-regular (#848d9c) and --fg-normal (#707b8c) are legible on the mobile app\'s warm canvas at\n16px. This tool runs at 12, and measured against every surface we own they read:\n   fg-regular   2.94 – 3.35 light   3.44 – 4.90 dark\n   fg-normal    3.76 – 4.28 light   4.40 – 6.27 dark\nNeither clears 4.5 in light on any surface, so neither is a small-text ink in Eagle:\nmuted body text takes --fg-tertiary (5.23 – 5.96 light, 7.47 – 10.64 dark). 198 uses moved\n18 Sep. The two roles stay legal for non-text — a hairline, a 24px+ heading, an inactive glyph.',
    entries: [
    ],
  },
  {
    title: 'ANNOTATION INKS · two pairs the design system has no step for',
    intro: 'A diff pane and a proposal panel need a muted ink on a wash: removed / rejected, and proposed.\nThe DS ramps jump from a bright signal (r-500 #da1d1d, o-400 #ff9900) straight to a 50 wash,\nand a signal ink on its own wash fails (r-500 on r-50 reads 4.01). Measured 18 Sep, all ≥ 4.5.\nAdded / accepted is NOT here — g-600 on g-50 reads 5.56 and already carries it.',
    darkNote: 'annotation inks',
    entries: [
      { name: '--ink-removed', light: '#b03a3a', dark: 'var(--r-300)', why: '5.98 on white · 5.23 on the wash below', whyDark: '6.32 on the wash below' },
      { name: '--wash-removed', light: '#fdecec', dark: '#3a1f1f' },
      { name: '--ink-proposed', light: '#9e4a19', dark: 'var(--o-300)', why: '6.09 on white · 5.41 on the wash · 4.51 on the deep wash', whyDark: '7.67' },
      { name: '--wash-proposed', light: '#fdefe4', dark: '#3a2618' },
      { name: '--ink-info', light: 'var(--b-400)', dark: 'var(--b-50)', why: '5.71 on the wash below · b-300 reads 4.04 and fails', whyDark: '10.84 on the wash below' },
      { name: '--wash-info', light: '#e8eeff', dark: '#1b2440' },
      { note: 'A LINK INK OF OUR OWN · the DS\'s --fg-link has no dark pair: it resolves to b-300 there and\nreads 3.15–4.49 on our surfaces, so every nav chip on this board was blue-on-black at 2.68\n(found 18 Sep, in review, after the info pair below failed to land the first time).\nLight b-400 5.81–6.63 · dark b-100 7.14–10.17. Hover shifts one step, not to a lighter grey.' },
      { name: '--ink-link', light: 'var(--b-400)', dark: 'var(--b-100)', whyDark: '7.14 – 10.17 on our surfaces' },
      { name: '--ink-link-hover', light: 'var(--b-500)', dark: 'var(--b-50)', whyDark: '10.45 – 14.88' },
      { note: 'SIGNAL TEXT INK · a signal FILL and a signal TEXT are different jobs. b-300, g-600 and r-400\nare fills that happen to be dark enough to read on white, and they have no dark pair — as text\nthey read 4.49 / 3.32 / 3.33 (measured 18 Sep). A word that carries meaning takes one of these,\non any of our five surfaces:\n  ink-danger   light r-600  7.98 – 9.10    dark r-200   7.19 – 10.24\n  ink-ready    light g-600  5.56 – 6.33    dark g-200  10.02 – 14.27\n  ink-info     light b-400  5.81 – 6.63    dark b-100   7.14 – 10.17  (above)' },
      { name: '--ink-danger', light: 'var(--r-600)', dark: 'var(--r-200)', whyDark: '7.19 – 10.24' },
      { name: '--ink-ready', light: 'var(--g-600)', dark: 'var(--g-200)', whyDark: '10.02 – 14.27' },
    ],
  },
  {
    title: 'INK ON A SIGNAL FILL · fixed, because a signal fill is light in BOTH modes',
    intro: 'Turquoise and yellow do not invert — g-400 and y-300 are the same value in dark, so an ink\nthat flips with the mode fails on one of them. Measured 18 Sep: white on g-400 reads 1.95 and\nwhite on y-300 reads 1.65; near-black reads 9.47 and 11.19. These two are deliberately NOT\nsemantic roles, and they are the same in both blocks. Danger does invert its ink, so it is a\nrole — but the fill has to be r-500: white on r-400 reads 3.33, on r-500 5.03.',
    entries: [
      { name: '--ink-on-signal', light: 'var(--n-925)', why: '9.47 on g-400 · 11.19 on y-300' },
      { name: '--bg-danger-solid', light: 'var(--r-500)', why: 'r-500 · --bg-danger (r-400) is a wash-weight fill' },
      { name: '--ink-on-danger', light: 'var(--dbk-white)', why: '5.03 on r-500 · fixed, because a danger fill is dark red in both modes: --fg-secondary flips to black and reads 4.17' },
      { name: '--wash-proposed-deep', light: '#f3d9c6', dark: '#4a3220', why: 'the same wash one step down, for a nested proposal row' },
    ],
  },
];

export { inks };
