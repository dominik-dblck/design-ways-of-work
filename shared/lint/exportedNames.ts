/**
 * - `exportedNamesOf` · what a file exports by name, its types or its values alone
 * - `declaredNamesOf` · what it declares of them: a re-export declares nothing
 */
import ts from 'typescript';

const hasModifier = (node: ts.Node, kind: ts.SyntaxKind): boolean =>
  ts.canHaveModifiers(node) &&
  (ts.getModifiers(node) ?? []).some((modifier) => modifier.kind === kind);

const isExported = (node: ts.Node): boolean =>
  hasModifier(node, ts.SyntaxKind.ExportKeyword);

const isAType = (
  node: ts.Node,
): node is ts.InterfaceDeclaration | ts.TypeAliasDeclaration =>
  ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node);

// a statement's own declared names, each with the node a finding points at
function declarationsOf(statement: ts.Statement): readonly ts.Identifier[] {
  if (ts.isVariableStatement(statement))
    return statement.declarationList.declarations.flatMap((one) =>
      ts.isIdentifier(one.name) ? [one.name] : [],
    );
  if (
    ts.isFunctionDeclaration(statement) ||
    ts.isClassDeclaration(statement) ||
    ts.isEnumDeclaration(statement) ||
    isAType(statement)
  )
    return statement.name === undefined ? [] : [statement.name];
  return [];
}

const namedExportsOf = (
  statement: ts.Statement,
): readonly ts.ExportSpecifier[] =>
  ts.isExportDeclaration(statement) &&
  statement.exportClause !== undefined &&
  ts.isNamedExports(statement.exportClause)
    ? statement.exportClause.elements
    : [];

function namesOfStatement(
  statement: ts.Statement,
  types: boolean,
): readonly string[] {
  if (isExported(statement) && (types || !isAType(statement)))
    return hasModifier(statement, ts.SyntaxKind.DefaultKeyword)
      ? ['default']
      : declarationsOf(statement).map((name) => name.text);
  if (ts.isExportDeclaration(statement) && statement.isTypeOnly && !types)
    return [];
  return namedExportsOf(statement)
    .filter((one) => types || !one.isTypeOnly)
    .map((one) => one.name.text);
}

// without `types`, the values alone: the types are the vocabulary
const exportedNamesOf = (
  file: ts.SourceFile,
  { types }: { readonly types: boolean },
): readonly string[] =>
  file.statements.flatMap((one) => namesOfStatement(one, types));

// a re-export declares nothing; neither does a default, which has no name
function declaredNamesOf(file: ts.SourceFile): readonly ts.Identifier[] {
  const local = new Set(
    file.statements.flatMap((one) =>
      declarationsOf(one).map((name) => name.text),
    ),
  );
  return file.statements.flatMap((statement) => {
    if (hasModifier(statement, ts.SyntaxKind.DefaultKeyword)) return [];
    if (isExported(statement)) return declarationsOf(statement);
    if (ts.isExportDeclaration(statement) && statement.moduleSpecifier)
      return [];
    return namedExportsOf(statement)
      .filter((one) => local.has((one.propertyName ?? one.name).text))
      .flatMap((one) => (ts.isIdentifier(one.name) ? [one.name] : []));
  });
}

export { declaredNamesOf, exportedNamesOf };
