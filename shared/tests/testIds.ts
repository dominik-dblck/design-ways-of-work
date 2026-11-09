/**
 * - `literalIdsIn`, `unregisteredIn` · an id spelled in place; one not the registry's
 * - `conditionalExportsIn` · a registry export one build holds and another not
 */
import path from 'node:path';
import ts from 'typescript';
import { isNamedBy } from './globs.ts';

const TEST_ID = 'data-testid';
const FORWARDED = 'testId';

interface Source {
  readonly file: string;
  readonly text: string;
}

// what a component's ids are read against: the tier's paths, and a file beside it by its path
interface Registry {
  readonly registry: string;
  readonly componentRoots: readonly string[];
  readonly sibling: (file: string) => string | undefined;
}

const syntaxOf = ({ file, text }: Source): ts.SourceFile =>
  ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

const nodesIn = (node: ts.Node, file: ts.SourceFile): readonly ts.Node[] => [
  node,
  ...node.getChildren(file).flatMap((child) => nodesIn(child, file)),
];

const idsIn = (file: ts.SourceFile): readonly ts.JsxAttribute[] =>
  nodesIn(file, file)
    .filter(ts.isJsxAttribute)
    .filter((one) => one.name.getText(file) === TEST_ID);

// the value an id is given: `="…"` is a string, `={…}` its expression
const valueOf = (one: ts.JsxAttribute): ts.Expression | undefined => {
  const given = one.initializer;
  if (given === undefined) return undefined;
  return ts.isJsxExpression(given) ? given.expression : given;
};

const isSpelled = (given: ts.Expression | undefined): boolean =>
  given !== undefined &&
  (ts.isStringLiteral(given) || ts.isTemplateLiteral(given));

const lineOf = (node: ts.Node, file: ts.SourceFile): number =>
  file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;

const literalIdsIn = (source: Source): readonly string[] => {
  const file = syntaxOf(source);
  return idsIn(file)
    .filter((one) => isSpelled(valueOf(one)))
    .map((one) => `${source.file}:${lineOf(one, file)}`);
};

// the names an expression starts from: `ids.row.cell` is `ids`'s, a choice its two branches'
function rootsOf(reached: ts.Expression): readonly string[] {
  if (ts.isIdentifier(reached)) return [reached.text];
  if (ts.isConditionalExpression(reached))
    return [...rootsOf(reached.whenTrue), ...rootsOf(reached.whenFalse)];
  if (
    ts.isPropertyAccessExpression(reached) ||
    ts.isElementAccessExpression(reached) ||
    ts.isCallExpression(reached) ||
    ts.isParenthesizedExpression(reached)
  )
    return rootsOf(reached.expression);
  return [reached.getText()];
}

const importedFrom = (
  file: ts.SourceFile,
  registry: string,
): readonly string[] =>
  file.statements
    .filter(ts.isImportDeclaration)
    .filter(
      ({ moduleSpecifier }) =>
        ts.isStringLiteral(moduleSpecifier) &&
        moduleSpecifier.text.includes(`${registry}/`),
    )
    .flatMap(({ importClause }) => {
      const bindings = importClause?.namedBindings;
      return bindings !== undefined && ts.isNamedImports(bindings)
        ? bindings.elements.map((one) => one.name.text)
        : [];
    });

// the folder a component owns: the nearest a root names, else the file's own
function componentRootOf(file: string, roots: readonly string[]): string {
  const folders = path.posix
    .dirname(file)
    .split('/')
    .map((_, at, steps) => steps.slice(0, at + 1).join('/'));
  return (
    folders.find((one) => isNamedBy(one, roots)) ?? path.posix.dirname(file)
  );
}

const declaresIn = (source: Source): boolean => {
  const file = syntaxOf(source);
  return nodesIn(file, file).some(
    (node) =>
      ts.isPropertySignature(node) && node.name.getText(file) === FORWARDED,
  );
};

// its props declare `testId`: in the component, or in a file of the folder it owns
function forwardsAnId(source: Source, against: Registry): boolean {
  const root = componentRootOf(source.file, against.componentRoots);
  const near = ts
    .preProcessFile(source.text)
    .importedFiles.map(({ fileName }) => fileName)
    .filter((one) => one.startsWith('.'))
    .map(
      (one) =>
        `${path.posix.join(path.posix.dirname(source.file), one).replace(/\.tsx?$/, '')}.ts`,
    )
    .filter((one) => one.startsWith(`${root}/`));
  return [source.file, ...near].some((one) => {
    const text = one === source.file ? source.text : against.sibling(one);
    return text !== undefined && declaresIn({ file: one, text });
  });
}

const unregisteredIn = (
  source: Source,
  against: Registry,
): readonly string[] => {
  const file = syntaxOf(source);
  const known = new Set([
    ...importedFrom(file, against.registry),
    ...(forwardsAnId(source, against) ? [FORWARDED] : []),
  ]);
  return idsIn(file).flatMap((one) => {
    const given = valueOf(one);
    if (given === undefined || isSpelled(given)) return [];
    return rootsOf(given)
      .filter((root) => !known.has(root))
      .map((root) => `${source.file}:${lineOf(one, file)} · ${root}`);
  });
};

const conditionalExportsIn = (source: Source): readonly string[] => {
  const file = syntaxOf(source);
  return file.statements
    .filter(ts.isVariableStatement)
    .filter((one) =>
      (ts.getModifiers(one) ?? []).some(
        ({ kind }) => kind === ts.SyntaxKind.ExportKeyword,
      ),
    )
    .flatMap(({ declarationList }) => declarationList.declarations)
    .filter(
      ({ initializer }) =>
        initializer !== undefined &&
        nodesIn(initializer, file).some(ts.isConditionalExpression),
    )
    .map(({ name }) => `${source.file} · ${name.getText(file)}`);
};

export { conditionalExportsIn, literalIdsIn, unregisteredIn };
