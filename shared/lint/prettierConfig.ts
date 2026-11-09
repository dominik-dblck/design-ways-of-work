/**
 * - `prettierConfigOf`, `prettierIgnoreOf` · the formatter's options; what it leaves
 * - a table's rows stay one line each: one wide override on the scope's `tables`
 */
import type { RepoScope } from '../repoScope.ts';

type Formatted = Pick<
  RepoScope,
  | 'ignores'
  | 'productTrees'
  | 'generated'
  | 'generators'
  | 'tables'
  | 'unformatted'
>;

const OPTIONS = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
} as const;

// a row of a table is one line however long: no row is ever wrapped
const TABLE_WIDTH = 10000;

const prettierConfigOf = (
  scope: Formatted,
): Readonly<Record<string, unknown>> => ({
  ...OPTIONS,
  overrides: [
    {
      files: scope.tables.filter((glob) => !glob.startsWith('!')),
      excludeFiles: scope.tables
        .filter((glob) => glob.startsWith('!'))
        .map((glob) => glob.slice(1)),
      options: { printWidth: TABLE_WIDTH },
    },
  ],
});

// a glob as `.prettierignore` reads it: gitignore's own, a `/**` folder its folder
const asIgnored = (glob: string): string => glob.replace(/\/\*\*$/, '/');

// prettier reads `.gitignore` too: this names the tracked files it leaves, each group by its why
function prettierIgnoreOf(scope: Formatted): string {
  const groups: readonly (readonly [string, readonly string[]])[] = [
    ['what the lint leaves aside', scope.ignores],
    ["a product's tree, formatted in its product", scope.productTrees],
    [
      "a file a tool writes keeps the tool's layout",
      [
        ...scope.generated,
        ...scope.generators.flatMap((one) =>
          one.writes.filter((glob) => !glob.startsWith('!')),
        ),
      ],
    ],
    ...Object.entries(scope.unformatted).map(
      ([glob, why]) => [why, [glob]] as const,
    ),
  ];
  return `${groups
    .filter(([, globs]) => globs.length > 0)
    .map(([why, globs]) => [`# ${why}`, ...globs.map(asIgnored)].join('\n'))
    .join('\n')}\n`;
}

export { prettierConfigOf, prettierIgnoreOf };
