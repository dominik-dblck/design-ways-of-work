/**
 * - `tint`, `tintLogic`, `tintUnknown` · a glyph's tint: literal, fixed or missing
 */
import type { Push, Rule } from './dsScanTypes.ts';

// the chrome files key their tint on the other product's own dark prop, the one place a literal is right: a mail client's theme is not ours and must not move when we switch
const tintLogic: Rule = {
  id: 'tint-logic',
  what: 'a glyph tint computed as a literal in the logic class',
  exemptFiles: ['EmailPreview', 'PhonePreview', 'Browser'],
  because:
    'rule tint reads the markup, and six components computed the filter in renderVals instead — keyed on a state (`variant === "primary"`, `sel`, `ms === "warn"`, `checksPass`), which is right only while that state happens to be dark. In dark a primary CTA knocked its glyph out white on the cyan --bg-primary while the label stayed dark, and a secondary kept black artwork on a dark surface (PM, 18 Sep · AP 06, AP 08). A tint is a function of the FILL, and for a gate dot it is the legend\'s own derivation',
  run: (text, { push }) => {
    for (const match of text.matchAll(
      /[A-Za-z]*[Ff]ilter\s*:[^,;\n]*['"](?:invert\(1\)|none)['"]/g,
    )) {
      // the legend's fallback
      if (/GS\s*\?|GateStates/.test(match[0])) continue;
      push({
        value: match[0].trim().slice(0, 60),
        want: 'var(--icon-on-*) chosen by the fill, or GS.filter()',
        at: match.index,
      });
    }
  },
};

const tintUnknown: Rule = {
  id: 'tint-unknown',
  what: 'a fixed glyph tint inside a container whose fill is a {{ hole }}',
  because:
    "rules tint and pair both SKIP a runtime fill, because they cannot resolve it — which is correct and also a hole: ExportDialog's tick sat on {{ p.boxBg }} with a hard --icon-on-surface, so in light mode it drew black on the black checked box and nobody saw it for a day (PM, 18 Sep). A tint under a runtime fill has to be as dynamic as the fill, or name the one fill the glyph actually renders on",
  exemptFiles: ['EmailPreview', 'AvatarStack', 'PhonePreview', 'Browser'],
  run: (text, { push }) => {
    for (const match of text.matchAll(
      /background:\s*\{\{[^}]*\}\}[^>]{0,400}?<img[^>]*filter:\s*var\(--icon-on-([a-z]+)\)/g,
    )) {
      // the img left the container
      if (/<\/div>/.test(match[0].slice(0, match[0].indexOf('<img')))) continue;
      push({
        value: `icon-on-${match[1]} under a {{ }} fill`,
        want: 'a tint as dynamic as the fill',
        at: match.index,
      });
    }
  },
};

// a logo keeps its own colours; a photograph is not artwork, known by object-fit:cover rather than a name in the src; the legend derives its tint from luminance
function keepsItsColours(tag: string): boolean {
  if (/deblock-mark|_special/.test(tag)) return true;
  if (
    /avatar|Avatar|\bface\b|Face/.test(tag) ||
    /object-fit:\s*cover/.test(tag)
  )
    return true;
  return /GS\.filter\(|GateStates\.filter\(/.test(tag);
}

// a literal is the bug in both directions: invert(1) is white artwork, which vanishes on the cyan --bg-primary of dark mode; none is black artwork, which vanishes on a dark surface · the token is chosen by the fill
function untinted(
  tag: string,
  { at, push }: { readonly at: number; readonly push: Push },
): void {
  if (/filter:\s*(invert\(1\)|none)\b/.test(tag)) {
    push({ value: 'a literal filter', want: 'filter: var(--icon-on-*)', at });
    return;
  }
  // tinted from the legend at run time
  if (/filter:\s*\{\{/.test(tag)) return;
  push({
    value: 'no tint token',
    want: 'filter: var(--icon-on-surface | -inverse | -signal | -danger)',
    at,
  });
}

// --r-400 is a wash-weight signal, not a danger fill: a glyph there takes --icon-on-signal like turquoise and yellow · --icon-on-danger belongs to --bg-danger-solid (r-500) and darker
function againstFill(
  text: string,
  {
    token,
    at,
    push,
  }: { readonly token: string; readonly at: number; readonly push: Push },
): void {
  const fills = text
    .slice(Math.max(0, at - 220), at)
    .match(/background:\s*([^;"]+)/g);
  const last = fills ? fills[fills.length - 1] : '';
  if (
    /turquoise|g-400|bg-success|y-300|bg-warning|r-400/.test(last) &&
    token !== 'signal'
  ) {
    push({
      value: `icon-on-${token} on a signal fill`,
      want: 'icon-on-signal',
      at,
    });
  }
  if (/bg-danger-solid|r-500|r-600/.test(last) && token !== 'danger') {
    push({
      value: `icon-on-${token} on a danger fill`,
      want: 'icon-on-danger',
      at,
    });
  }
}

// a glyph from a runtime value is still a glyph, so a {{ }} src is read like a literal one
const tint: Rule = {
  id: 'tint',
  what: 'a glyph with no tint token, or one that does not match the fill it sits on',
  because:
    'assets/icons/*.svg is black artwork placed with <img>, so currentColor never reaches it and a glyph cannot inherit ink the way text does. In light that reads correctly and hides the problem; in dark every untinted glyph disappears — the sidebar collapse button was the one the PM saw, and the count was 34 untinted plus 32 carrying a hard invert(1) for a black fill, which is the wrong way round once the fill turns light (18 Sep). A glyph on a fill that does not invert takes a tint that does not either: 25 sat on turquoise, yellow or red',
  exemptFiles: ['EmailPreview'],
  run: (text, { push }) => {
    for (const match of text.matchAll(
      /<img[^>]*src="(?:assets\/icons\/[^"]*|\{\{[^"]*\}\})"[^>]*>/g,
    )) {
      const tag = match[0];
      if (keepsItsColours(tag)) continue;
      const token = tag.match(/filter:\s*var\(--icon-on-([a-z]+)\)/);
      if (token) againstFill(text, { token: token[1], at: match.index, push });
      else untinted(tag, { at: match.index, push });
    }
  },
};

export { tint, tintLogic, tintUnknown };
