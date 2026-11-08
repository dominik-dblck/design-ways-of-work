/**
 * - `outlines` · the strong outline, and a chip’s edge
 */
import type { TokenGroup } from '../designTypes.ts';

// prettier-ignore
const outlines: readonly TokenGroup[] = [
  {
    title: 'THE STRONG OUTLINE',
    intro: '--bd-primary is the border that PAIRS WITH --bg-primary: a filled control needs no line of its\nown, so in the dark block it is rgba(0,0,0,0) — correct for that job. Twenty-two places were\nusing it for a different job: the visible outline on a selected row, an active field, a picked\ntile, the left rule on a timeline. In dark every one of those lines vanished — the PM found the\nactive Field first (18 Sep). A strong outline is its own role, and it has a value in both modes:\n  light  n-900  12.95 – 14.77 on our surfaces\n  dark   n-200   8.97 – 12.77\nnext to a default line at 1.21 – 1.89, so "selected" reads as a step in either mode.',
    entries: [
      { name: '--bd-strong', light: 'var(--n-900)', dark: 'var(--n-200)', whyDark: '8.97 – 12.77 · see THE STRONG OUTLINE' },
      { name: '--ui-chip-edge', light: '35%', why: 'a state chip\'s 1px edge, its own ink mixed toward transparent · both modes (PM, 6 Nov)' },
    ],
  },
];

export { outlines };
