/**
 * - `leavesOf`, `unreadOf` · a registry's ids as paths, and those no file spells
 * - `spelledIn`, `helpersIn` · the paths a file spells: by name, alias or helper
 */
import ts from 'typescript';

interface Source {
  readonly file: string;
  readonly text: string;
}

// a registry as a file reads it: its roots, and each helper with the paths it spells
interface Spelling {
  readonly roots: ReadonlySet<string>;
  readonly helpers: ReadonlyMap<string, readonly string[]>;
}

// each id under a root as a dotted path: `fooTestIds.row.cell`
const leavesOf = (at: string, held: unknown): readonly string[] => {
  if (typeof held === 'string') return [at];
  if (typeof held !== 'object' || held === null) return [];
  return Object.entries(held).flatMap(([key, inner]) =>
    leavesOf(`${at}.${key}`, inner),
  );
};

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

// `a.b.c` as its names, when it is a chain of names alone
function chainOf(node: ts.Expression): readonly string[] | null {
  if (ts.isIdentifier(node)) return [node.text];
  if (!ts.isPropertyAccessExpression(node)) return null;
  const head = chainOf(node.expression);
  return head === null ? null : [...head, node.name.text];
}

const isAnAlias = (node: ts.Node): boolean =>
  ts.isVariableDeclaration(node.parent) && node.parent.initializer === node;

// each chain written under a node, its longest only, an alias's own aside: `a.b.c`, never `a.b` inside it
const chainsIn = (
  under: ts.Node,
  file: ts.SourceFile,
): readonly (readonly string[])[] =>
  nodesIn(under, file)
    .filter(ts.isPropertyAccessExpression)
    .filter(
      (node) =>
        !isAnAlias(node) &&
        !(
          ts.isPropertyAccessExpression(node.parent) &&
          node.parent.expression === node
        ),
    )
    .flatMap((node) => {
      const chain = chainOf(node);
      return chain === null ? [] : [chain];
    });

// `const ids = fooTestIds.group`: the name, and the path it stands for
const aliasesIn = (
  file: ts.SourceFile,
  roots: ReadonlySet<string>,
): ReadonlyMap<string, readonly string[]> =>
  new Map(
    nodesIn(file, file)
      .filter(ts.isVariableDeclaration)
      .flatMap(({ name, initializer }) => {
        const chain = initializer === undefined ? null : chainOf(initializer);
        return ts.isIdentifier(name) &&
          chain !== null &&
          roots.has(chain[0] ?? '')
          ? [[name.text, chain] as const]
          : [];
      }),
  );

// the paths a file spells, whole: a group spelled alone is used whole, a leaf covers itself alone
const spelledIn = (
  source: Source,
  { roots, helpers }: Spelling,
): ReadonlySet<string> => {
  const file = syntaxOf(source);
  const aliases = aliasesIn(file, roots);
  const called = nodesIn(file, file)
    .filter(ts.isCallExpression)
    .flatMap(({ expression }) =>
      ts.isIdentifier(expression) ? (helpers.get(expression.text) ?? []) : [],
    );
  return new Set([
    ...chainsIn(file, file).flatMap(([head = '', ...rest]) => {
      const base = roots.has(head) ? [head] : aliases.get(head);
      return base === undefined ? [] : [[...base, ...rest].join('.')];
    }),
    ...called,
  ]);
};

// a registry's helpers, `rowOf(id)` and the like, each with the paths its body spells
const helpersIn = (
  sources: readonly Source[],
  roots: ReadonlySet<string>,
): ReadonlyMap<string, readonly string[]> =>
  new Map(
    sources.flatMap((source) => {
      const file = syntaxOf(source);
      return nodesIn(file, file)
        .filter(ts.isVariableDeclaration)
        .flatMap(({ name, initializer }) =>
          ts.isIdentifier(name) &&
          initializer !== undefined &&
          ts.isArrowFunction(initializer)
            ? [
                [
                  name.text,
                  chainsIn(initializer.body, file)
                    .filter(([head = '']) => roots.has(head))
                    .map((chain) => chain.join('.')),
                ] as const,
              ]
            : [],
        );
    }),
  );

// each leaf neither it nor a group above it is spelled
const unreadOf = (
  leaves: readonly string[],
  spelled: ReadonlySet<string>,
): readonly string[] =>
  leaves.filter((leaf) => {
    const names = leaf.split('.');
    return !names
      .slice(1)
      .some((_, at) => spelled.has(names.slice(0, at + 2).join('.')));
  });

export { helpersIn, leavesOf, spelledIn, unreadOf };
