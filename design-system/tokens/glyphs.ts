/**
 * - `glyphs` · the tint a glyph takes on its surface
 */
import type { TokenGroup } from '../designTypes.ts';

const glyphs: readonly TokenGroup[] = [
  {
    title: 'GLYPH TINT · the wireframes only',
    intro: 'assets/icons/*.svg is black artwork placed with <img>, so currentColor never reaches it and a\nglyph cannot inherit ink the way text does. In light that is invisible — black on a light\nsurface is correct; in dark every one of them disappears, and a hard invert(1) for a black fill\nis the wrong way round once the fill is light.\nTwo tokens, and every glyph takes one of them:\n  --icon-on-surface  a glyph on a page, a paper, a subtle fill\n  --icon-on-inverse  a glyph on --bg-primary or another inverted fill\nThis is a wireframe concern only. In the app the set is served through one Icon component\n(SvgIcon) and the glyph inherits colour like text, so neither token ships.',
    darkNote: 'glyph tint · both flip, because black artwork on a dark surface is invisible',
    entries: [{ name: '--icon-on-surface', light: 'none', dark: 'invert(1)' }, { name: '--icon-on-inverse', light: 'invert(1)', dark: 'none' }, { note: 'a fill that does not invert takes a tint that does not either — the same story as\n--ink-on-signal and --ink-on-danger, one layer down. Both are absent from the dark block.' }, { name: '--icon-on-signal', light: 'none', why: 'turquoise and yellow are light in both modes · dark glyph' }, { name: '--icon-on-danger', light: 'invert(1)', why: 'r-500 is dark red in both modes · white glyph' }],
  },
];

export { glyphs };
