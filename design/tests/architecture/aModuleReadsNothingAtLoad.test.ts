/**
 * - `docs/rules/functions.md`: a sheet module's top level declares; it reads no global and acts on nothing (D14)
 * - a read inside a function, a type or a property's name is no read at load; a file open on the sheet is named
 */
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { isSheet, productionSources } from './tree.ts';
import type { Source } from './tree.ts';

const OUTSIDE = new Set([
  'globalThis',
  'window',
  'document',
  'self',
  'localStorage',
  'location',
  'navigator',
]);

// the files open on the sheet, each the finding that holds it · a file leaves the list when fixed
const OPEN: readonly (readonly [string, string])[] = [];

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

// what a top-level statement reads outside the module, or does, as `line · what`
function atLoad(node: ts.Node, file: ts.SourceFile): readonly string[] {
  if (isLater(node)) return [];
  const line = file.getLineAndCharacterOfPosition(node.getStart()).line + 1;
  const own =
    ts.isIdentifier(node) && OUTSIDE.has(node.text) && !isAName(node)
      ? [`${line} · reads ${node.text}`]
      : [];
  const children: ts.Node[] = [];
  ts.forEachChild(node, (child) => void children.push(child));
  return [...own, ...children.flatMap((child) => atLoad(child, file))];
}

function loadReadsIn(source: Source): readonly string[] {
  const file = ts.createSourceFile(
    source.path,
    source.text,
    ts.ScriptTarget.Latest,
    true,
  );
  return file.statements.flatMap((statement) =>
    ts.isExpressionStatement(statement)
      ? [
          `${file.getLineAndCharacterOfPosition(statement.getStart()).line + 1} · acts`,
        ]
      : atLoad(statement, file),
  );
}

describe('a module reads nothing at load', () => {
  it('the scan sees a global read and a statement at load; a function, a type and a key pass', () => {
    expect(
      loadReadsIn({
        path: 'sheet/planted.ts',
        text: [
          'const edges = globalThis.Edges;',
          'type Flow = typeof globalThis.DeliveryFlow;',
          'const later = () => globalThis.Edges;',
          "const keys = { document: 'Document', window: 'in a window' };",
          'globalThis.Planted = {};',
        ].join('\n'),
      }),
    ).toEqual(['1 · reads globalThis', '5 · acts']);
  });

  it('no sheet module reads a global or acts at load but the files open on the sheet', () => {
    const open = new Set(OPEN.map(([file]) => file));
    const found = productionSources()
      .filter((source) => isSheet(source.path))
      .filter((source) => loadReadsIn(source).length > 0)
      .map((source) => source.path);
    expect(found.filter((file) => !open.has(file))).toEqual([]);
    expect([...open].filter((file) => !found.includes(file))).toEqual([]);
  });
});
