# Deblock Design System v.0

Deblock is a regulated French neobank with a non-custodial crypto wallet in one app. French IBAN, VISA debit cards, SEPA transfers, FX, fee-free crypto, 4% euro yield — and the user holds the keys. CASP-licensed with the AMF; electronic money institution under the ACPR. "Own Your Money."

Audience: crypto-native users who want real banking, plus everyday users who want control. Based in France, live across Europe, hundreds of thousands of users.

**Brand personality** — Confident, modern, trust-forward. Direct and jargon-free. Premium but accessible, closer to a great consumer app than a corporate bank. Takes money seriously, doesn't take itself too seriously.

**Used for** — marketing one-pagers, landing pages, pitch/investor decks, internal presentations, product concept screens, onboarding flows, exploratory prototypes.

---

## Sources

This system was assembled from the following attached materials:

- **Design tokens** — `dbk-design-tokens-oct-25/` (local mount): full base + semantic light/dark JSON token export from the Deblock Figma tokens plugin. This is the authoritative source for colors, semantic roles, and shadow tokens.
- **Figma — "Style.fig"** — virtual mount; pages `/Colors/Color`, `/Typography/*`, `/Icons/DEVELOPMENT`. Design language reference for the ramps and type scale.
- **Figma — "Components – Mobile App.fig"** — virtual mount; pages `/Templates/*`, `/Cards`, `/Buttons`, `/Navigation-Bar`, `/Inputs`, `/Lists`, `/Bottom-sheets`, etc. Source of truth for component styling.
- **Uploads** — `uploads/Basis Grotesque Pro.zip` and `uploads/logos_dbk.zip` were listed but the archives were **not reachable** from the project filesystem on this pass; see **Caveats** at the end.

---

## Index

```
README.md                     ← you are here
SKILL.md                      ← skill manifest for reuse in Claude Code
colors_and_type.css           ← CSS vars: base palette, semantic tokens, type scale, radii, shadows
assets/                       ← logos + master SVGs
  logo-deblock.svg            ← full wordmark (black, currentColor)
  isotype-deblock.svg         ← "d" mark
ui_kits/
  mobile_app/                 ← pixel-faithful React recreation of the mobile app
    index.html                ← interactive click-thru: Home → Wallet → Send → Review
    README.md
preview/                      ← 700-wide cards that populate the Design System tab
fonts/                        ← Basis Grotesque Pro .ttf (Light, Regular, Medium, Bold, Black + italics)
```

---

## CONTENT FUNDAMENTALS

Copy is **direct, crisp, and confident**. Sentences are short. Jargon is replaced with plain words wherever it can be — we talk about "your money" not "fiat", "send" not "execute a transfer". When crypto terms are load-bearing ("self-custodial", "seed phrase", "IBAN") they are used matter-of-factly and defined on first use.

- **Voice** — first-person plural when speaking for the brand ("We're building…"), second-person when addressing the user ("You own your keys. Nobody — not even us — can freeze your money."). Rarely "I".
- **Casing** — **Sentence case** for headings, buttons, and inputs. No Title Case except proper nouns and product names (Deblock, Vaults, Plans). Labels stay short (1–3 words).
- **Punctuation** — No exclamation marks outside celebratory micro-copy ("You're in! 🎉" → NO, we say "You're in."). Periods are optional on buttons and one-line headings. Oxford comma in lists.
- **Numbers** — Thousands with non-breaking thin space or comma to taste; amounts use tabular figures. Crypto precision is shown only where it matters (e.g. 4 decimals in-list, full precision on detail).
- **Emoji** — **Avoid.** The product UI does not use emoji. Brand voice is warm without them. Exception: a single, intentional emoji in a marketing moment is acceptable; never in-app.
- **The product name** — Always "Deblock", capital D, one word. The noun "deblocker" or verbs are not brand.

**Examples that sound right:**

> Own your money.
> A bank account with a crypto wallet built in.
> 4% on your euros. No lock-up, no catch.
> Send euros to anyone with an IBAN. Instantly.
> Your keys. Your coins. Your call.

**Examples that sound wrong:**

> 🚀 Unlock the future of finance with Deblock!
> Leverage our best-in-class crypto rails to supercharge your portfolio.
> Welcome aboard, Rockstar! 💎🙌

