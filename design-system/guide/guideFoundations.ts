/**
 * - `guideFoundations` · how Deblock looks: colour, type, motion, surfaces, icons
 */
import type { GuideSection } from '../designTypes.ts';

const guideFoundations: readonly GuideSection[] = [
  {
    heading: 'VISUAL FOUNDATIONS',
    level: 2,
    lines: [],
  },
  {
    heading: 'Color',
    level: 3,
    lines: [
      'Neutral-first. Near-black {--dbk-black} is the dominant foreground and primary-button fill. The canvas is warm off-white {--n-25}, not pure white — it signals "premium paper" without the cold blueness of spec-sheet greys. Accents are used sparingly and always for a reason: {--dbk-turquoise} (turquoise panic) for success, {--r-400} (aphrodisiac) for danger, {--y-300} (ripe mango) for warning, {--b-300} (gentian flower) for label/link, {--o-400} (vitamin c) for "hot" product moments, {--a-capri} (capri) for "freeze". Large decorative blocks of color are rare; the system earns its warmth through tonal shifts in neutrals, not chroma.',
      '',
      '**Dark mode is first-class.** Canvas goes to true {--dbk-black}, surfaces stack in {--n-915} → {--n-900} → {--bg-subtle:dark} spectral blacks, and the "primary" action flips to phosphorescent {--bg-primary:dark} against black — a signature Deblock move that telegraphs "crypto-native" without shouting about it.',
    ],
  },
  {
    heading: 'Type',
    level: 3,
    lines: [
      '**Basis Grotesque Pro** across the board — Light 300, Regular 400, Medium 500, Bold 700, Black 900 plus matching italics. All weights are loaded from `/fonts`. Headings use Medium 500, tight tracking (-0.02em), line-height 1.05–1.15. Body is Regular at 16/1.35. Captions at 12/1.35 on n-500 grey. Hero amounts (balances, prices) use Medium at 48–88px with tabular numerics. **Never mix families.** No serif. Weight + size contrast does all the work.',
    ],
  },
  {
    heading: 'Backgrounds',
    level: 3,
    lines: [
      'Surfaces are tonal neutrals; imagery is edited, human, warm-biased (never cold or blue-filtered), sometimes B&W, never noisy or grainy as a default. Full-bleed photography shows up in marketing moments (cards, campaigns) and is cropped confidently. Subtle gradients exist for **panels** (soft pink→lavender→white in light mode; black→dark-red→black in dark mode) — used as decorative backgrounds on promotional sheets, never as button fills. No purple-to-blue "AI gradients." No textures. No repeating patterns.',
    ],
  },
  {
    heading: 'Motion',
    level: 3,
    lines: [
      'Smooth, confident, understated. Ease-in-out, {--motion-ease}, at 150–250ms. Sheets slide up with spring at 300ms. Press state: 98% scale + slight opacity drop. State changes cross-fade. No bounces, no celebration particles, no decorative motion.',
    ],
  },
  {
    heading: 'Hover states (marketing / web)',
    level: 3,
    lines: [
      '- Primary buttons: darken to {--n-700}, no scale change.',
      '- Secondary buttons: outline → filled {--n-50}.',
      '- Links: underline appears (or stays); color shifts to {--b-200}.',
      '- Cards: shadow lifts from {--shadow-subtle} to {--shadow-card}.',
    ],
  },
  {
    heading: 'Press / touch states (mobile)',
    level: 3,
    lines: [
      '- Primary: background → {--n-700}, 0.98 scale, 100ms.',
      '- Secondary: background → {--n-50}.',
      '- List rows: full-row tint → {--n-50}.',
      '- Tabs/chips: selected state swaps to inverse (black bg, white text).',
    ],
  },
  {
    heading: 'Borders',
    level: 3,
    lines: [
      "Hairlines at 1px. Default {--bd-neutral}. Container borders are softer ({--n-75} / {--n-800}). Focused: {--n-300}. Primary CTA has no border; it's a filled pill. Semantic borders mirror semantic fills at the same token tier.",
    ],
  },
  {
    heading: 'Shadows / elevation',
    level: 3,
    lines: [
      "**Minimal.** Prefer tonal separation. When shadows are used they're layered, soft, and barely perceptible:",
      '{why:--shadow-subtle,--shadow-card,--shadow-intense,--shadow-solid,--shadow-avatar}',
    ],
  },
  {
    heading: 'Blur',
    level: 3,
    lines: [
      'Used on navigation/tabbars, popovers, and the iOS-style selector. {--blur-nav} for nav-surface, {--blur-popover} for popovers. Never used to hide poor hierarchy — only to layer chrome over content.',
    ],
  },
  {
    heading: 'Radii',
    level: 3,
    lines: [
      '{why:--r-pill,--r-2xl,--r-xl,--r-lg,--r-md,--r-sm,--r-xs}',
      '- Full-bleed sections: 0px (functional only).',
    ],
  },
  {
    heading: 'Cards',
    level: 3,
    lines: [
      'White, {--dbk-white}, or {--n-25} on canvas, 20px radius, thin 1px {--n-75} border **or** {--shadow-subtle} (not both). Internal padding 16–24px. No colored left-border accents. No decorative corners.',
    ],
  },
  {
    heading: 'Transparency & blur',
    level: 3,
    lines: [
      'Used for chrome over content only. Nav bars, popovers, top-of-screen IBAN panel. Overlays use `rgba(0,0,0,0.15)` to dim content behind sheets.',
    ],
  },
  {
    heading: 'Imagery vibe',
    level: 3,
    lines: [
      'Warm, natural, human, calm. Never cold, saturated, or gimmicky. Product shots of cards are photorealistic against neutral backdrops. No illustrations of bags-of-money, rockets, moons, or graphs-with-up-arrows. Occasional hand-drawn editorial sketches appear in templates — used as subtle accent, never hero.',
    ],
  },
  {
    heading: 'Layout rules',
    level: 3,
    lines: [
      '- 4 / 8 pt grid everywhere.',
      '- Generous whitespace; if in doubt, more.',
      '- Swiss-influenced editorial layouts with clear vertical rhythm.',
      '- Fixed elements (status bar, nav bar, home indicator, header CTA row) hug the safe area.',
      '- Mobile content width: 358px inside a 390px frame (16px gutter).',
      '- Marketing web: 12-col, 96px gutters, max content 1280px.',
    ],
  },
  {
    heading: 'ICONOGRAPHY',
    level: 2,
    lines: [
      'Deblock uses a **custom in-house icon set** (referenced in Figma as `ic_*_outlined`, `ic_*_filled`, `ic_*_rounded`, `*_color_filled`). Icons are **geometric, consistent stroke (1.5–2px for 24px sizes), outline-dominant**, with `filled` variants for selected states and `rounded` variants (filled container + inner glyph) used inside avatars and action shortcuts.',
      '',
      '**Sizes** — 12, 16, 20, 24, 32, 40 (rounded tile), 48, 64. Optical weight matches body type — never heavier.',
      '',
      '**Family usage**',
      '- `outlined/ic_*` — default, inline with text.',
      '- `filled/ic_*` — active/selected state (e.g. selected nav tab).',
      '- `rounded/ic_*` — shortcuts & action buttons: a 40×40 rounded tile with a colored base + an inner glyph.',
      '- `coloured/rounded/ic_*` — asset/chain marks (BTC, ETH, base, etc.).',
      '- `flag/*` — country flags for IBAN / FX.',
      '',
      '**Unicode glyphs** — tabular figures, non-breaking spaces, typographic quotes where relevant. No `★` or `▲` as pseudo-icons; always the real icon asset.',
    ],
  },
];

export { guideFoundations };
