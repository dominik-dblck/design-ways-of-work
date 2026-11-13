/**
 * - `BUILD_THEME_TAKEN` · eagle-design takes the build side's theme and atoms (W25, W26)
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const TOKENS = 'app/styles/productTokens.ts';

// the three states every app draws: their six rows are the design system's now
const SHARED_STATES = [
  "      { name: '--st-draft-bg', light: 'var(--n-50)', dark: '#282828' },\n",
  "      { name: '--st-draft-fg', light: 'var(--n-600)', dark: 'var(--n-300)', why: '5.23', whyDark: '7.47' },\n",
  "      { name: '--st-review-bg', light: 'var(--y-50)', dark: '#3a3222' },\n",
  "      { name: '--st-review-fg', light: '#8a6a00', dark: 'var(--y-100)', why: '4.71 · y-500 (#a47c05) reads 3.57 — a y-600 the DS ramp lacks', whyDark: '9.75' },\n",
  "      { name: '--st-ready-bg', light: 'var(--g-50)', dark: '#12332f' },\n",
  "      { name: '--st-ready-fg', light: 'var(--g-600)', dark: 'var(--g-200)', why: '5.56', whyDark: '9.26' },\n",
].join('');

// the atoms' glyph name is the way of working's word now; the spelling check refuses one held twice
const SHARED_WORD = "  'pilcrow',\n";

const BUILD_THEME_TAKEN: Migration = {
  release: '0.21.0',
  removes: [],
  moves: [],
  edits: [
    { file: TOKENS, from: SHARED_STATES, to: '' },
    { file: 'scope.ts', from: SHARED_WORD, to: '' },
  ],
  // the atoms' glyphs, drawn by the build side's pin
  dependencies: { 'lucide-react': '1.69.0' },
  tree: null,
};

export { BUILD_THEME_TAKEN };
