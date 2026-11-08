/**
 * - `height`, `glyph`, `mark`, `radius`, `zindex`, `literal` · the rules on a scale
 */
import type { Rule } from './dsScanTypes.ts';

// a control is a box a reader presses or that holds a label · the radius alone is not enough: a colour swatch takes radius 8 and is not a button
function isControl(style: string, xs: number): boolean {
  const radius = style.match(/border-radius:(\d+)px/);
  const onToken = /border-radius:var\(--ui-r-control\)/.test(style);
  if (!onToken && (!radius || Number(radius[1]) !== xs)) return false;
  return /padding:/.test(style) || /cursor:pointer/.test(style);
}

const height: Rule = {
  id: 'height',
  what: 'a control height that is not on the scale',
  because:
    'the wireframes drew 22, 24, 26, 28, 30, 34, 36 and 38 for the same control; 25 moved 18 Sep',
  exemptFiles: ['EmailPreview'],
  run: (text, { scales, push }) => {
    for (const match of text.matchAll(/style="([^"]*height:(\d+)px[^"]*)"/g)) {
      const px = Number(match[2]);
      if (px < 24 || px > 48) continue;
      if (!isControl(match[1], scales.radii.xs)) continue;
      if (scales.heights.includes(px)) continue;
      push({
        value: `${px}px`,
        want: scales.heights.join(' / '),
        at: match.index,
      });
    }
  },
};

const glyph: Rule = {
  id: 'glyph',
  what: 'a glyph that is not half its box',
  because:
    'a 28 box held a 12 in two files and a 14 in a third; a 40 box held a 24, and the Campaigns row held a 24 beside a 14 collapse glyph',
  run: (text, { scales, push }) => {
    for (const match of text.matchAll(
      /width:(\d+)px;height:\1px;[\s\S]{0,320}?<img[^>]*style="width:(\d+)px/g,
    )) {
      const box = Number(match[1]);
      const size = Number(match[2]);
      // only boxes on the control scale
      if (!scales.heights.includes(box)) continue;
      const want = scales.glyphs[scales.heights.indexOf(box)];
      if (size === want) continue;
      push({
        value: `${size}px in a ${box} box`,
        want: `${want}px`,
        at: match.index,
      });
    }
  },
};

const mark: Rule = {
  id: 'mark',
  what: 'a mark glyph that is not on the mark scale',
  because: 'marks ran 8, 9, 10, 11, 12 and 13 by eye; 33 moved 18 Sep',
  run: (text, { scales, push }) => {
    for (const match of text.matchAll(
      /<img src="(?:assets\/icons|lucide-icons)\/([^"]+)\.svg"[^>]*style="width:(\d+)px/g,
    )) {
      const size = Number(match[2]);
      // above the mark range the glyph rule owns it; a logo is neither a control nor a mark
      if (size > 12 || scales.marks.includes(size)) continue;
      if (/special|logo|mark/.test(match[1])) continue;
      push({
        value: `${size}px · ${match[1]}`,
        want: scales.marks.join(' / '),
        at: match.index,
      });
    }
  },
};

const radius: Rule = {
  id: 'radius',
  what: 'a radius that is not on the design system ramp',
  because:
    'the wireframes drew 5, 7, 9, 10 and 14; 214 moved 18 Sep. A 6 was exempted the same day as "the inner step of a Segmented item" and the exemption hid 31 tags in nine files that should have been 4 — an exemption is a place drift hides',
  exemptFiles: ['EmailPreview'],
  run: (text, { scales, push }) => {
    const want = [...scales.radiusValues]
      .sort((first, second) => first - second)
      .join(' / ');
    for (const match of text.matchAll(/border-radius:(\d+)px/g)) {
      const px = Number(match[1]);
      // the ramp starts at 4 · a 2px corner is a drawn detail inside a miniature, not a container corner
      if (scales.radiusValues.includes(px) || px < 4) continue;
      push({ value: `${px}px`, want, at: match.index });
    }
  },
};

const zindex: Rule = {
  id: 'zindex',
  what: 'a z-index that is not one of the four layers',
  because:
    'the wireframes used 30, 40, 50, 60, 70, 120, 130, 140 and 200 — nine numbers for four layers',
  run: (text, { scales, push }) => {
    for (const match of text.matchAll(/z-index:(\d+)/g)) {
      const layer = Number(match[1]);
      if (scales.zIndex.includes(layer)) continue;
      push({
        value: String(layer),
        want: scales.zIndex.join(' / '),
        at: match.index,
      });
    }
  },
};

function literalHeight(style: string): number {
  const found = /(?:^|;)\s*height:(\d+)px/.exec(style);
  const px = found ? Number(found[1]) : 0;
  const onControl =
    /border-radius:(var\(--ui-r-control\)|8px)/.test(style) &&
    (/padding:/.test(style) || /cursor:pointer/.test(style));
  return px >= 24 && px <= 48 && onControl ? px : 0;
}

const literal: Rule = {
  id: 'literal',
  what: 'a number typed where a token holds it',
  because:
    'the E04 wireframes held radii, control heights and z-indexes by hand — 6, 10, 30, 34, 36, z 3, 5, 80 — and even an on-scale 8px is a copy a moved token leaves behind (PM, 1 Oct · A): a radius, a control height and a z-index are read from tokens.css, never typed · a file drawn before carries its numbers until a ticket touches it',
  exemptFiles: ['EmailPreview', 'PhonePreview', 'Browser'],
  run: (text, { push }) => {
    for (const match of text.matchAll(
      /style(?:-hover|-active|-focus)?="([^"]*)"/g,
    )) {
      const style = match[1];
      const at = match.index;
      for (const corner of style.matchAll(/border-radius:[^;]*?(\d+)px/g)) {
        if (Number(corner[1]) >= 4) {
          push({
            value: `border-radius ${corner[1]}px`,
            want: 'var(--ui-r-tag | control | popover | container | card | pill)',
            at,
          });
        }
      }
      const layer = /z-index:(\d+)/.exec(style);
      if (layer)
        push({
          value: `z-index ${layer[1]}`,
          want: 'var(--ui-z-sticky | menu | overlay | dialog)',
          at,
        });
      const px = literalHeight(style);
      if (px)
        push({ value: `height ${px}px`, want: 'var(--ui-h-sm | md | lg)', at });
    }
  },
};

export { glyph, height, literal, mark, radius, zindex };