**Tone spectrum** (high to low, of where we live):
- *Serious and reassuring* for regulation, security, money movement.
- *Clear and matter-of-fact* for features, settings, confirmations.
- *Dry, quietly witty* for empty states and 404s. Never a joke at the user's expense.

---

## VISUAL FOUNDATIONS

### Color
Neutral-first. Near-black `#000` is the dominant foreground and primary-button fill. The canvas is warm off-white `#fbfaf9` (dr_white / n-25), not pure white — it signals "premium paper" without the cold blueness of spec-sheet greys. Accents are used sparingly and always for a reason: `#1cd0ba` (turquoise panic) for success, `#ea5f5f` (aphrodisiac) for danger, `#f8c223` (ripe mango) for warning, `#2b67ff` (gentian flower) for label/link, `#ff9900` (vitamin c) for "hot" product moments, `#00c2ff` (capri) for "freeze". Large decorative blocks of color are rare; the system earns its warmth through tonal shifts in neutrals, not chroma.

**Dark mode is first-class.** Canvas goes to true `#000`, surfaces stack in `n-915 → n-900 → #282828` spectral blacks, and the "primary" action flips to phosphorescent `#16eded` against black — a signature Deblock move that telegraphs "crypto-native" without shouting about it.

### Type
**Basis Grotesque Pro** across the board — Light 300, Regular 400, Medium 500, Bold 700, Black 900 plus matching italics. All weights are loaded from `/fonts`. Headings use Medium 500, tight tracking (-0.02em), line-height 1.05–1.15. Body is Regular at 16/1.35. Captions at 12/1.35 on n-500 grey. Hero amounts (balances, prices) use Medium at 48–88px with tabular numerics. **Never mix families.** No serif. Weight + size contrast does all the work.

### Backgrounds
Surfaces are tonal neutrals; imagery is edited, human, warm-biased (never cold or blue-filtered), sometimes B&W, never noisy or grainy as a default. Full-bleed photography shows up in marketing moments (cards, campaigns) and is cropped confidently. Subtle gradients exist for **panels** (soft pink→lavender→white in light mode; black→dark-red→black in dark mode) — used as decorative backgrounds on promotional sheets, never as button fills. No purple-to-blue "AI gradients." No textures. No repeating patterns.

### Motion
Smooth, confident, understated. Ease-in-out (`cubic-bezier(0.25, 0.1, 0.25, 1)`) at 150–250ms. Sheets slide up with spring at 300ms. Press state: 98% scale + slight opacity drop. State changes cross-fade. No bounces, no celebration particles, no decorative motion.

### Hover states (marketing / web)
- Primary buttons: darken to `n-700` (`#49505b`), no scale change.
- Secondary buttons: outline → filled `n-50`.
- Links: underline appears (or stays); color shifts to `b-200` (`#608dff`).
- Cards: shadow lifts from `shadow-subtle` to `shadow-card`.

### Press / touch states (mobile)
- Primary: background → `n-700`, 0.98 scale, 100ms.
- Secondary: background → `n-50`.
- List rows: full-row tint → `n-50`.
- Tabs/chips: selected state swaps to inverse (black bg, white text).

### Borders
Hairlines at 1px. Default `--bd-neutral` (`#d9dce1` / `#373c44` dark). Container borders are softer (`n-75` / `n-800`). Focused: `n-300`. Primary CTA has no border; it's a filled pill. Semantic borders mirror semantic fills at the same token tier.

### Shadows / elevation
**Minimal.** Prefer tonal separation. When shadows are used they're layered, soft, and barely perceptible:
- `shadow-subtle` 0 3px 3px / 3% black — resting surfaces.
- `shadow-card` 0 8px 6px / 10% + 0 4px 4px / 15% — lifted cards.
- `shadow-intense` heavier, for overlays.
- `shadow-solid` 2×2 hard offset — reserved for **marketing** moments (pricing, CTA tiles), never in-app.
- `shadow-avatar` soft radial for profile pics.

### Blur
Used on navigation/tabbars, popovers, and the iOS-style selector. `blur(20px)` for nav-surface, `blur(54px)` for popovers. Never used to hide poor hierarchy — only to layer chrome over content.

