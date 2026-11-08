/**
 * - `origin`, `darkRule` · where the system came from; how dark mode is kept
 */
const origin =
  'Deblock Design System – Colors & Type\nGenerated from dbk-design-tokens-oct-25 (light + dark) + Figma "Style" metadata.\nBasis Grotesque Pro is the primary family; Inter is the fallback while awaiting\nthe uploaded font bundle.';

const darkRule =
  'the product layer\'s own inversion, beside the design system\'s\nThe DS flips its semantic tokens at :root[data-theme="dark"] / .dbk-dark; these are the pairs the\nDS has no step for and the values that are ours, so they flip here under the same two selectors.\nNothing mode-independent is repeated — heights, glyphs, marks, radii, z-index, paper padding and\nthe type mapping are the same in both modes and stay in :root above.\nEvery ink measured on its own wash 18 Sep against #181818 / #282828 surfaces; lowest is 6.32.';

export { darkRule, origin };
