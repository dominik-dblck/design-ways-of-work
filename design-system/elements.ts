/**
 * - `elements`, `elementsNote` · the styles an element or a class takes
 */
import type { ElementStyle } from './designTypes.ts';

const elementsNote = '===== BASE RESETS + SEMANTIC ELEMENTS =====';

// prettier-ignore
const elements: readonly ElementStyle[] = [
  { selector: 'html, body', style: [['font-family', 'var(--font-sans)'], ['font-size', 'var(--t-body)'], ['line-height', 'var(--lh-normal)'], ['color', 'var(--fg-primary)'], ['background', 'var(--bg-display)'], ['-webkit-font-smoothing', 'antialiased'], ['text-rendering', 'optimizeLegibility']] },
  { selector: 'h1, .dbk-h1', style: [['font-family', 'var(--font-sans)'], ['font-weight', '500'], ['font-size', 'var(--t-display-lg)'], ['line-height', 'var(--lh-tight)'], ['letter-spacing', 'var(--tr-tight)'], ['margin', '0']] },
  { selector: 'h2, .dbk-h2', style: [['font-weight', '500'], ['font-size', 'var(--t-h1)'], ['line-height', 'var(--lh-snug)'], ['letter-spacing', 'var(--tr-tight)'], ['margin', '0']] },
  { selector: 'h3, .dbk-h3', style: [['font-weight', '500'], ['font-size', 'var(--t-h2)'], ['line-height', 'var(--lh-snug)'], ['letter-spacing', 'var(--tr-tight)'], ['margin', '0']] },
  { selector: 'h4, .dbk-h4', style: [['font-weight', '500'], ['font-size', 'var(--t-h3)'], ['line-height', 'var(--lh-snug)'], ['letter-spacing', 'var(--tr-normal)'], ['margin', '0']] },
  { selector: 'p, .dbk-body', style: [['font-size', 'var(--t-body)'], ['line-height', 'var(--lh-normal)'], ['letter-spacing', 'var(--tr-normal)'], ['margin', '0']] },
  { selector: '.dbk-body-sm', style: [['font-size', 'var(--t-body-sm)'], ['line-height', 'var(--lh-normal)'], ['letter-spacing', 'var(--tr-normal)']] },
  { selector: '.dbk-caption', style: [['font-size', 'var(--t-caption)'], ['line-height', 'var(--lh-normal)'], ['letter-spacing', 'var(--tr-normal)'], ['color', 'var(--fg-tertiary)']] },
  { selector: '.dbk-micro', style: [['font-size', 'var(--t-micro)'], ['line-height', '1.2'], ['letter-spacing', 'var(--tr-loose)'], ['text-transform', 'uppercase'], ['color', 'var(--fg-regular)']] },
  { selector: '.dbk-mono', style: [['font-family', 'var(--font-mono)'], ['font-variant-numeric', 'tabular-nums']] },
  { selector: '.dbk-amount', style: [['font-family', 'var(--font-sans)'], ['font-weight', '500'], ['font-size', 'var(--t-display-lg)'], ['letter-spacing', 'var(--tr-tight)'], ['font-variant-numeric', 'tabular-nums']] },
];

export { elements, elementsNote };
