/**
 * - `fileNamesItsPurpose`, `Named` · a file's name says what it holds
 * - no drawer, no number, an index re-exports; a scope's types files, its names
 */
import path from 'node:path';
import ts from 'typescript';
import { createRule, matchesAny, pathOf, syntaxOf } from './ruleKit.ts';
import {
  carriesItsName,
  componentOf,
  DRAWERS,
  repeatedWord,
  wordsOwed,
} from '../partNames.ts';

// a scope's own pattern: the files it names, the stem they take, and why
interface Named {
  readonly files: readonly string[];
  readonly stem: string;
  readonly why: string;
}

type Options = readonly [
  {
    readonly names: readonly Named[];
    readonly typesOnly: readonly string[];
    readonly components: readonly string[];
  },
];

const A_NUMBER =
  /(?:One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|[a-z]\d+)$/;
// a term whose digits are its name, never a split's count: `sha256`, `base64`, `utf8`, `es2017`
const A_TERM =
  /^(?:sha|md|base|utf|u?int|float|es|crc|ipv|http|oauth|mp|x|ed)\d+$/;

// the stem's last camel word names the term: `imageBase64` is one, `rules2` and `changed2` are counts
const endsInATerm = (stem: string): boolean =>
  A_TERM.test((stem.split(/(?=[A-Z])/).at(-1) ?? stem).toLowerCase());
const A_SOURCE = /(?:\.test-d|\.test)?\.tsx?$/;

const isTypeOnly = (statement: ts.Statement): boolean =>
  ts.isInterfaceDeclaration(statement) ||
  ts.isTypeAliasDeclaration(statement) ||
  (ts.isImportDeclaration(statement) &&
    statement.importClause?.phaseModifier === ts.SyntaxKind.TypeKeyword) ||
  (ts.isExportDeclaration(statement) && statement.isTypeOnly);

const isAReExport = (statement: ts.Statement): boolean =>
  ts.isExportDeclaration(statement) && statement.moduleSpecifier !== undefined;

type MessageId =
  | 'drawer'
  | 'number'
  | 'types'
  | 'index'
  | 'named'
  | 'closing'
  | 'unnamed'
  | 'repeats';
type Breach = readonly [MessageId, Readonly<Record<string, string>>];

// what a stem breaks: a drawer, a count, a part's name, a drawer's word, a scope's pattern
function namedBreaches({
  file,
  stem,
  names,
  components,
}: {
  readonly file: string;
  readonly stem: string;
  readonly names: readonly Named[];
  readonly components: readonly string[];
}): readonly Breach[] {
  const component = componentOf(file, components);
  const owed = wordsOwed({ file, stem, component });
  const word = component === null ? null : repeatedWord(stem, component);
  return [
    ...(component !== null && !carriesItsName(stem, component)
      ? [['unnamed', { component }] as const]
      : []),
    ...(component !== null && word !== null
      ? [['repeats', { component, word }] as const]
      : []),
    ...(DRAWERS.includes(stem) ? [['drawer', {}] as const] : []),
    ...(owed.length > 0
      ? [['closing', { words: owed.join(' or ') }] as const]
      : []),
    ...(A_NUMBER.test(stem) && !endsInATerm(stem)
      ? [['number', {}] as const]
      : []),
    ...names
      .filter(
        (named) =>
          matchesAny(file, named.files) && !new RegExp(named.stem).test(stem),
      )
      .map(
        (named) => ['named', { pattern: named.stem, why: named.why }] as const,
      ),
  ];
}

// the first statement a file's kind refuses: a value in a types file, own code in an index
function heldBreaches({
  file,
  stem,
  typesOnly,
  syntax,
}: {
  readonly file: string;
  readonly stem: string;
  readonly typesOnly: readonly string[];
  readonly syntax: ts.SourceFile;
}): readonly (readonly ['types' | 'index', ts.Statement])[] {
  const types = matchesAny(file, typesOnly)
    ? syntax.statements.find((one) => !isTypeOnly(one))
    : undefined;
  const own =
    stem === 'index'
      ? syntax.statements.find((one) => !isAReExport(one))
      : undefined;
  return [
    ...(types === undefined ? [] : [['types', types] as const]),
    ...(own === undefined ? [] : [['index', own] as const]),
  ];
}

const fileNamesItsPurpose = createRule<Options, MessageId>({
  name: 'file-names-its-purpose',
  meta: {
    type: 'suggestion',
    docs: { description: "A file's name says what it holds" },
    messages: {
      drawer:
        "`{{stem}}` is a drawer's name: a file is named for what it holds (docs/rules/names.md).",
      number:
        '`{{stem}}` is named by a number: a split names each job (docs/rules/size.md).',
      types:
        '`{{stem}}` holds a value: the scope keeps it to types alone (docs/rules/names.md).',
      index:
        'An `index.ts` re-exports its folder and holds nothing of its own (docs/rules/names.md).',
      named: '`{{stem}}` is not `{{pattern}}`: {{why}}',
      unnamed:
        "`{{stem}}` is a part of `{{component}}`: its name carries the component's (docs/rules/components.md).",
      repeats:
        '`{{stem}}` says `{{word}}` again after `{{component}}`: name the part by what it holds (docs/rules/components.md).',
      closing:
        '`{{stem}}` sits in a drawer folder: its name ends with {{words}}, a purpose before it in utils/ (docs/rules/names.md).',
    },
    schema: [
      {
        type: 'object',
        properties: {
          names: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                files: { type: 'array', items: { type: 'string' } },
                stem: { type: 'string' },
                why: { type: 'string' },
              },
              additionalProperties: false,
            },
          },
          typesOnly: { type: 'array', items: { type: 'string' } },
          components: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ names: [], typesOnly: [], components: [] }],
  create(context, [{ names, typesOnly, components }]) {
    const file = pathOf(context);
    const stem = path.posix.basename(file).replace(A_SOURCE, '');
    if (file.endsWith('.d.ts')) return {};
    return {
      Program(node) {
        for (const [messageId, found] of namedBreaches({
          file,
          stem,
          names,
          components,
        }))
          context.report({ node, messageId, data: { stem, ...found } });
        const syntax = syntaxOf(context);
        // a breach of what the file holds lands on the statement that breaks it
        for (const [messageId, statement] of heldBreaches({
          file,
          stem,
          typesOnly,
          syntax,
        })) {
          const start = context.sourceCode.getLocFromIndex(
            statement.getStart(syntax),
          );
          context.report({
            loc: { start, end: start },
            messageId,
            data: { stem },
          });
        }
      },
    };
  },
});

export { fileNamesItsPurpose };
export type { Named };
