/**
 * - `MIXINS` · the scale a component with no size prop reads
 * - `Z_INDEX`, `SHADOWS` · MUI's slots on the four layers, its elevations
 */
import type { Shadows } from '@mui/material/styles';
import { controlGlyph, controlHeight, layers } from '../scales.ts';
import { colour, length } from '../tokenReads.ts';

// a mark is not a control · each size tied to what holds it
const MARK = {
  dot: length('uiMarkDot'),
  badge: length('uiMarkBadge'),
  inline: length('uiMarkInline'),
} as const;

// Lucide's own 2, and 3 inside a gate dot · tokens.css carries no stroke
const STROKE = {
  small: 2,
  medium: 2,
  large: 2,
  dot: 3,
  badge: 2,
  inline: 2,
} as const satisfies Record<
  keyof typeof controlGlyph | keyof typeof MARK,
  number
>;

/** The scale where a component with no size prop reads it · a toolbar is on no `--ui-h-*` step. */
export const MIXINS = {
  toolbar: { minHeight: length('uiToolbarH') },
  control: controlHeight,
  glyph: controlGlyph,
  mark: MARK,
  stroke: STROKE,
};

/** A slot with no layer of its own takes the one it belongs to · a tooltip sits with dialogs. */
export const Z_INDEX = {
  ...layers,
  mobileStepper: layers.sticky,
  appBar: layers.sticky,
  drawer: layers.sticky,
  fab: layers.menu,
  speedDial: layers.menu,
  tooltip: layers.dialog,
  modal: layers.dialog,
  snackbar: layers.dialog,
};

const rest = colour('uiShadowRest');
const popover = colour('uiShadowPopover');
const dialog = colour('uiShadowDialog');

/** MUI reads elevation 0…24 by index · written out, since a spread needs a cast that hides the 25. */
export const SHADOWS: Shadows = [
  'none',
  rest,
  popover,
  popover,
  popover,
  popover,
  popover,
  popover,
  popover,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
  dialog,
];

declare module '@mui/material/styles' {
  interface ZIndex {
    sticky: number;
    menu: number;
    overlay: number;
    dialog: number;
  }
  interface Mixins {
    control: typeof controlHeight;
    glyph: typeof controlGlyph;
    mark: typeof MARK;
    stroke: typeof STROKE;
  }
  interface MixinsOptions {
    control?: typeof controlHeight;
    glyph?: typeof controlGlyph;
    mark?: typeof MARK;
    stroke?: typeof STROKE;
  }
}
