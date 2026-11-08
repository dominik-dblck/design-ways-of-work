/**
 * - `docs/rules/types.md`: a type's fields and lists are readonly, an exported value's type too
 */
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { heldToItsBaseline } from './baseline.ts';
import { syntaxOf } from './fileSyntax.ts';
import { productionSources } from './tree.ts';
import type { Source } from './tree.ts';

// a tally a scan fills as it runs, mutated by design
const MUTABLE_BY_DESIGN: Readonly<Record<string, readonly string[]>> = {
  'guards/ds-scan.ts': ['Tally'],
  'guards/ds-scan/dsScanTypes.ts': ['Drift', 'ScanCounts'],
  'guards/expected-files/packReads.ts': ['EndpointFacts'],
  'sheet/samples/payloads/payloadsTypes.ts': ['WalkState'],
  'sheet/logic/approval/role-combinations/combinationRows.ts': ['ClassTally'],
  'sheet/screens/screen-view/screenViewTypes.ts': ['Gaps'],
  'guards/checks/checkWorld.ts': ['World'],
};

const MUTABLE_KINDS = new Set(['Record', 'Map', 'Set']);

function writableIn(node: ts.Node, owner: string, found: Set<string>): void {
  if (
    ts.isPropertySignature(node) &&
    !(ts.getModifiers(node) ?? []).some(
      (one) => one.kind === ts.SyntaxKind.ReadonlyKeyword,
    )
  )
    found.add(`${owner} · ${node.name.getText()}`);
  if (
    (ts.isArrayTypeNode(node) || ts.isTupleTypeNode(node)) &&
    !(
      ts.isTypeOperatorNode(node.parent) &&
      node.parent.operator === ts.SyntaxKind.ReadonlyKeyword
    )
  )
    found.add(`${owner} · ${node.getText()}`);
  if (
    ts.isTypeReferenceNode(node) &&
    MUTABLE_KINDS.has(node.typeName.getText())
  ) {
    const wrapped =
      ts.isTypeReferenceNode(node.parent) &&
      node.parent.typeName.getText() === 'Readonly';
    if (!wrapped) found.add(`${owner} · ${node.getText()}`);
  }
  ts.forEachChild(node, (child) => writableIn(child, owner, found));
}

function writablesIn(source: Source): readonly string[] {
  const allowed = MUTABLE_BY_DESIGN[source.path] ?? [];
  const found = new Set<string>();
  for (const statement of syntaxOf(source).statements) {
    if (
      (ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement)) &&
      !allowed.includes(statement.name.text)
    )
      writableIn(statement, `${source.path} · ${statement.name.text}`, found);
    const exported =
      ts.canHaveModifiers(statement) &&
      (ts.getModifiers(statement) ?? []).some(
        (one) => one.kind === ts.SyntaxKind.ExportKeyword,
      );
    if (ts.isVariableStatement(statement) && exported)
      for (const declaration of statement.declarationList.declarations)
        if (declaration.type)
          writableIn(
            declaration.type,
            `${source.path} · ${declaration.name.getText()}`,
            found,
          );
  }
  return [...found];
}

describe('data is readonly', () => {
  it('a writable field, a writable list and a bare Record are found; their readonly forms pass', () => {
    expect(
      writablesIn({
        path: 'sheet/words/a/aTypes.ts',
        text: [
          'interface Row { readonly id: string; note: string; readonly tags: string[] }',
          'type Pair = readonly [string, number];',
          'export const TABLE: Record<string, readonly string[]> = {};',
          'export const KEPT: Readonly<Record<string, readonly Row[]>> = {};',
        ].join('\n'),
      }),
    ).toEqual([
      'sheet/words/a/aTypes.ts · Row · note',
      'sheet/words/a/aTypes.ts · Row · string[]',
      'sheet/words/a/aTypes.ts · TABLE · Record<string, readonly string[]>',
    ]);
  });

  it('no type beyond the baseline holds writable data', () => {
    expect(
      heldToItsBaseline(
        'dataIsReadonly',
        productionSources().flatMap(writablesIn),
      ),
    ).toEqual({ added: [], fixed: [] });
  });
});
