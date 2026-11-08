/**
 * - `shared` · styling: title, opening, rules and reasons both sides share
 */
import type { SharedRules } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: SharedRules<never> = {
  title: 'Styling',
  opening: '',
  rows: [
    { rule: 'A component writes no height; a corner, a layer, a weight and a fade are read by name off the design system\'s scales (`radiusOf(\'uiRCard\')` on `borderRadius`, in the theme\'s units; a length on one corner, in px), never written as a number (a corner `0` or `\'50%\'`, a fade `0` or `1` aside).', why: 'Size follows content, layers stack in one known order, and a step of a scale moves in one place.', design: { gate: 'ESLint `no-restricted-syntax` (a height, a corner, a layer)', exceptions: '—' }, build: { gate: '`noComponentWritesAHeight` · `aStyleReadsItsScale`', exceptions: '`app/renderers/**`, Figma\'s heights · the scale file itself (`app/styles/theme.ts`, `sizeSmall: { height: HEIGHT.small }`)' } },
    { rule: 'An sx object is written `as const`, checked where it is read; a function of the theme is typed `SxProps<Theme>`.', why: 'One form, checked where it is read · a type on the object widens what it holds.', design: { gate: 'ESLint `no-restricted-syntax` (a loose sx)', exceptions: '—' }, build: { gate: '`anSxIsAsConst`', exceptions: '—' } },
  ],
  whys: {},
};

export { shared };
