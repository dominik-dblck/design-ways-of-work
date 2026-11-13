/**
 * - `oneHomePerName` · an exported value, type or component is declared in one file
 * - `nameHomeOf` · a name's home: its file, or the families that name it as one
 * - an entry's API is its repository's to name
 */
import { ESLintUtils } from '@typescript-eslint/utils';
import type ts from 'typescript';
import { declaredNamesOf } from '../exportedNames.ts';
import { createRule, matchesAny, pathOf } from './ruleKit.ts';
import type { Context } from './ruleKit.ts';

interface Family {
  readonly files: string;
  readonly names: readonly string[];
}

interface Scope {
  readonly files: readonly string[];
  readonly ignores: readonly string[];
  readonly entries: readonly string[];
  readonly families: readonly Family[];
}

type Homes = ReadonlyMap<string, ReadonlySet<string>>;

const isCounted = (file: string, scope: Scope): boolean =>
  !file.startsWith('..') &&
  !file.includes('node_modules/') &&
  matchesAny(file, scope.files) &&
  !matchesAny(file, scope.ignores) &&
  !scope.entries.includes(file);

// a name's home: its file, or, in a family's file, every family naming it as one home
const nameHomeOf = (
  families: readonly Family[],
  { file, name }: { readonly file: string; readonly name: string },
): string => {
  const naming = families.filter((family) => family.names.includes(name));
  return naming.some((family) => matchesAny(file, [family.files]))
    ? `family:${naming.map((family) => family.files).join(' · ')}`
    : file;
};

const indexed = new WeakMap<ts.Program, Homes>();

function homesIn(
  {
    program,
    context,
  }: { readonly program: ts.Program; readonly context: Context },
  scope: Scope,
): Homes {
  const kept = indexed.get(program);
  if (kept !== undefined) return kept;
  const homes = new Map<string, Set<string>>();
  for (const syntax of program.getSourceFiles()) {
    const file = pathOf(context, syntax.fileName);
    if (syntax.isDeclarationFile || !isCounted(file, scope)) continue;
    for (const { text: name } of declaredNamesOf(syntax))
      homes.set(
        name,
        (homes.get(name) ?? new Set()).add(
          nameHomeOf(scope.families, { file, name }),
        ),
      );
  }
  indexed.set(program, homes);
  return homes;
}

const oneHomePerName = createRule<[Scope], 'twice'>({
  name: 'one-home-per-name',
  meta: {
    type: 'problem',
    docs: { description: 'A name the code exports is declared in one file' },
    messages: {
      twice:
        '`{{name}}` is declared in {{other}} too: one name, one home (docs/rules/one-home.md).',
    },
    schema: [
      {
        type: 'object',
        properties: {
          files: { type: 'array', items: { type: 'string' } },
          ignores: { type: 'array', items: { type: 'string' } },
          entries: { type: 'array', items: { type: 'string' } },
          families: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                files: { type: 'string' },
                names: { type: 'array', items: { type: 'string' } },
              },
              required: ['files', 'names'],
              additionalProperties: false,
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ files: [], ignores: [], entries: [], families: [] }],
  create(context, [scope]) {
    return {
      Program() {
        const { program } = ESLintUtils.getParserServices(context);
        const file = pathOf(context);
        const syntax = program.getSourceFile(context.filename);
        if (syntax === undefined || !isCounted(file, scope)) return;
        const homes = homesIn({ program, context }, scope);
        for (const name of declaredNamesOf(syntax)) {
          const home = nameHomeOf(scope.families, { file, name: name.text });
          const other = [...(homes.get(name.text) ?? [])].find(
            (one) => one !== home,
          );
          if (other !== undefined)
            context.report({
              loc: {
                start: context.sourceCode.getLocFromIndex(
                  name.getStart(syntax),
                ),
                end: context.sourceCode.getLocFromIndex(name.getEnd()),
              },
              messageId: 'twice',
              data: { name: name.text, other },
            });
        }
      },
    };
  },
});

export { nameHomeOf, oneHomePerName };
export type { Family };
