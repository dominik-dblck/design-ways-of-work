/**
 * - `componentFileHoldsItsComponent` · one component a file, and beside it its props
 * - read under each of the scope's component roots; a provider's and an icon's aside
 */
import path from 'node:path';
import ts from 'typescript';
import { createRule, pathOf, syntaxOf } from './ruleKit.ts';

type Options = readonly [{ readonly components: readonly string[] }];

// PascalCase, never SCREAMING_CASE: `Row` is a component's name, `SORT` a constant's
const A_COMPONENT_NAME = /^[A-Z](?![A-Z\d_]*$)/;
const A_WRAPPER = /^(?:React\.)?(?:forwardRef|memo|lazy)$|^dynamic$/;
const RULES = 'docs/rules/components.md';

// a component's own value: a function, or a wrapped or lazy one
const isAComponentValue = (initializer: ts.Expression | undefined): boolean =>
  initializer !== undefined &&
  (ts.isArrowFunction(initializer) ||
    ts.isFunctionExpression(initializer) ||
    (ts.isCallExpression(initializer) &&
      A_WRAPPER.test(initializer.expression.getText())));

// the components a top-level statement declares, by name
function componentsIn(statement: ts.Statement): readonly ts.Identifier[] {
  // an overload's signature has no body: its implementation is the one component
  if (ts.isFunctionDeclaration(statement))
    return statement.name !== undefined &&
      statement.body !== undefined &&
      A_COMPONENT_NAME.test(statement.name.text)
      ? [statement.name]
      : [];
  if (!ts.isVariableStatement(statement)) return [];
  return statement.declarationList.declarations.flatMap((one) =>
    ts.isIdentifier(one.name) &&
    A_COMPONENT_NAME.test(one.name.text) &&
    isAComponentValue(one.initializer)
      ? [one.name]
      : [],
  );
}

// what a top-level statement declares, imports, export lists and directives aside
function declaredIn(statement: ts.Statement): readonly ts.Node[] {
  if (ts.isVariableStatement(statement))
    return statement.declarationList.declarations.map((one) => one.name);
  return (ts.isFunctionDeclaration(statement) ||
    ts.isClassDeclaration(statement) ||
    ts.isInterfaceDeclaration(statement) ||
    ts.isTypeAliasDeclaration(statement) ||
    ts.isEnumDeclaration(statement) ||
    ts.isModuleDeclaration(statement)) &&
    statement.name !== undefined
    ? [statement.name]
    : [];
}

// a file named for its component holds it alone; a provider and an icon hold more
const isNamedForItsComponent = (file: string, root: string): boolean =>
  /^[A-Z]/.test(path.posix.basename(file, '.tsx')) &&
  !file.split('/').includes('providers') &&
  !file.startsWith(`${root}/icons/`);

// the breaches of one file: each component past its own, each name beside them
function breachesIn(
  syntax: ts.SourceFile,
  {
    component,
    isNamed,
  }: { readonly component: string; readonly isNamed: boolean },
): readonly (readonly [ts.Node, 'two' | 'beside'])[] {
  const found = syntax.statements.flatMap(componentsIn);
  const kept = found.find((one) => one.text === component) ?? found[0];
  const extra = found.filter((one) => one !== kept);
  const own = new Set([component, `${component}Props`]);
  // a name declared twice, as overloads are, is one breach at its first
  const beside = isNamed
    ? syntax.statements
        .flatMap(declaredIn)
        .filter((one) => !own.has(one.getText(syntax)))
        .filter((one) => !extra.some((other) => other === one))
        .filter(
          (one, at, all) =>
            all.findIndex(
              (other) => other.getText(syntax) === one.getText(syntax),
            ) === at,
        )
    : [];
  return [
    ...extra.map((one) => [one, 'two'] as const),
    ...beside.map((one) => [one, 'beside'] as const),
  ];
}

const componentFileHoldsItsComponent = createRule<Options, 'two' | 'beside'>({
  name: 'component-file-holds-its-component',
  meta: {
    type: 'problem',
    docs: {
      description: 'A component file holds one component and its props type',
    },
    messages: {
      two: `\`{{name}}\` is a second component in this file: one component a file, a part goes to \`components/\` (${RULES}).`,
      beside: `\`{{name}}\` sits beside \`{{component}}\`: a type goes to \`types/\`, a helper to \`utils/\`, a constant to \`constants/\`, a hook to \`hooks/\` (${RULES}).`,
    },
    schema: [
      {
        type: 'object',
        properties: {
          components: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ components: [] }],
  create(context, [{ components }]) {
    const file = pathOf(context);
    const root = components.find((one) => file.startsWith(`${one}/`));
    if (root === undefined || !file.endsWith('.tsx')) return {};
    const component = path.posix.basename(file, '.tsx');
    const isNamed = isNamedForItsComponent(file, root);
    return {
      Program() {
        const syntax = syntaxOf(context);
        // each breach lands on the name that breaks it
        for (const [node, messageId] of breachesIn(syntax, {
          component,
          isNamed,
        })) {
          const start = context.sourceCode.getLocFromIndex(
            node.getStart(syntax),
          );
          context.report({
            loc: { start, end: start },
            messageId,
            data: { name: node.getText(syntax), component },
          });
        }
      },
    };
  },
});

export { componentFileHoldsItsComponent };
