/**
 * - `dataIsReadonly` · a type's fields and lists are readonly, an export's type too
 * - a type a scan fills as it runs is named by its repository: mutable by design
 */
import ts from 'typescript';
import { createRule, syntaxOf } from './ruleKit.ts';

const MUTABLE_KINDS = new Set(['Record', 'Map', 'Set', 'Array']);
// a utility type passes its argument's readonly on: `Readonly<Partial<Record<K, V>>>`
const SEE_THROUGH = new Set([
  'Partial',
  'Required',
  'Pick',
  'Omit',
  'NonNullable',
]);

const isAReference = (node: ts.Node, names: ReadonlySet<string>): boolean =>
  ts.isTypeReferenceNode(node) && names.has(node.typeName.getText());

const READONLY = new Set(['Readonly']);

function isWrappedReadonly(node: ts.Node): boolean {
  let outer = node.parent;
  while (isAReference(outer, SEE_THROUGH)) outer = outer.parent;
  return isAReference(outer, READONLY);
}

// a rest in a readonly tuple is the tuple's: `readonly [T, ...T[]]`
const isReadonlyOperand = (node: ts.Node): boolean => {
  const held = ts.isRestTypeNode(node.parent) ? node.parent.parent : node;
  return (
    ts.isTypeOperatorNode(held.parent) &&
    held.parent.operator === ts.SyntaxKind.ReadonlyKeyword
  );
};

const isWritable = (node: ts.Node): boolean =>
  (ts.isPropertySignature(node) &&
    !(ts.getModifiers(node) ?? []).some(
      (one) => one.kind === ts.SyntaxKind.ReadonlyKeyword,
    )) ||
  ((ts.isArrayTypeNode(node) || ts.isTupleTypeNode(node)) &&
    !isReadonlyOperand(node)) ||
  (isAReference(node, MUTABLE_KINDS) && !isWrappedReadonly(node));

function writablesIn(node: ts.Node): readonly ts.Node[] {
  const found: ts.Node[] = isWritable(node) ? [node] : [];
  ts.forEachChild(node, (child) => void found.push(...writablesIn(child)));
  return found;
}

const isExported = (statement: ts.Statement): boolean =>
  ts.canHaveModifiers(statement) &&
  (ts.getModifiers(statement) ?? []).some(
    (one) => one.kind === ts.SyntaxKind.ExportKeyword,
  );

type Owned = readonly [string, ts.Node];

// each type the rule reads, with its name: a type, or an exported value's type
function typesOf(file: ts.SourceFile): readonly Owned[] {
  return file.statements.flatMap((statement): readonly Owned[] => {
    if (
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement)
    )
      return [[statement.name.text, statement]];
    if (!ts.isVariableStatement(statement) || !isExported(statement)) return [];
    return statement.declarationList.declarations.flatMap((one) =>
      one.type === undefined ? [] : [[one.name.getText(), one.type]],
    );
  });
}

const dataIsReadonly = createRule<
  [{ readonly mutable: readonly string[] }],
  'writable'
>({
  name: 'data-is-readonly',
  meta: {
    type: 'suggestion',
    docs: { description: "A type's fields and lists are readonly" },
    messages: {
      writable:
        '`{{what}}` in `{{owner}}` is writable: data nobody mutates is readonly (docs/rules/types.md).',
    },
    schema: [
      {
        type: 'object',
        properties: { mutable: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ mutable: [] }],
  create(context, [{ mutable }]) {
    return {
      Program() {
        const file = syntaxOf(context);
        for (const [owner, type] of typesOf(file))
          if (!mutable.includes(owner))
            for (const node of writablesIn(type))
              context.report({
                loc: {
                  start: context.sourceCode.getLocFromIndex(
                    node.getStart(file),
                  ),
                  end: context.sourceCode.getLocFromIndex(node.getEnd()),
                },
                messageId: 'writable',
                data: { owner, what: node.getText(file).split('\n')[0] ?? '' },
              });
      },
    };
  },
});

export { dataIsReadonly };
