/**
 * - `PRODUCTION_SHAPES` · production's own shapes: a test switch, a loose schema
 * - `WORDS_SHAPE`, `BRAND_SHAPE` · a words table, a brand: outside their homes
 */
import type { Shape } from './shapes.ts';

const PRODUCTION_SHAPES: readonly Shape[] = [
  {
    selector: [
      'Identifier[name=/^(?:E2E_[A-Z0-9_]+|__E2E\\w*)$/]',
      'Literal[value=/\\bE2E_[A-Z0-9_]+\\b/]',
      'TemplateElement[value.raw=/\\bE2E_[A-Z0-9_]+\\b/]',
      "MemberExpression[computed=true][object.property.name='env'][object.object.name='process'] > Literal.property[value=/e2e/i]",
    ].join(', '),
    message:
      'Production reads no test switch: an `E2E_…` name or env is a test’s own (docs/rules/tests.md).',
  },
  {
    // a test reads part of an answer with a loose schema: production alone is held
    selector: [
      "CallExpression[callee.object.name='z'][callee.property.name=/^(?:object|looseObject)$/]",
      'CallExpression[callee.property.name=/^(?:passthrough|loose)$/]',
    ].join(', '),
    message:
      'A schema is strict at every depth: `z.strictObject`, never `z.object`, `z.looseObject`, `.loose()` nor `.passthrough()` (docs/rules/types.md).',
  },
];

const WORDS_SHAPE: Shape = {
  // where a table is declared is weighed: an entry passes another file's words on
  selector:
    'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.name=/_WORDS$/]',
  message:
    'A table of words (`…_WORDS`) is declared in a words file (`{name}Words.ts`), never elsewhere (docs/rules/constants.md).',
};

const BRAND_SHAPE: Shape = {
  selector: "CallExpression[callee.property.name='brand']",
  message:
    'A brand is declared in its home, the one place `.brand()` is called (docs/rules/types.md).',
};

export { BRAND_SHAPE, PRODUCTION_SHAPES, WORDS_SHAPE };
