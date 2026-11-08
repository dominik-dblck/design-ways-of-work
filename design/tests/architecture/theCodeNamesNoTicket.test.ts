/**
 * - `docs/rules/names.md`: no ticket, date or epic in a name · a part's own epic aside
 */
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { heldToItsBaseline } from './baseline.ts';
import { syntaxOf } from './fileSyntax.ts';
import { epicOfFile, productionSources } from './tree.ts';
import type { Source } from './tree.ts';

const A_TICKET = /T_?E\d{2}_?\d{2}/i;
const AN_EPIC = /(?<![A-Za-z0-9])E\d{2}(?!\d)/;
const A_DATE = /\d{1,2}_?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/;

/** The names a file imports from a part named for an epic, each with that epic. */
function epicImportsOf(file: ts.SourceFile): ReadonlyMap<string, string> {
  const epics = new Map<string, string>();
  for (const statement of file.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const from = ts.isStringLiteral(statement.moduleSpecifier)
      ? epicOfFile(statement.moduleSpecifier.text)
      : null;
    const bindings = statement.importClause?.namedBindings;
    if (from === null || bindings === undefined || !ts.isNamedImports(bindings))
      continue;
    for (const element of bindings.elements) epics.set(element.name.text, from);
  }
  return epics;
}

function tracesIn(source: Source): readonly string[] {
  const own = epicOfFile(source.path);
  const file = syntaxOf(source);
  const imported = epicImportsOf(file);
  const found = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) {
      const name = node.text;
      const epic = AN_EPIC.exec(name)?.[0];
      if (
        A_TICKET.test(name) ||
        A_DATE.test(name) ||
        (epic !== undefined && epic !== own && epic !== imported.get(name))
      )
        found.add(`${source.path} · ${name}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return [...found];
}

describe('the code names no ticket', () => {
  it('a ticket, a date and another epic in an identifier are found; a part keeps its own epic', () => {
    expect(
      tracesIn({
        path: 'roadmaps/receipts/E04Run.ts',
        text: 'const E04_RUN_RECEIPTS = 1;\nconst TE0113_ROWS = 2;\nconst seenOn18Sep = 3;\nconst E05_ROWS = 4;\nconst words = "T-E01-13 E06 18 Sep";',
      }),
    ).toEqual([
      'roadmaps/receipts/E04Run.ts · TE0113_ROWS',
      'roadmaps/receipts/E04Run.ts · seenOn18Sep',
      'roadmaps/receipts/E04Run.ts · E05_ROWS',
    ]);
  });

  it('a name imported from a part named for its epic keeps that epic', () => {
    expect(
      tracesIn({
        path: 'roadmaps/receipts.ts',
        text: "import { E04_RUN_RECEIPTS } from './receipts/E04Run.ts';\nimport { E05_ROWS } from './receipts/rows.ts';\nconst all = [E04_RUN_RECEIPTS, E05_ROWS];",
      }),
    ).toEqual(['roadmaps/receipts.ts · E05_ROWS']);
  });

  it('no identifier beyond the baseline names a ticket, a date or another epic', () => {
    expect(
      heldToItsBaseline(
        'theCodeNamesNoTicket',
        productionSources().flatMap(tracesIn),
      ),
    ).toEqual({
      added: [],
      fixed: [],
    });
  });
});
