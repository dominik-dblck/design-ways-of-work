/**
 * - an exported name is declared in one file of this repository's own code
 * - a re-export declares nothing; a declaration file and a file a tool writes aside
 * - a name declared twice is mended where it stands: no count, no baseline
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { declaredNamesOf } from '../../shared/lint/exportedNames.ts';
import { isGenerated } from '../../shared/lint/header.ts';
import { scope } from '../../scope.ts';
import { filesNamedBy } from '../../shared/tests/globs.ts';

interface Source {
  readonly path: string;
  readonly text: string;
}

const A_SOURCE = /(?<!\.d)\.tsx?$/;

// each exported name declared in more than one file, with its files
function namesWithTwoHomes(
  sources: readonly Source[],
): Readonly<Record<string, readonly string[]>> {
  const homes = new Map<string, Set<string>>();
  for (const source of sources) {
    const tree = ts.createSourceFile(
      source.path,
      source.text,
      ts.ScriptTarget.Latest,
      false,
      source.path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    for (const { text: name } of declaredNamesOf(tree))
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

describe('an exported name has one home', () => {
  it('a type declared in a component and in its types file is found; a re-export and a local name are not', () => {
    expect(
      namesWithTwoHomes([
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
      ]),
    ).toStrictEqual({
      PlantedRow: [
        'app/components/Planted/Planted.tsx',
        'app/components/Planted/types/plantedTypes.ts',
      ],
    });
  });

  it('no exported name of the production code is declared in two files', () => {
    const sources = theSources();
    expect(sources.length, 'the walk reaches the code').toBeGreaterThan(0);
    expect(namesWithTwoHomes(sources)).toStrictEqual({});
  });
});
