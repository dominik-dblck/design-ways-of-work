/**
 * - `moleculesComposeOneMolecule` · a molecule composes atoms and one molecule
 * - counted over its folder, tests aside: one that composes two is an organism
 */
import type { TSESTree } from '@typescript-eslint/utils';
import ts from 'typescript';
import { createRule, matchesAny, moduleOf, pathOf } from './ruleKit.ts';
import type { Context } from './ruleKit.ts';

// a file of the folder, or the folder itself as an import names it
const A_MOLECULE = /^app\/components\/molecules\/([^/.]+)(?:\/|$)/;

const moleculeOf = (file: string | null): string | null =>
  file === null ? null : (A_MOLECULE.exec(file)?.[1] ?? null);

type Composed = ReadonlyMap<string, ReadonlySet<string>>;
type Options = readonly [{ readonly tests: readonly string[] }];

const indexed = new WeakMap<ts.Program, Composed>();

// what one node names: an import, an export from, or an `import()` of a literal
function specifierOf(node: ts.Node): string | null {
  if (
    (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
    node.moduleSpecifier !== undefined &&
    ts.isStringLiteral(node.moduleSpecifier)
  )
    return node.moduleSpecifier.text;
  const [first] = ts.isCallExpression(node) ? node.arguments : [];
  return ts.isCallExpression(node) &&
    node.expression.kind === ts.SyntaxKind.ImportKeyword &&
    first !== undefined &&
    ts.isStringLiteralLike(first)
    ? first.text
    : null;
}

// every module a file names, through its whole tree
function specifiersIn(syntax: ts.SourceFile): readonly string[] {
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    const specifier = specifierOf(node);
    if (specifier !== null) found.push(specifier);
    ts.forEachChild(node, visit);
  };
  visit(syntax);
  return found;
}

// the molecules one file names, each resolved by the program
function moleculesImportedBy({
  syntax,
  program,
  context,
}: {
  readonly syntax: ts.SourceFile;
  readonly program: ts.Program;
  readonly context: Context;
}): readonly string[] {
  return specifiersIn(syntax).flatMap((specifier) => {
    const resolved = ts.resolveModuleName(
      specifier,
      syntax.fileName,
      program.getCompilerOptions(),
      ts.sys,
    ).resolvedModule?.resolvedFileName;
    const other = moleculeOf(
      resolved === undefined ? null : pathOf(context, resolved),
    );
    return other === null ? [] : [other];
  });
}

// every molecule folder with the other molecules its files name, its tests aside, read once a program
function composedIn({
  program,
  context,
  tests,
}: {
  readonly program: ts.Program;
  readonly context: Context;
  readonly tests: readonly string[];
}): Composed {
  const kept = indexed.get(program);
  if (kept !== undefined) return kept;
  const composed = new Map<string, Set<string>>();
  for (const syntax of program.getSourceFiles()) {
    const file = pathOf(context, syntax.fileName);
    const own = matchesAny(file, tests) ? null : moleculeOf(file);
    if (own === null) continue;
    const found = composed.get(own) ?? new Set<string>();
    for (const other of moleculesImportedBy({ syntax, program, context }))
      if (other !== own) found.add(other);
    composed.set(own, found);
  }
  indexed.set(program, composed);
  return composed;
}

const moleculesComposeOneMolecule = createRule<Options, 'two'>({
  name: 'molecules-compose-one-molecule',
  meta: {
    type: 'problem',
    docs: { description: 'A molecule composes at most one other molecule' },
    messages: {
      two: '`{{molecule}}` composes {{count}} molecules ({{names}}): a molecule composes one, and one that composes two is an organism (docs/rules/components.md).',
    },
    schema: [
      {
        type: 'object',
        properties: { tests: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ tests: [] }],
  create(context, [{ tests }]) {
    const file = pathOf(context);
    const molecule = matchesAny(file, tests) ? null : moleculeOf(file);
    const program = context.sourceCode.parserServices?.program;
    if (molecule === null) return {};
    const own = new Set<string>();
    const named: TSESTree.Node[] = [];
    const take = (source: TSESTree.Node | null): void => {
      if (source?.type !== 'Literal' || typeof source.value !== 'string')
        return;
      const other = moleculeOf(moduleOf(context, source.value));
      if (other === null || other === molecule) return;
      own.add(other);
      named.push(source);
    };
    return {
      ImportDeclaration: (node) => take(node.source),
      ExportNamedDeclaration: (node) => take(node.source),
      ExportAllDeclaration: (node) => take(node.source),
      ImportExpression: (node) => take(node.source),
      'Program:exit'() {
        // the folder's count when the program is read, this file's alone when not
        const names = [
          ...((program === undefined || program === null
            ? undefined
            : composedIn({ program, context, tests }).get(molecule)) ?? own),
        ].sort((one, other) => one.localeCompare(other));
        if (names.length < 2) return;
        for (const node of named)
          context.report({
            node,
            messageId: 'two',
            data: { molecule, count: names.length, names: names.join(', ') },
          });
      },
    };
  },
});

export { moleculesComposeOneMolecule };
