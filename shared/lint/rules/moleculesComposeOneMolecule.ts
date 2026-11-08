/**
 * - `moleculesComposeOneMolecule` · a molecule composes atoms and one molecule
 * - counted over its folder, tests aside, among the molecules of its own ladder
 */
import type { TSESTree } from '@typescript-eslint/utils';
import ts from 'typescript';
import {
  ladderOf,
  moleculeNameOf,
  moleculeOf,
  RENDERERS,
} from '../componentLadders.ts';
import type { Renderer } from '../componentLadders.ts';
import { createRule, matchesAny, moduleOf, pathOf } from './ruleKit.ts';
import type { Context } from './ruleKit.ts';

type Composed = ReadonlyMap<string, ReadonlySet<string>>;
interface Roots {
  readonly components: readonly string[];
  readonly renderers: readonly Renderer[];
}
type Options = readonly [Roots & { readonly tests: readonly string[] }];

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
  components,
}: {
  readonly syntax: ts.SourceFile;
  readonly program: ts.Program;
  readonly context: Context;
  readonly components: readonly string[];
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
      components,
    );
    return other === null ? [] : [other];
  });
}

// every molecule folder with the other molecules its files name, its tests aside, read once a program
function composedIn({
  program,
  context,
  tests,
  roots: { components, renderers },
}: {
  readonly program: ts.Program;
  readonly context: Context;
  readonly tests: readonly string[];
  readonly roots: Roots;
}): Composed {
  const kept = indexed.get(program);
  if (kept !== undefined) return kept;
  const composed = new Map<string, Set<string>>();
  for (const syntax of program.getSourceFiles()) {
    const file = pathOf(context, syntax.fileName);
    const own = matchesAny(file, tests) ? null : moleculeOf(file, components);
    if (own === null) continue;
    const found = composed.get(own) ?? new Set<string>();
    for (const other of moleculesImportedBy({
      syntax,
      program,
      context,
      components,
    }))
      // a renderer's molecules spend none of the app's count, nor the app's a renderer's
      if (
        other !== own &&
        ladderOf(other, renderers) === ladderOf(own, renderers)
      )
        found.add(other);
    composed.set(own, found);
  }
  indexed.set(program, composed);
  return composed;
}

// the folder's count when the program is read, this file's alone when not
const namesComposed = ({
  composed,
  molecule,
  own,
}: {
  readonly composed: Composed | null | undefined;
  readonly molecule: string;
  readonly own: ReadonlySet<string>;
}): readonly string[] =>
  [...(composed?.get(molecule) ?? own)]
    .map(moleculeNameOf)
    .sort((one, other) => one.localeCompare(other));

// another molecule of its own ladder that a module literal names, or none
function otherIn(
  context: Context,
  {
    source,
    molecule,
    roots: { components, renderers },
  }: {
    readonly source: TSESTree.Node | null;
    readonly molecule: string;
    readonly roots: Roots;
  },
): string | null {
  if (source?.type !== 'Literal' || typeof source.value !== 'string')
    return null;
  const other = moleculeOf(moduleOf(context, source.value), components);
  return other === null ||
    other === molecule ||
    ladderOf(other, renderers) !== ladderOf(molecule, renderers)
    ? null
    : other;
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
        properties: {
          tests: { type: 'array', items: { type: 'string' } },
          components: { type: 'array', items: { type: 'string' } },
          renderers: RENDERERS,
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ tests: [], components: [], renderers: [] }],
  create(context, [{ tests, ...roots }]) {
    const file = pathOf(context);
    const molecule = matchesAny(file, tests)
      ? null
      : moleculeOf(file, roots.components);
    const program = context.sourceCode.parserServices?.program;
    if (molecule === null) return {};
    const own = new Set<string>();
    const named: TSESTree.Node[] = [];
    const take = (source: TSESTree.Node | null): void => {
      const other = otherIn(context, { source, molecule, roots });
      if (other === null || source === null) return;
      own.add(other);
      named.push(source);
    };
    return {
      ImportDeclaration: (node) => take(node.source),
      ExportNamedDeclaration: (node) => take(node.source),
      ExportAllDeclaration: (node) => take(node.source),
      ImportExpression: (node) => take(node.source),
      'Program:exit'() {
        const names = namesComposed({
          composed: program && composedIn({ program, context, tests, roots }),
          molecule,
          own,
        });
        if (names.length < 2) return;
        for (const node of named)
          context.report({
            node,
            messageId: 'two',
            data: {
              molecule: moleculeNameOf(molecule),
              count: names.length,
              names: names.join(', '),
            },
          });
      },
    };
  },
});

export { moleculesComposeOneMolecule };
