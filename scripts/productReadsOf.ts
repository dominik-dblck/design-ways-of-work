/**
 * - `productReads` · each import of a home's file that lands on a product's file
 * - `homeReads` · each that lands on a home's file, at the path a product holds it
 * - `Read` · the reader, the file read, the values and the types read by name
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { HOMES } from '../shared/take/takeHomes.ts';

interface Read {
  // the reader, at the path a product holds it
  readonly reader: string;
  // the file it reads, at a product's path: the product's own, or a home's
  readonly file: string;
  readonly values: readonly string[];
  readonly types: readonly string[];
}

type Names = Pick<Read, 'values' | 'types'>;

const SOURCE = /\.(ts|tsx)$/;
const RELATIVE = /^\.{1,2}\//;

const sourcesUnder = (folder: string): readonly string[] =>
  fs
    .readdirSync(folder, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && SOURCE.test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name));

// a product's path as a home holds it here, when one does
function isHeld(root: string, productPath: string): boolean {
  const candidates = Object.entries(HOMES)
    .filter(
      ([, at]) =>
        at === '' || productPath === at || productPath.startsWith(`${at}/`),
    )
    .map(([home, at]) => path.join(root, home, productPath.slice(at.length)));
  return candidates.some((file) =>
    [file, `${file}.ts`, `${file}.tsx`, path.join(file, 'index.ts')].some(
      (one) => fs.existsSync(one) && fs.statSync(one).isFile(),
    ),
  );
}

// the names read off a namespace import: `NAME.x` in code, `NAME.X` in a type
function namesOff(source: ts.SourceFile, name: string): readonly string[] {
  const found = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (
      ts.isPropertyAccessExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === name
    )
      found.add(node.name.text);
    if (
      ts.isQualifiedName(node) &&
      ts.isIdentifier(node.left) &&
      node.left.text === name
    )
      found.add(node.right.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return [...found];
}

const asTypes = (names: readonly string[], isType: boolean): Names =>
  isType ? { values: [], types: names } : { values: names, types: [] };

// a re-export reads what it names, or all of the file
const namesReExported = (statement: ts.ExportDeclaration): Names =>
  asTypes(
    statement.exportClause && ts.isNamedExports(statement.exportClause)
      ? statement.exportClause.elements.map(
          (one) => (one.propertyName ?? one.name).text,
        )
      : ['*'],
    statement.isTypeOnly,
  );

function namesImported(
  source: ts.SourceFile,
  { importClause: clause }: ts.ImportDeclaration,
): Names {
  if (clause === undefined) return { values: [], types: [] };
  const isType = clause.phaseModifier === ts.SyntaxKind.TypeKeyword;
  const bindings = clause.namedBindings;
  if (bindings !== undefined && ts.isNamespaceImport(bindings))
    return asTypes(namesOff(source, bindings.name.text), isType);
  const elements = bindings === undefined ? [] : bindings.elements;
  const named = (wanted: boolean): readonly string[] =>
    elements
      .filter((one) => (isType || one.isTypeOnly) === wanted)
      .map((one) => (one.propertyName ?? one.name).text);
  return {
    values: [...(clause.name && !isType ? ['default'] : []), ...named(false)],
    types: named(true),
  };
}

interface Held {
  readonly root: string;
  // a home's file here, and the path a product holds it at
  readonly file: string;
  readonly reader: string;
  // the reads wanted: those of a home's files, or those of a product's
  readonly ofHomes: boolean;
}

function readsOf({ root, file, reader, ofHomes }: Held): readonly Read[] {
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
  return source.statements.flatMap((statement) => {
    const isImport = ts.isImportDeclaration(statement);
    if (!isImport && !ts.isExportDeclaration(statement)) return [];
    const specifier = statement.moduleSpecifier;
    if (specifier === undefined || !ts.isStringLiteral(specifier)) return [];
    if (!RELATIVE.test(specifier.text)) return [];
    const target = path.normalize(
      path.join(path.dirname(reader), specifier.text),
    );
    if (target.startsWith('..') || isHeld(root, target) !== ofHomes) return [];
    const names = isImport
      ? namesImported(source, statement)
      : namesReExported(statement);
    return [{ reader, file: target, ...names }];
  });
}

// every home of the way of working at `root`, each file read at the path it lands on in a product
const readsIn = (root: string, ofHomes: boolean): readonly Read[] =>
  Object.entries(HOMES).flatMap(([home, at]) =>
    sourcesUnder(path.join(root, home)).flatMap((file) =>
      readsOf({
        root,
        file,
        reader: path.join(at, path.relative(path.join(root, home), file)),
        ofHomes,
      }),
    ),
  );

const productReads = (root: string): readonly Read[] => readsIn(root, false);

const homeReads = (root: string): readonly Read[] => readsIn(root, true);

export { homeReads, productReads };
export type { Read };
