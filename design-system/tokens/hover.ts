/**
 * - `hover` · one hover, and the selected fill beside it
 */
import type { TokenGroup } from '../designTypes.ts';

const hover: readonly TokenGroup[] = [
  {
    title: 'ONE HOVER',
    intro: "Every control that a reader can press takes the same hover: the fill arrives, nothing else\nmoves. --bg-subtle behind it, --fg-primary on it; the border stays exactly where it was.\nFive controls used to darken their 1px border instead (the ··· row menu, two dashed adders,\na dialog's Cancel, a campaign row's) — at 1px that is a change you look for rather than see,\nand it made an icon button and an outlined button behave differently side by side (PM, 18 Sep).\nA filled control darkens instead: --bg-primary-pressed. That is the whole set.",
    darkNote: 'hover · the fill is the dark subtle step; the generator flattened the light alias to a hex\n\non · a step past the hover, which the dark subtle step sits beside',
    entries: [{ name: '--ui-hover-fill', light: 'var(--bg-subtle)', dark: 'var(--n-900)' }, { name: '--ui-hover-ink', light: 'var(--fg-primary)', dark: 'var(--fg-primary)' }, { note: 'ON · a secondary control that is on: this ground, the strong border (Dom, 5 Nov)' }, { name: '--ui-selected-fill', light: 'var(--bg-subtle)', dark: 'var(--bg-divider)' }, { note: 'A 16px box cannot show a fill inside itself, so a Checkbox and a Radio take the same fill as a\n28px halo behind the box — the small control height, so the hover target matches every other\nsmall control. Checked, the box darkens to --bg-primary-pressed like any filled control.\nInside a selection row the ROW fills and the halo stays off: one target, one hover.' }, { name: '--ui-hover-halo', light: '28px' }],
  },
];

export { hover };
