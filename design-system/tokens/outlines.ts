/**
 * - `outlines` · the strong outline, a chip’s edge, and a control’s edge
 */
import type { TokenGroup } from '../designTypes.ts';

const outlines: readonly TokenGroup[] = [
  {
    title: 'THE STRONG OUTLINE',
    intro: '--bd-primary is the border that PAIRS WITH --bg-primary: a filled control needs no line of its\nown, so in the dark block it is rgba(0,0,0,0) — correct for that job. Twenty-two places were\nusing it for a different job: the visible outline on a selected row, an active field, a picked\ntile, the left rule on a timeline. In dark every one of those lines vanished — the PM found the\nactive Field first (18 Sep). A strong outline is its own role, and it has a value in both modes:\n  light  n-900  12.95 – 14.77 on our surfaces\n  dark   n-200   8.97 – 12.77\nnext to a default line at 1.21 – 1.89, so "selected" reads as a step in either mode.',
    entries: [
      { name: '--bd-strong', light: 'var(--n-900)', dark: 'var(--n-200)', whyDark: '8.97 – 12.77 · see THE STRONG OUTLINE' },
      { name: '--ui-chip-edge', light: '35%', why: "a state chip's 1px edge, its own ink mixed toward transparent · both modes (PM, 6 Nov)" },
    ],
  },
  {
    title: "A CONTROL'S EDGE · the line that says a field or a switch is there",
    intro: "A field's outline and a switch's empty track are the only marks of a control a person can\nuse, so they take WCAG 2.2's 3:1 for a component (1.4.11). --bd-neutral and --bg-divider drew\nthem, measured 13 Nov: outlines 1.31 – 1.66 and tracks 1.58 – 1.89 in both modes. --bd-control is\none step both modes share: n-400 reads 3.18 – 3.35 on the light surfaces and 5.30 – 6.27 on the\ndark ones; a hover or a focus still draws its own stronger line.",
    entries: [{ name: '--bd-control', light: 'var(--n-400)', why: '3.18 – 3.35 light · 5.30 – 6.27 dark · both modes' }],
  },
];

export { outlines };
