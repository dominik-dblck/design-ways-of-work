/**
 * - `declaredName`, `namesReadIn` · what a statement declares, what a node reads
 * - `boundIn`, `Bound` · the names a file's imports bind
 * - `statementOf`, `textOf` · the statement that declares a name, and its text
 */
import ts from 'typescript';

// a name an import binds: its module, and how it is imported
interface Bound {
  readonly local: string;
  readonly module: string;
  readonly imported: string;
  readonly isTypeOnly: boolean;
}

type Named =
  | ts.FunctionDeclaration
  | ts.ClassDeclaration
  | ts.InterfaceDeclaration
  | ts.TypeAliasDeclaration
  | ts.EnumDeclaration;

const isNamed = (statement: ts.Statement): statement is Named =>
  ts.isFunctionDeclaration(statement) ||
  ts.isClassDeclaration(statement) ||
  ts.isInterfaceDeclaration(statement) ||
  ts.isTypeAliasDeclaration(statement) ||
  ts.isEnumDeclaration(statement);

// the one name a top-level statement declares, if it declares one
function declaredName(statement: ts.Statement): string | null {
  if (isNamed(statement)) return statement.name?.text ?? null;
  const [only, ...more] = ts.isVariableStatement(statement)
    ? statement.declarationList.declarations
    : [];
  return only !== undefined && more.length === 0 && ts.isIdentifier(only.name)
    ? only.name.text
    : null;
}

const NAMING = [
  ts.isPropertyAccessExpression,
  ts.isPropertyAssignment,
  ts.isPropertySignature,
  ts.isMethodSignature,
  ts.isJsxAttribute,
];

// a property's own name is no read of a binding: `a.b`, `{ b: 1 }`, `<X b />`
function isAKey(node: ts.Identifier): boolean {
  const { parent } = node;
  if (ts.isBindingElement(parent)) return parent.propertyName === node;
  if (ts.isQualifiedName(parent)) return parent.right === node;
  return (
    NAMING.some((is) => is(parent)) && 'name' in parent && parent.name === node
  );
}

function namesReadIn(node: ts.Node): ReadonlySet<string> {
  const found = new Set<string>();
  const visit = (one: ts.Node): void => {
    if (ts.isIdentifier(one) && !isAKey(one)) found.add(one.text);
    ts.forEachChild(one, visit);
  };
  visit(node);
  return found;
}

// what one import binds: its default, its namespace, each of its names
function boundBy(one: ts.ImportDeclaration): readonly Bound[] {
  const module = ts.isStringLiteral(one.moduleSpecifier)
    ? one.moduleSpecifier.text
    : '';
  const clause = one.importClause;
  const isTypeOnly = clause?.isTypeOnly === true;
  const named = clause?.namedBindings;
  const as = (local: ts.Identifier, imported: string): Bound => ({
    local: local.text,
    module,
    imported,
    isTypeOnly,
  });
  return [
    ...(clause?.name === undefined ? [] : [as(clause.name, 'default')]),
    ...(named !== undefined && ts.isNamespaceImport(named)
      ? [as(named.name, 'namespace')]
      : []),
    ...(named !== undefined && ts.isNamedImports(named)
      ? named.elements.map((element) => ({
          ...as(element.name, element.propertyName?.text ?? element.name.text),
          isTypeOnly: isTypeOnly || element.isTypeOnly,
        }))
      : []),
  ];
}

const boundIn = (statements: readonly ts.Statement[]): readonly Bound[] =>
  statements.filter(ts.isImportDeclaration).flatMap(boundBy);

// a statement's text with the comment above it
const textOf = (syntax: ts.SourceFile, statement: ts.Statement): string =>
  syntax.text.slice(statement.getFullStart(), statement.getEnd()).trim();

// the statement a row moves, refused when it is missing or already exported
function statementOf(
  syntax: ts.SourceFile,
  row: { readonly file: string; readonly name: string },
): ts.Statement {
  const statement = syntax.statements.find(
    (one) => declaredName(one) === row.name,
  );
  if (statement === undefined)
    throw new Error(`${row.file} · no top-level ${row.name}`);
  if (
    ts.canHaveModifiers(statement) &&
    ts
      .getModifiers(statement)
      ?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword) === true
  )
    throw new Error(`${row.file} · ${row.name} is exported: its readers move`);
  return statement;
}

export { boundIn, declaredName, namesReadIn, statementOf, textOf };
export type { Bound };
