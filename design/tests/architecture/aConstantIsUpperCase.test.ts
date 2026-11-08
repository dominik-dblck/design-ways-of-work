/**
 * - `docs/rules/names.md`: a part's values are UPPER_SNAKE, its functions and an entry's API camelCase
 */
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { heldToItsBaseline } from './baseline.ts';
import { exportedValuesOf, syntaxOf } from './fileSyntax.ts';
import { isEntry, isSheet, productionSources } from './tree.ts';
import type { Source } from './tree.ts';

const UPPER = /^[A-Z][A-Z0-9_]*$/;
const CAMEL = /^[a-z][A-Za-z0-9]*$/;

const isFunction = (node: ts.Expression | undefined): boolean =>
  node !== undefined &&
  (ts.isArrowFunction(node) || ts.isFunctionExpression(node));

function partCases(source: Source): readonly string[] {
  return syntaxOf(source).statements.flatMap((statement) => {
    const exported =
      ts.canHaveModifiers(statement) &&
      (ts.getModifiers(statement) ?? []).some(
        (one) => one.kind === ts.SyntaxKind.ExportKeyword,
      );
    if (!exported) return [];
    if (ts.isFunctionDeclaration(statement))
      return CAMEL.test(statement.name?.text ?? '')
        ? []
        : [`${source.path} · ${statement.name?.text}`];
    if (!ts.isVariableStatement(statement)) return [];
    return statement.declarationList.declarations
      .filter(
        (one) =>
          ts.isIdentifier(one.name) &&
          !(isFunction(one.initializer) ? CAMEL : UPPER).test(one.name.text),
      )
      .map((one) => `${source.path} · ${one.name.getText()}`);
  });
}

function casesIn(source: Source): readonly string[] {
  if (!isSheet(source.path)) return [];
  if (!isEntry(source.path)) return partCases(source);
  return exportedValuesOf(source)
    .filter((name) => !CAMEL.test(name))
    .map((name) => `${source.path} · ${name}`);
}

describe('a constant is upper case', () => {
  it("a part's camel value and upper function, an entry's upper API name are found", () => {
    expect(
      casesIn({
        path: 'sheet/words/a/rows.ts',
        text: 'export const rows = [];\nexport const ROWS = [];\nexport const READ = () => 1;\nexport function readRows() {}',
      }),
    ).toEqual(['sheet/words/a/rows.ts · rows', 'sheet/words/a/rows.ts · READ']);
    expect(
      casesIn({
        path: 'sheet/words/a.ts',
        text: 'const ROWS = 1;\nconst byId = 2;\nexport { ROWS, byId, ROWS as rows };',
      }),
    ).toEqual(['sheet/words/a.ts · ROWS']);
  });

  it('no name beyond the baseline is in the wrong case', () => {
    expect(
      heldToItsBaseline(
        'aConstantIsUpperCase',
        productionSources().flatMap(casesIn),
      ),
    ).toEqual({ added: [], fixed: [] });
  });
});
