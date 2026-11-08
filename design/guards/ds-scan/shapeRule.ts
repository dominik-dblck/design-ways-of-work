/**
 * - `shape` · a shape drawn in three or more files that no map row claims
 * - the fingerprint is what a reader sees: corner, height band, whether it presses
 */
import type { Rule } from './dsScanTypes.ts';
import { resolve } from './scales.ts';

function propertyOf(style: string, name: string): string {
  const found = style.match(new RegExp(`${name}:([^;"]+)`));
  return found ? found[1].trim() : '';
}

// a token reads as the number it stands for, so a drawing on tokens lands in the same bucket · a cursor from a hole is a press that can be off, still a press
function fingerprintOf(
  style: string,
  {
    corner,
    vars,
  }: {
    readonly corner: string;
    readonly vars: Readonly<Record<string, string>>;
  },
): string {
  const height = resolve(propertyOf(style, 'height'), vars);
  return [
    corner === '999px' ? 'pill' : `r${corner.replace('px', '')}`,
    height ? `h${height.replace('px', '')}` : '',
    propertyOf(style, 'border') ? 'bd' : '',
    propertyOf(style, 'background') ? 'bg' : '',
    propertyOf(style, 'padding') ? 'pad' : '',
    /cursor:pointer|cursor:\{\{/.test(style) ? 'click' : '',
    /box-shadow:0 8px/.test(style) ? 'paper' : '',
  ]
    .filter(Boolean)
    .join('·');
}

const shape: Rule = {
  id: 'shape',
  what: 'a shape drawn in three or more files that no map row claims',
  because:
    'the value rules pass a pill button at 36 and a tag at radius 6 as long as the numbers are on a scale — they cannot see that the pill IS a button. Found 18 Sep by fingerprinting instead of measuring: six dialog buttons drawn as pills in three files, and 31 tags at radius 6 in nine. A shape nobody mapped is a component somebody is about to invent',
  fingerprints: null,
  run: (text, { push, ctx }) => {
    // no map, nothing to compare against
    const known = ctx.known;
    if (!known) return;
    for (const match of text.matchAll(/style="([^"]{30,})"/g)) {
      const style = match[1];
      const corner = resolve(propertyOf(style, 'border-radius'), ctx.vars);
      if (!corner) continue;
      const kind = fingerprintOf(style, { corner, vars: ctx.vars });
      if (known.includes(kind)) continue;
      push({
        value: kind,
        want: 'a row in components.spec.json, or the shape moves to one',
        at: match.index,
      });
    }
  },
};

export { shape };
