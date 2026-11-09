/**
 * - `formOf`, `FormKind` · a group's data in the one form both sides compute alike
 * - `digestOf` · that form's sha256: a group moved when its digest did
 */
import { createHash } from 'node:crypto';

// a shape's keys sorted; a token's value and a word's text written one way
type FormKind = 'shape' | 'tokens' | 'words';

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const PX = /^(-?\d+(?:\.\d+)?)px$/;
const RGB = /^(rgba?)\(([^)]*)\)$/i;
const NUMBER = /^-?[\d.]+$/;

// `rgba(0, 0, 0, 0.80)` as `rgba(0,0,0,0.8)`: no spaces, each number its shortest
function rgbValue([name = '', parts = '']: readonly string[]): string {
  const numbers = parts
    .split(',')
    .map((part) => part.trim())
    .map((part) =>
      NUMBER.test(part) && Number.isFinite(Number(part))
        ? String(Number(part))
        : part,
    );
  return `${name.toLowerCase()}(${numbers.join(',')})`;
}

// a colour lowercased in six digits or its rgb written one way, a length in px a number
function tokenValue(written: string): string | number {
  const hex = HEX.exec(written)?.[1];
  if (hex !== undefined)
    return `#${(hex.length === 3 ? [...hex].map((digit) => digit + digit).join('') : hex).toLowerCase()}`;
  const rgb = RGB.exec(written.trim());
  if (rgb !== null) return rgbValue(rgb.slice(1));
  const px = PX.exec(written)?.[1];
  return px === undefined ? written : Number(px);
}

// whitespace one space and none at the ends; quotes kept, a word's own
const wordText = (text: string): string => text.replace(/\s+/g, ' ').trim();

const LEAF: Readonly<Record<FormKind, (text: string) => unknown>> = {
  shape: (text) => text,
  tokens: tokenValue,
  words: wordText,
};

// the value with every object's keys sorted and every string written its kind's way
function formOf(kind: FormKind, given: unknown): unknown {
  if (typeof given === 'string') return LEAF[kind](given);
  if (Array.isArray(given))
    return given.map((one: unknown) => formOf(kind, one));
  if (typeof given !== 'object' || given === null) return given;
  return Object.fromEntries(
    Object.keys(given)
      .sort()
      .map((key) => [key, formOf(kind, Reflect.get(given, key))]),
  );
}

// a group one side lacks digests as no text, which no form's JSON is, so never as null's
const digestOf = (form: unknown): string =>
  createHash('sha256')
    .update(form === undefined ? '' : JSON.stringify(form))
    .digest('hex');

export { digestOf, formOf };
export type { FormKind };
