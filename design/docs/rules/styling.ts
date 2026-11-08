/**
 * - `rules` · styling: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from './ruleTypes.ts';

const rules: RuleFile = {
  title: 'Styling',
  intro:
    "\nThe look comes from the design system's\ntokens; a page names a role, never a value.\n",
  rows: [
    {
      rule: 'In a `.dc.html` page a colour is a role token (`var(--fg-primary)`), never a hex or a ramp step, and it reads in both modes.',
      gate: '`checks` (`ds-scan`)',
      exceptions: 'the chrome a frame draws, marked inline',
      why: 'A role follows the mode; a value is right in one of the two.',
    },
    {
      rule: 'In a `.dc.html` page a height, a radius and a z-index are read from `tokens.css`, never typed.',
      gate: '`checks` (`ds-scan`)',
      exceptions: 'a file drawn before, until it is touched',
      why: 'A step of a scale moves in one place.',
    },
    {
      rule: "A contrast ratio is computed by one formula, `ds-scan`'s token graph.",
      gate: '`review`',
      exceptions: '—',
      why: 'One formula, so two checks cannot disagree.',
    },
    {
      rule: 'In React code a colour is a palette role read through the theme: never a token variable, a typed value, a palette path on a `color` prop, nor `theme.palette` (the light value).',
      gate: '`aColourIsAPaletteRole`',
      exceptions: '—',
      why: 'The theme holds the tokens, so a colour follows the mode and changes in one place.',
    },
    {
      rule: 'In React code a spacing or a radius is in theme units (`p: 1.75`), never a px string.',
      gate: '`aSpaceIsInThemeUnits`',
      exceptions: '—',
      why: 'A step of the scale moves in one place.',
    },
    {
      rule: 'No HTML or CSS is written by hand: a page is TSX drawn with MUI and styled in JS (`sx`, the theme), never an HTML element, an inline style, CSS as a string or a stylesheet.',
      gate: '`nothingIsRawHtmlOrCss`',
      exceptions:
        "`legacy/` until each page moves; `tokens.css` and the design system's files, which `tokens.ts` is written from",
      why: 'One way to style, so a look is read from the tokens and checked by the tests (PM, 4 Nov).',
    },
  ],
  outro: '',
};

export { rules };
