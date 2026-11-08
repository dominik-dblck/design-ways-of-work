/**
 * - `fileStatesItsJob` · a header of 1–3 bullets naming the exports, 15 at most
 * - an entry passing a part's values on names the part; they are the part's
 */
import path from 'node:path';
import ts from 'typescript';
import { exportedNamesOf } from '../exportedNames.ts';
import {
  A_HEADER,
  bulletsOf,
  isGenerated,
  LONGEST_BULLET,
  MOST_BULLETS,
  PROLOGUE,
} from '../header.ts';
import { createRule, pathOf, syntaxOf } from './ruleKit.ts';

const MOST_EXPORTS = 15;
const A_NAME = /`([A-Za-z_$][\w$]*)`/g;

const specifierOf = (statement: ts.Statement): string | null =>
  (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) &&
  statement.moduleSpecifier !== undefined &&
  ts.isStringLiteral(statement.moduleSpecifier)
    ? statement.moduleSpecifier.text
    : null;

function importedFromParts(
  file: ts.SourceFile,
  partOf: (from: string | null) => string | null,
): ReadonlyMap<string, string> {
  const imported = new Map<string, string>();
  for (const statement of file.statements) {
    const part = partOf(specifierOf(statement));
    const bindings = ts.isImportDeclaration(statement)
      ? statement.importClause?.namedBindings
      : undefined;
    if (part !== null && bindings !== undefined && ts.isNamedImports(bindings))
      for (const one of bindings.elements) imported.set(one.name.text, part);
  }
  return imported;
}

// each value an entry passes on from its own parts, with the part: `screenWords`
function passedOn(file: ts.SourceFile): ReadonlyMap<string, string> {
  const own = `./${path.posix.parse(file.fileName).name}/`;
  const partOf = (from: string | null): string | null =>
    from?.startsWith(own)
      ? from.slice(own.length).replace(/\.tsx?$/, '')
      : null;
  const imported = importedFromParts(file, partOf);
  const passed = new Map<string, string>();
  for (const statement of file.statements) {
    if (!ts.isExportDeclaration(statement) || statement.isTypeOnly) continue;
    const clause = statement.exportClause;
    if (clause === undefined || !ts.isNamedExports(clause)) continue;
    const from = partOf(specifierOf(statement));
    for (const one of clause.elements) {
      const part = from ?? imported.get((one.propertyName ?? one.name).text);
      if (part !== undefined) passed.set(one.name.text, part);
    }
  }
  return passed;
}

function shortfallOf(
  file: ts.SourceFile,
  { entry }: { readonly entry: boolean },
): readonly string[] {
  const passed = entry ? passedOn(file) : new Map<string, string>();
  // a default has no name to put in a bullet: the file's own name says it
  const exportedValues = exportedNamesOf(file, { types: false }).filter(
    (name) => name !== 'default' && !passed.has(name),
  );
  const tooMany =
    exportedValues.length > MOST_EXPORTS
      ? [`${exportedValues.length} exported values`]
      : [];
  const bullets = bulletsOf(file.text);
  if (bullets === null || bullets.length === 0 || bullets.length > MOST_BULLETS)
    return [...tooMany, 'no header of 1–3 bullets'];
  const named = bullets.flatMap((bullet) =>
    [...bullet.matchAll(A_NAME)].flatMap(([, name]) => name ?? []),
  );
  const body = file.text.replace(PROLOGUE, '').replace(A_HEADER, '');
  const inBody = (name: string): boolean =>
    new RegExp(`\\b${name.replace('$', '\\$')}\\b`).test(body);
  return [
    ...tooMany,
    ...bullets
      .filter((bullet) => bullet.length > LONGEST_BULLET)
      .map((bullet) => `a bullet of ${bullet.length} characters`),
    ...[...exportedValues, ...passed.keys()]
      .filter(
        (exported) =>
          !named.includes(exported) &&
          !named.includes(passed.get(exported) ?? ''),
      )
      .map((exported) => `\`${exported}\` in no bullet`),
    ...named
      .filter((name) => !inBody(name))
      .map((name) => `\`${name}\` not in the file`),
  ];
}

const fileStatesItsJob = createRule<
  [{ readonly entries: readonly string[] }],
  'job'
>({
  name: 'file-states-its-job',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'A file opens with 1–3 bullets naming what it exports',
    },
    messages: {
      job: 'The file states its job in a header of 1–3 bullets of at most 80 characters, each export named: {{what}} (docs/rules/responsibility.md).',
    },
    schema: [
      {
        type: 'object',
        properties: { entries: { type: 'array', items: { type: 'string' } } },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ entries: [] }],
  create(context, [{ entries }]) {
    return {
      Program() {
        if (isGenerated(context.sourceCode.text)) return;
        const isEntry = entries.includes(pathOf(context));
        for (const what of shortfallOf(syntaxOf(context), { entry: isEntry }))
          context.report({
            loc: { line: 1, column: 0 },
            messageId: 'job',
            data: { what },
          });
      },
    };
  },
});

export { fileStatesItsJob };
