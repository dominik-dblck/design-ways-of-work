/**
 * - `readsNothingAtLoad` · a module's top level declares: no global read, no act
 * - a read in a function, a type or a property's name is no read at load
 */
import ts from 'typescript';
import { createRule, syntaxOf } from './ruleKit.ts';

const OUTSIDE = new Set([
  'globalThis',
  'window',
  'document',
  'self',
  'localStorage',
  'location',
  'navigator',
  'process',
]);

// a directive (`'use client';`) is the prologue, read by the bundler, never an act
const isADirective = (statement: ts.Statement): boolean =>
  ts.isExpressionStatement(statement) &&
  ts.isStringLiteral(statement.expression);

const isAName = (node: ts.Identifier): boolean =>
  (ts.isPropertyAssignment(node.parent) && node.parent.name === node) ||
  (ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) ||
  ts.isExportSpecifier(node.parent) ||
  ts.isShorthandPropertyAssignment(node.parent);

const isLater = (node: ts.Node): boolean =>
  ts.isFunctionLike(node) ||
  ts.isTypeNode(node) ||
  ts.isTypeAliasDeclaration(node) ||
  ts.isInterfaceDeclaration(node);

function readsIn(node: ts.Node): readonly ts.Identifier[] {
  if (isLater(node)) return [];
  const own =
    ts.isIdentifier(node) && OUTSIDE.has(node.text) && !isAName(node)
      ? [node]
      : [];
  const children: ts.Node[] = [];
  ts.forEachChild(node, (child) => void children.push(child));
  return [...own, ...children.flatMap(readsIn)];
}

const readsNothingAtLoad = createRule({
  name: 'reads-nothing-at-load',
  meta: {
    type: 'problem',
    docs: {
      description: "A module's top level reads no global and acts on nothing",
    },
    messages: {
      reads:
        "`{{name}}` is read at load: a module's top level declares (docs/rules/functions.md).",
      acts: "A statement runs at load: a module's top level declares (docs/rules/functions.md).",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const at = (file: ts.SourceFile, node: ts.Node) => ({
      start: context.sourceCode.getLocFromIndex(node.getStart(file)),
      end: context.sourceCode.getLocFromIndex(node.getEnd()),
    });
    return {
      Program() {
        const file = syntaxOf(context);
        const prologue = file.statements.findIndex((one) => !isADirective(one));
        for (const statement of file.statements.slice(Math.max(prologue, 0)))
          if (ts.isExpressionStatement(statement))
            context.report({ loc: at(file, statement), messageId: 'acts' });
          else
            for (const read of readsIn(statement))
              context.report({
                loc: at(file, read),
                messageId: 'reads',
                data: { name: read.text },
              });
      },
    };
  },
});

export { readsNothingAtLoad };
