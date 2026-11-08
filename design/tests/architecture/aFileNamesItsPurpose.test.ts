/**
 * - `docs/rules/names.md`: an entry is kebab-case, a part camelCase or its epic, a types file types alone
 * - `docs/rules/size.md`: a split names each job, never a number
 */
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { heldToItsBaseline } from './baseline.ts';
import { syntaxOf } from './fileSyntax.ts';
import { isEntry, isSheet, productionSources } from './tree.ts';
import type { Source } from './tree.ts';

const DRAWERS = ['utils', 'helpers', 'common', 'shared', 'index'];
const AN_ENTRY = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const A_PART = /^(?:[a-z][A-Za-z0-9]*|E\d{2}[A-Za-z]*)$/;
const A_NUMBER = /(?:One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|[a-z]\d+)$/;

const isTypeOnly = (statement: ts.Statement): boolean =>
  ts.isInterfaceDeclaration(statement) ||
  ts.isTypeAliasDeclaration(statement) ||
  (ts.isImportDeclaration(statement) &&
    statement.importClause?.isTypeOnly === true) ||
  (ts.isExportDeclaration(statement) && statement.isTypeOnly);

function misnamed(source: Source): readonly string[] {
  if (!isSheet(source.path)) return [];
  const name = path.posix.basename(source.path, '.ts');
  const found: string[] = [];
  if (DRAWERS.includes(name)) found.push(`${source.path} · a drawer's name`);
  if (!(isEntry(source.path) ? AN_ENTRY : A_PART).test(name))
    found.push(
      `${source.path} · ${isEntry(source.path) ? 'an entry is kebab-case' : 'a part is camelCase or its epic'}`,
    );
  if (A_NUMBER.test(name)) found.push(`${source.path} · a part named by a number`);
  if (name.endsWith('Types') && !syntaxOf(source).statements.every(isTypeOnly))
    found.push(`${source.path} · a types file holds a value`);
  return found;
}

describe('a file names its purpose', () => {
  it('a drawer, a wrong case and a value in a types file are found', () => {
    expect(misnamed({ path: 'sheet/words/plans/utils.ts', text: '' })).toEqual([
      "sheet/words/plans/utils.ts · a drawer's name",
    ]);
    expect(misnamed({ path: 'sheet/words/Plans.ts', text: '' })).toEqual([
      'sheet/words/Plans.ts · an entry is kebab-case',
    ]);
    expect(
      misnamed({ path: 'sheet/words/plans/plan-pages.ts', text: '' }),
    ).toEqual([
      'sheet/words/plans/plan-pages.ts · a part is camelCase or its epic',
    ]);
    expect(
      misnamed({
        path: 'docs/process/plans/plansTypes.ts',
        text: 'export const A = 1;',
      }),
    ).toEqual([
      'docs/process/plans/plansTypes.ts · a types file holds a value',
    ]);
    expect(misnamed({ path: 'sheet/words/plans/rowsTwo.ts', text: '' })).toEqual([
      'sheet/words/plans/rowsTwo.ts · a part named by a number',
    ]);
    expect(misnamed({ path: 'roadmaps/receipts/E04Run.ts', text: '' })).toEqual(
      [],
    );
  });

  it('no file beyond the baseline misnames its purpose', () => {
    expect(
      heldToItsBaseline(
        'aFileNamesItsPurpose',
        productionSources().flatMap(misnamed),
      ),
    ).toEqual({ added: [], fixed: [] });
  });
});
