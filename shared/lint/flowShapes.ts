/**
 * - `FLOW_SHAPES` · what a flow refuses: an element reached but by its registry id
 */
import type { Shape } from './shapes.ts';

// Playwright's locators by what a person reads: a role, a text, a label, a placeholder
const BY_WHAT_IS_READ =
  'CallExpression[callee.property.name=/^getBy(?:Role|Text|Label|Placeholder)$/]';
// a css selector: `locator` handed a string or a template
const BY_CSS =
  "CallExpression[callee.property.name='locator']:matches([arguments.0.type='Literal'], [arguments.0.type='TemplateLiteral'])";

const FLOW_SHAPES: readonly Shape[] = [
  {
    selector: [BY_WHAT_IS_READ, BY_CSS].join(', '),
    message:
      'A flow reaches an element by its registry id, `getByTestId(ids.…)`, never by a role, a text, a label, a placeholder or a css selector: the registry is the one place a selector is spelled (shared/e2e/README.md).',
  },
];

export { FLOW_SHAPES };
