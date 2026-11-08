/**
 * - `sizes` · one scale of control heights, glyphs and marks
 */
import type { TokenGroup } from '../designTypes.ts';

// prettier-ignore
const sizes: readonly TokenGroup[] = [
  {
    title: 'CONTROL HEIGHTS · one scale for every control',
    intro: 'Button, IconButton (square), OutlinedInput, Select, ToggleButtonGroup, Switch wrapper, Chip-as-control\nall take MUI size small | medium | large and land on these three; no component writes a height.\nThe wireframes drew 22 / 24 / 26 / 28 / 30 / 34 / 36 / 38 and moved onto these 18 Sep (25 edits / 11 files).\n                     height   glyph   type        where',
    entries: [
      { name: '--ui-h-sm', light: '28px', why: '28       14      body2       ··· row menu, sidebar collapse, in-row controls, chips as filters' },
      { name: '--ui-h-md', light: '32px', why: '32       16      body2       default button, search, filter, Segmented, Field input' },
      { name: '--ui-h-lg', light: '40px', why: '40       20      body1       ApprovalBar CTAs, rail nav, dialog primary' },
      { name: '--ui-glyph-sm', light: '14px' },
      { name: '--ui-glyph-md', light: '16px' },
      { name: '--ui-glyph-lg', light: '20px' },
      { note: 'A glyph is derived from its box, never picked by eye: half the control height, rounded to the 2px grid.\nMeasured 18 Sep: glyphs ran 8, 9, 10, 11, 12, 13, 14, 17 and 24 across the wireframes — a 28 box held\na 12 in two files while another held 14, and one 40 box held a 24. The three above are the only sizes\na control may use; an icon in a row is 16 (08 c5).\nMarks are not controls · three more sizes, each tied to what holds it (33 glyphs moved 18 Sep):' },
      { name: '--ui-mark-dot', light: '8px', why: 'inside a 13 gate dot' },
      { name: '--ui-mark-badge', light: '10px', why: 'inside a 15/16 badge or a 16 Checkbox' },
      { name: '--ui-mark-inline', light: '12px', why: 'beside text — a chip, a row label, a status word (was 11 and 13)' },
      { note: 'The content header is a surface, not a control: 46 is its height in every wireframe and it is on no\ncontrol scale on purpose — --ui-h-* stays three values. Read by theme.mixins.toolbar (07 D4 → 08 c2).' },
      { name: '--ui-toolbar-h', light: '46px' },
    ],
  },
];

export { sizes };
