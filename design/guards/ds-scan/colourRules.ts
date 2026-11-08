/**
 * - `hex`, `role`, `ink`, `micro`, `contrast` · the rules on a colour
 */
import type { Push, Rule } from './dsScanTypes.ts';
import {
  fillOf,
  fontSizeOf,
  inkOf,
  isInactive,
  judgePair,
  STYLE,
} from './styleReading.ts';

const BLACK_AND_WHITE = ['#fff', '#ffffff', '#000', '#000000'];

const hex: Rule = {
  id: 'hex',
  what: 'a hex · a wireframe names its colours or it does not have them',
  because:
    '307 hexes moved 18 Sep. 61 already had a token and were written long-hand; #a0a6b0 appeared 141 times and reads 2.45 on white, so it was never a colour, it was a habit; the rest collapsed onto the ramps except two pairs, which earned names (--ink-removed, --ink-proposed)',
  exemptFiles: ['EmailPreview'],
  run: (text, { scales, push }) => {
    // a colour is the value of a colour property · href="#c05" is a fragment, "#8a6a00 4.71" is prose, and &#183; is a character
    for (const match of text.matchAll(
      /(?:background|background-color|color|border|border-color|border-top|border-bottom|border-left|border-right|fill|stroke|box-shadow|outline|text-decoration-color)\s*:\s*[^;"']{0,80}?#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g,
    )) {
      const value = `#${match[1]}`.toLowerCase();
      // black and white are the brand's own
      if (BLACK_AND_WHITE.includes(value)) continue;
      const name = scales.named[value];
      push({
        value,
        want: name
          ? `var(--${name})`
          : 'a token in tokens.css, with the reason beside it',
        at: match.index,
      });
    }
  },
};

// a <style> block's base rule is where an unflippable colour hides best: text with no colour of its own inherits it · black and white are the brand's own as a fill; as an inherited ink they must be a role
function baseRules(text: string, push: Push): void {
  for (const block of text.matchAll(/<style[\s\S]*?<\/style>/g)) {
    for (const colour of block[0].matchAll(
      /(?:^|[{;])\s*color\s*:\s*(#[0-9a-fA-F]{3,6})/g,
    )) {
      push({
        value: `base rule · color: ${colour[1]}`,
        want: 'var(--fg-primary) or another --fg-* role',
        at: block.index + colour.index,
      });
    }
  }
}

const role: Rule = {
  id: 'role',
  what: 'a colour property reading a ramp step instead of a semantic role',
  because:
    "a ramp step does not flip. --n-50 is #eff0f2 in both modes, so a hover fill written as --n-50 stays near-white on a black canvas; only the design system's semantic tokens invert. Measured 18 Sep: 1378 ramp references against six semantic ones, which meant dark mode was not a day of work, it was a rewrite. 1144 moved the same day — by value identity, not by rank (fg-tertiary IS n-600), because shifting every text grey one step lighter would have undone the contrast fixed that morning",
  exemptFiles: ['EmailPreview'],
  run: (text, { push }) => {
    baseRules(text, push);
    for (const match of text.matchAll(
      /(background(?:-color)?|color|border(?:-top|-bottom|-left|-right|-color)?|fill|stroke)\s*:\s*[^;"']{0,20}?var\(--((?:n|dbk|g|b|r|y|o|a|cc)-[a-z0-9]+)\)/g,
    )) {
      // a signal colour is the value; only the neutral ramp and the brand's black and white have roles a surface must read instead
      if (!/^(?:n|dbk)-/.test(match[2])) continue;
      // the push preview draws a lock screen: a role would flip it white (tokens.css · NOT PRODUCT COLOUR)
      const before = text.slice(Math.max(0, match.index - 1600), match.index);
      if (/n-925|n-700|n-600/.test(match[2]) && /previewPush/.test(before))
        continue;
      push({
        value: `${match[1]}: ${match[2]}`,
        want: 'a --bg-* / --fg-* / --bd-* role',
        at: match.index,
      });
    }
  },
};

const ink: Rule = {
  id: 'ink',
  what: 'small text on a role that never clears 4.5 on any of our surfaces',
  because:
    'the contrast rule can only judge a pair declared together, and most muted text inherits its fill from an ancestor — so --fg-regular and --fg-normal went unreported for a day. Measured against every surface we own (18 Sep, after the PM read the Segmented card): fg-regular 2.94–3.35 light, fg-normal 3.76–4.28 light. Neither is a small-text ink in this tool; muted text is --fg-tertiary. 198 uses moved. Both stay legal above 24px and for non-text',
  exemptFiles: ['EmailPreview'],
  run: (text, { push }) => {
    for (const match of text.matchAll(STYLE)) {
      const muted = match[1].match(/color:\s*var\(--(fg-regular|fg-normal)\)/);
      if (!muted) continue;
      const font = fontSizeOf(match[1]);
      const size = font ? Number(font[1]) : 12;
      // 3:1 is the bar from 24px up, and both clear it
      if (size >= 24) continue;
      push({
        value: `${muted[1]} at ${size}px`,
        want: '--fg-tertiary',
        at: match.index,
      });
    }
  },
};

const micro: Rule = {
  id: 'micro',
  what: 'muted text under 12px that is not on the micro ink',
  because:
    'a ratio is measured on a large sample and a 10px mono eyebrow at the same ratio reads weaker — thin strokes lose effective contrast at small sizes. --fg-tertiary clears the 4.5 floor on every surface (5.23–5.96 light) and the PM still could not read the CAPTION and OVERLINE samples (18 Sep). Under 12px the floor is 7:1, which is --ink-micro: n-700 light (7.13–8.13), n-200 dark (8.97–12.77). 285 uses moved',
  exemptFiles: ['EmailPreview', 'PhonePreview', 'Browser'],
  run: (text, { push }) => {
    for (const match of text.matchAll(STYLE)) {
      const style = match[1];
      const muted = style.match(
        /color:\s*var\(--(fg-tertiary|fg-normal|fg-regular)\)/,
      );
      const font = fontSizeOf(style);
      if (!muted || !font || Number(font[1]) >= 12) continue;
      // a semantic pair, not a grey
      if (
        /background(-color)?:\s*var\(--(st|ch|ink|wash|y|g|b|r|o)-/.test(style)
      )
        continue;
      push({
        value: `${muted[1]} at ${font[1]}px`,
        want: '--ink-micro',
        at: match.index,
      });
    }
  },
};

// only a pair declared in one style attribute is checked: an ink whose fill comes from an ancestor is the pair rule's · 4.5:1, or 3:1 from 24px up
const contrast: Rule = {
  id: 'contrast',
  what: 'an ink that does not read on its own fill, in either mode',
  because:
    'the chips were measured on 18 Sep and everything else was not: 226 pairs checked that evening found 21 failing in light and 20 in dark. White on a turquoise fill reads 1.95 and on yellow 1.65 — a signal fill is light in BOTH modes, so its ink cannot flip with the mode (--ink-on-signal). --fg-secondary is white in light and black in dark, which is why white on r-500 passes at 5.03 and the same declaration reads 4.17 once the mode turns it black (--ink-on-danger). And a review ink written on a raw --y-50 rather than --st-review-bg reads 1.21 in dark, because the wash does not flip and the ink does',
  exemptFiles: ['EmailPreview'],
  run: (text, { push, ctx }) => {
    for (const match of text.matchAll(STYLE)) {
      const style = match[1];
      const ink = inkOf(style);
      const fill = fillOf(style);
      if (!ink || !fill || isInactive(style)) continue;
      const font = fontSizeOf(style);
      const size = font ? Number(font[1]) : 12;
      judgePair(
        {
          ink: ink[1],
          fill: fill[1],
          size,
          need: size >= 24 ? 3 : 4.5,
          at: match.index,
        },
        { ctx, push },
      );
    }
  },
};

export { contrast, hex, ink, micro, role };
