/**
 * - `rules` · styling: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/styling.ts';

// prettier-ignore
const rules = ruleFileFor({
  side: 'design',
  shared,
  intro: 'The look comes from the design system\'s\ntokens; a page names a role, never a value.',
  rows: [
    { rule: 'In React code a colour is a palette role read through the theme: never a token variable, a typed value, a palette path on a `color` prop, nor `theme.palette` (the light value).', gate: 'ESLint `no-restricted-syntax` (a colour)', exceptions: '—', why: 'The theme holds the tokens, so a colour follows the mode and changes in one place.' },
    { rule: 'In React code a spacing or a radius is in theme units (`p: 1.75`, `radiusOf(\'uiRContainer\')`), never a px string.', gate: 'ESLint `no-restricted-syntax` (a space)', exceptions: '—', why: 'A step of the scale moves in one place.' },
    { rule: 'No HTML or CSS is written by hand: a page is TSX drawn with MUI and styled in JS (`sx`, the theme), never an HTML element, an inline style, CSS as a string or a stylesheet.', gate: 'ESLint `no-restricted-syntax` (raw markup) · `lint:files` (a stylesheet or a page file)', exceptions: '`legacy/` until each page moves', why: 'One way to style, so a look is read from the tokens and checked by the tests (PM, 4 Nov).' },
  ],
  outro: '',
});

export { rules };