### Radii
- **Primary CTAs**: pill (`999px`).
- **Sheets / templates / large cards**: 24–32px.
- **Cards**: 20px.
- **Containers / list cells**: 16px.
- **Inputs / chips / small tags**: 12px.
- **Badges**: 8px.
- Full-bleed sections: 0px (functional only).

### Cards
White (`#fff`) or `n-25` on canvas, 20px radius, thin 1px `n-75` border **or** `shadow-subtle` (not both). Internal padding 16–24px. No colored left-border accents. No decorative corners.

### Transparency & blur
Used for chrome over content only. Nav bars, popovers, top-of-screen IBAN panel. Overlays use `rgba(0,0,0,0.15)` to dim content behind sheets.

### Imagery vibe
Warm, natural, human, calm. Never cold, saturated, or gimmicky. Product shots of cards are photorealistic against neutral backdrops. No illustrations of bags-of-money, rockets, moons, or graphs-with-up-arrows. Occasional hand-drawn editorial sketches appear in templates — used as subtle accent, never hero.

### Layout rules
- 4 / 8 pt grid everywhere.
- Generous whitespace; if in doubt, more.
- Swiss-influenced editorial layouts with clear vertical rhythm.
- Fixed elements (status bar, nav bar, home indicator, header CTA row) hug the safe area.
- Mobile content width: 358px inside a 390px frame (16px gutter).
- Marketing web: 12-col, 96px gutters, max content 1280px.

---

## ICONOGRAPHY

Deblock uses a **custom in-house icon set** (referenced in Figma as `ic_*_outlined`, `ic_*_filled`, `ic_*_rounded`, `*_color_filled`). Icons are **geometric, consistent stroke (1.5–2px for 24px sizes), outline-dominant**, with `filled` variants for selected states and `rounded` variants (filled container + inner glyph) used inside avatars and action shortcuts.

**Sizes** — 12, 16, 20, 24, 32, 40 (rounded tile), 48, 64. Optical weight matches body type — never heavier.

**Family usage**
- `outlined/ic_*` — default, inline with text.
- `filled/ic_*` — active/selected state (e.g. selected nav tab).
- `rounded/ic_*` — shortcuts & action buttons: a 40×40 rounded tile with a colored base + an inner glyph.
- `coloured/rounded/ic_*` — asset/chain marks (BTC, ETH, base, etc.).
- `flag/*` — country flags for IBAN / FX.

**Unicode glyphs** — tabular figures, non-breaking spaces, typographic quotes where relevant. No `★` or `▲` as pseudo-icons; always the real icon asset.

**Copied assets** — the Deblock wordmark and isotype are exported to `assets/`. The full icon set lives in the mobile Figma file; rather than bulk-copying 400+ SVGs, recreations in this project import individual glyphs on demand via `fig_copy_files`. For throwaway mocks where a glyph is missing, **substitute with Lucide** (`https://unpkg.com/lucide@latest`) — outline family, 1.5px stroke — and **flag the substitution** inline.

---

## CAVEATS & OPEN QUESTIONS

1. **Font files installed.** All 10 Basis Grotesque Pro `.ttf` weights are in `/fonts` and wired up via `@font-face` in `colors_and_type.css`. If you'd prefer `.woff2` for production, let me know — I can run a conversion.
2. **Logo bundle not accessible.** `uploads/logos_dbk.zip` similarly wasn't reachable. The single wordmark + isotype in `assets/` were extracted from the Figma source. **Please re-attach** the logo zip if it contains additional lockups (inverted, small-size, isotype PNG exports, etc.).
3. **Icon set** — not bulk-copied. The Figma icon pages are deep (200+ nodes). For production use we should either (a) mirror the full icon set into `assets/icons/` in a second pass, or (b) point the app at the real Deblock icon package. **Let me know which you'd prefer.**
4. **Only one UI kit produced.** The materials only cover the mobile app. If there's a marketing site, docs site, or admin surface we should include, please point me at its source.

---

**Ready to iterate.** See `preview/` for the card-level breakdown populating the Design System tab, and `ui_kits/mobile_app/index.html` for the interactive recreation.
