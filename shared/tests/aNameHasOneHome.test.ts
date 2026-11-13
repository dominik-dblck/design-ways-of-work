/**
 * - an exported name is declared in one file, a home's and the product's alike
 * - an entry's API and a family's one name are its repository's to name
 * - a re-export, a declaration file and a file a tool writes declare nothing here
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { declaredNamesOf } from '../lint/exportedNames.ts';
import { isGenerated } from '../lint/header.ts';
import { scope } from '../../scope.ts';
import type { RepoScope } from '../repoScope.ts';
import { filesNamedBy, isNamedBy } from './globs.ts';

interface Source {
  readonly path: string;
  readonly text: string;
}

type Kept = Pick<RepoScope, 'entries' | 'families'>;

const A_SOURCE = /(?<!\.d)\.tsx?$/;

// the rule's own reading: a family's one name in a file of the family is the family's
const isFamilyName = (
  kept: Kept,
  { file, name }: { readonly file: string; readonly name: string },
): boolean =>
  kept.families.some(
    (family) => family.names.includes(name) && isNamedBy(file, [family.files]),
  );

// each exported name declared in more than one file, with its files
function namesWithTwoHomes(
  sources: readonly Source[],
  kept: Kept,
): Readonly<Record<string, readonly string[]>> {
  const homes = new Map<string, Set<string>>();
  for (const source of sources.filter(
    (one) => !kept.entries.includes(one.path),
  )) {
    const tree = ts.createSourceFile(
      source.path,
      source.text,
      ts.ScriptTarget.Latest,
      false,
      source.path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    for (const { text: name } of declaredNamesOf(tree))
      if (!isFamilyName(kept, { file: source.path, name }))
        homes.set(name, (homes.get(name) ?? new Set()).add(source.path));
  }
  return Object.fromEntries(
    [...homes]
      .filter(([, files]) => files.size > 1)
      .map(([name, files]) => [name, [...files].sort()]),
  );
}

const theSources = (): readonly Source[] =>
  filesNamedBy(scope, scope.production)
    .filter((file) => A_SOURCE.test(file))
    .map((file) => ({
      path: file,
      text: fs.readFileSync(path.join(scope.root, file), 'utf8'),
    }))
    .filter((source) => !isGenerated(source.text));

const NOTHING_KEPT: Kept = { entries: [], families: [] };

describe('an exported name has one home', () => {
  it('a type declared in a component and in its types file is found; a re-export and a local name are not', () => {
    expect(
      namesWithTwoHomes(
        [
          {
            path: 'app/components/Planted/Planted.tsx',
            text: 'type PlantedRow = { readonly id: string };\nexport type { PlantedRow };',
          },
          {
            path: 'app/components/Planted/types/plantedTypes.ts',
            text: 'export type PlantedRow = { readonly id: string };',
          },
          {
            path: 'app/components/Planted/index.ts',
            text: "export { Planted } from './Planted.tsx';",
          },
          {
            path: 'app/components/Planted/Planted.parts.ts',
            text: 'const Planted = 1;\nexport { other } from "./other.ts";',
          },
          {
            path: 'app/components/Planted/Planted.view.tsx',
            text: 'export const Planted = () => null;',
          },
        ],
        NOTHING_KEPT,
      ),
    ).toStrictEqual({
      PlantedRow: [
        'app/components/Planted/Planted.tsx',
        'app/components/Planted/types/plantedTypes.ts',
      ],
    });
  });

  it("two entries' API and a family's one name are kept; the same name outside the family is found", () => {
    const sources: readonly Source[] = [
      { path: 'sheet/planted/a.ts', text: 'export const all = [];' },
      { path: 'sheet/planted/b.ts', text: 'export const all = [];' },
      { path: 'rules/planted/a.ts', text: 'export const rules = [];' },
      { path: 'rules/planted/b.ts', text: 'export const rules = [];' },
      { path: 'tools/planted.ts', text: 'export const rules = [];' },
    ];
    expect(
      namesWithTwoHomes(sources, {
        entries: ['sheet/planted/a.ts', 'sheet/planted/b.ts'],
        families: [{ files: 'rules/planted/*.ts', names: ['rules'] }],
      }),
    ).toStrictEqual({});
    expect(namesWithTwoHomes(sources, NOTHING_KEPT)).toStrictEqual({
      all: ['sheet/planted/a.ts', 'sheet/planted/b.ts'],
      rules: ['rules/planted/a.ts', 'rules/planted/b.ts', 'tools/planted.ts'],
    });
  });

  it('no exported name of the production code is declared in two files', () => {
    const sources = theSources();
    expect(sources.length, 'the walk reaches the code').toBeGreaterThan(0);
    expect(namesWithTwoHomes(sources, scope)).toStrictEqual({});
  });
});
