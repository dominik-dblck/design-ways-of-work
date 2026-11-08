/**
 * - `docs/rules/responsibility.md`: a file opens with 1–3 bullets naming its exports, at most 15
 * - an entry passing a part's values on names that part, and they are the part's to count (D14)
 */
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { heldToItsBaseline } from './baseline.ts';
import {
  A_HEADER,
  bulletsOf,
  exportedValuesOf,
  syntaxOf,
} from './fileSyntax.ts';
import { isEntry, productionSources } from './tree.ts';
import type { Source } from './tree.ts';

const MOST_BULLETS = 3;
const LONGEST_BULLET = 80;
const MOST_EXPORTS = 15;
const A_NAME = /`([A-Za-z_$][\w$]*)`/g;

const specifierOf = (statement: ts.Statement): string | null =>
  (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) &&
  statement.moduleSpecifier !== undefined &&
  ts.isStringLiteral(statement.moduleSpecifier)
    ? statement.moduleSpecifier.text
    : null;

/** The values an entry passes on from its own parts, each with the part's name: `screenWords`. */
function passedOn(source: Source): ReadonlyMap<string, string> {
  const passed = new Map<string, string>();
  if (!isEntry(source.path)) return passed;
  const own = `./${path.posix.basename(source.path, '.ts')}/`;
  const partOf = (from: string | null): string | null =>
    from?.startsWith(own) ? from.slice(own.length).replace(/\.ts$/, '') : null;
  const file = syntaxOf(source);
  const imported = new Map<string, string>();
  for (const statement of file.statements) {
    const part = partOf(specifierOf(statement));
    const bindings = ts.isImportDeclaration(statement)
      ? statement.importClause?.namedBindings
      : undefined;
    if (part !== null && bindings !== undefined && ts.isNamedImports(bindings))
      for (const one of bindings.elements) imported.set(one.name.text, part);
  }
  for (const statement of file.statements) {
    if (!ts.isExportDeclaration(statement) || statement.isTypeOnly) continue;
    const clause = statement.exportClause;
    if (clause === undefined || !ts.isNamedExports(clause)) continue;
    const from = partOf(specifierOf(statement));
    for (const one of clause.elements) {
      const local = (one.propertyName ?? one.name).text;
      const part = from ?? imported.get(local);
      if (part !== undefined) passed.set(one.name.text, part);
    }
  }
  return passed;
}

function jobShortfallOf(source: Source): readonly string[] {
  const passed = passedOn(source);
  const values = exportedValuesOf(source).filter((name) => !passed.has(name));
  const tooMany =
    values.length > MOST_EXPORTS ? [`${values.length} exported values`] : [];
  const bullets = bulletsOf(source.text);
  if (bullets === null || bullets.length === 0 || bullets.length > MOST_BULLETS)
    return [...tooMany, 'no header of 1–3 bullets'];
  const named = bullets.flatMap((bullet) =>
    [...bullet.matchAll(A_NAME)].map(([, name]) => name),
  );
  const body = source.text.trimStart().replace(A_HEADER, '');
  return [
    ...tooMany,
    ...bullets
      .filter((bullet) => bullet.length > LONGEST_BULLET)
      .map((bullet) => `a bullet of ${bullet.length} characters`),
    ...[...values, ...passed.keys()]
      .filter(
        (value) =>
          !named.includes(value) && !named.includes(passed.get(value) ?? ''),
      )
      .map((value) => `\`${value}\` in no bullet`),
    ...named
      .filter(
        (name) => !new RegExp(`\\b${name.replace('$', '\\$')}\\b`).test(body),
      )
      .map((name) => `\`${name}\` not in the file`),
  ];
}

describe('a file states its job', () => {
  const file = (text: string): Source => ({
    path: 'sheet/words/planted.ts',
    text,
  });

  it('no header, a free-text header and a fourth bullet are found', () => {
    expect(jobShortfallOf(file('export const ONE = 1;'))).toEqual([
      'no header of 1–3 bullets',
    ]);
    expect(
      jobShortfallOf(file('// planted.ts\nexport const ONE = 1;')),
    ).toEqual(['no header of 1–3 bullets']);
    expect(
      jobShortfallOf(
        file(
          '/**\n * - `ONE`\n * - b\n * - c\n * - d\n */\nexport const ONE = 1;',
        ),
      ),
    ).toEqual(['no header of 1–3 bullets']);
  });

  it('an export no bullet names, a name the file lacks and a long bullet are found', () => {
    expect(
      jobShortfallOf(
        file(
          `/**\n * - \`ONE\` and \`gone\`\n * - ${'x'.repeat(81)}\n */\nexport const ONE = 1;\nexport function two(): number { return 2; }\nexport type Three = 3;`,
        ),
      ),
    ).toEqual([
      'a bullet of 81 characters',
      '`two` in no bullet',
      '`gone` not in the file',
    ]);
  });

  it('an entry naming its API under the names it exports passes', () => {
    expect(
      jobShortfallOf(
        file(
          "/**\n * - `all`, `byId` · the pages and each one by its id\n */\nimport { PAGES } from './planted/pages.ts';\nconst byId = {};\nexport { PAGES as all, byId };",
        ),
      ),
    ).toEqual([]);
  });

  it("an entry passing on its part names the part, and its sixteen values are the part's", () => {
    const names = Array.from({ length: 16 }, (_, at) => `value${at}`);
    const entry = (bullet: string): Source => ({
      path: 'sheet/words/planted.ts',
      text: `/**\n * - ${bullet}\n */\nimport { ${names.map((name) => `${name.toUpperCase()}`).join(', ')} } from './planted/rows.ts';\nexport { ${names.map((name) => `${name.toUpperCase()} as ${name}`).join(', ')} };`,
    });
    expect(jobShortfallOf(entry('`rows` · the planted rows'))).toEqual([]);
    expect(jobShortfallOf(entry('the planted rows'))).toContain(
      '`value0` in no bullet',
    );
  });

  it('sixteen exported values are found', () => {
    const names = Array.from({ length: 16 }, (_, at) => `value${at}`);
    const text = `/**\n * - ${names.map((name) => `\`${name}\``).join(' ')}\n */\n${names.map((name) => `export const ${name} = 1;`).join('\n')}`;
    expect(jobShortfallOf(file(text))).toContain('16 exported values');
  });

  it('no file beyond the baseline fails to state its job', () => {
    const sources = productionSources();
    expect(sources.length, 'the walk reaches the code').toBeGreaterThan(100);
    expect(
      heldToItsBaseline(
        'aFileStatesItsJob',
        sources
          .filter((source) => jobShortfallOf(source).length > 0)
          .map((source) => source.path),
      ),
    ).toEqual({ added: [], fixed: [] });
  });
});
