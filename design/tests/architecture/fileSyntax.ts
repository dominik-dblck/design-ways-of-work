/**
 * - `A_HEADER`, `bulletsOf` · a file's opening bullets, as `aFileStatesItsJob` reads them
 * - `syntaxOf`, `exportedValuesOf`, `exportedNamesOf` · a source's tree and what it exports
 */
import ts from 'typescript';
import type { Source } from './tree.ts';

export const A_HEADER = /^\/\*\*\n((?:[^*]|\*(?!\/))*)\*\//;
const A_BULLET = /^\s*\*\s+-\s+(.+)$/;

/** The header's bullets · null when the file opens with none, or with a line that is no bullet. */
export function bulletsOf(text: string): readonly string[] | null {
  const block = A_HEADER.exec(text.trimStart())?.[1];
  if (block === undefined) return null;
  const lines = block
    .split('\n')
    .filter((line) => line.replace(/^\s*\*?\s*/, '') !== '');
  const bullets = lines.map((line) => A_BULLET.exec(line)?.[1]);
  return bullets.every((bullet) => bullet !== undefined)
    ? bullets.flatMap((one) => one ?? [])
    : null;
}

export const syntaxOf = (source: Source): ts.SourceFile =>
  ts.createSourceFile(source.path, source.text, ts.ScriptTarget.Latest, true);

const exported = (node: ts.Node): boolean =>
  ts.canHaveModifiers(node) &&
  (ts.getModifiers(node) ?? []).some(
    (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
  );

function namesOfStatement(
  statement: ts.Statement,
  withTypes: boolean,
): readonly string[] {
  if (ts.isVariableStatement(statement) && exported(statement))
    return statement.declarationList.declarations.flatMap((declaration) =>
      ts.isIdentifier(declaration.name) ? [declaration.name.text] : [],
    );
  if (
    (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) &&
    exported(statement)
  )
    return statement.name === undefined ? ['default'] : [statement.name.text];
  if (
    withTypes &&
    (ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement)) &&
    exported(statement)
  )
    return [statement.name.text];
  if (ts.isExportDeclaration(statement) && statement.exportClause) {
    if (!ts.isNamedExports(statement.exportClause)) return [];
    if (statement.isTypeOnly && !withTypes) return [];
    return statement.exportClause.elements
      .filter((one) => withTypes || !one.isTypeOnly)
      .map((one) => one.name.text);
  }
  return [];
}

/** The values a file exports by name · types are the vocabulary, and are not counted. */
export const exportedValuesOf = (source: Source): readonly string[] =>
  syntaxOf(source).statements.flatMap((one) => namesOfStatement(one, false));

/** Every name a file exports, its types too. */
export const exportedNamesOf = (source: Source): readonly string[] =>
  syntaxOf(source).statements.flatMap((one) => namesOfStatement(one, true));
