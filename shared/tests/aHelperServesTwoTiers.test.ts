/**
 * - a helper of the tests' own folder is imported by two tiers at least; one
 *   tier's helper lives beside that tier's tests
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { tiersOf } from '../testTiers.ts';
import { filesNamedBy } from './globs.ts';
import { lonelyHelpersIn } from './helperTiers.ts';

const helpers = 'none' in scope.helpers ? null : scope.helpers;

const { config } = ts.readConfigFile(
  path.join(scope.root, 'tsconfig.json'),
  (file) => ts.sys.readFile(file),
);
const { options } = ts.parseJsonConfigFileContent(config, ts.sys, scope.root);

// an import as the repository's tsconfig resolves it, its path from the root; a package's none
const resolve = (specifier: string, file: string): string | null => {
  const found = ts.resolveModuleName(
    specifier,
    path.join(scope.root, file),
    options,
    ts.sys,
  ).resolvedModule;
  return found === undefined || found.isExternalLibraryImport === true
    ? null
    : path
        .relative(scope.root, found.resolvedFileName)
        .split(path.sep)
        .join('/');
};

describe('a helper serves two tiers', () => {
  it('control · a tier read off a project, a helper one tier imports found, one two import not', () => {
    const tiers = tiersOf({
      test: {
        projects: [
          { test: { name: 'app', include: ['app/**/*.test.{ts,tsx}'] } },
          {
            test: {
              name: 'endpoint:documents',
              include: ['app/api/documents/**/*.test.ts'],
            },
          },
        ],
      },
    });
    expect(tiers).toEqual([
      ['app/', 'app'],
      ['app/api/documents/', 'endpoint'],
    ]);
    const from = (file: string) => ({ file, text: `import { x } from './x';` });
    const target: Readonly<Record<string, string>> = {
      'app/a.test.ts': 'tests/helpers/one.ts',
      'app/api/documents/b.test.ts': 'tests/helpers/one.ts',
      'app/c.test.ts': 'tests/helpers/two.ts',
      'app/d.test.ts': 'tests/helpers/two.ts',
      'tests/helpers/none.ts': 'tests/helpers/one.ts',
    };
    expect(
      lonelyHelpersIn(
        [
          { file: 'tests/helpers/one.ts', text: '' },
          { file: 'tests/helpers/two.ts', text: '' },
          { file: 'tests/helpers/kept.ts', text: '' },
          ...Object.keys(target).map(from),
        ],
        {
          root: 'tests/helpers',
          tiers,
          exempt: ['tests/helpers/kept.ts'],
          resolve: (_, file) => target[file] ?? null,
        },
      ),
    ).toEqual([
      'tests/helpers/none.ts · no tier',
      'tests/helpers/two.ts · app',
    ]);
  });

  // a repository whose tests share no helper says why, and the gate skips under that sentence
  it.skipIf(helpers !== null)(
    `no shared helper · ${'none' in scope.helpers ? scope.helpers.none : 'held'}`,
    () => undefined,
  );

  it.skipIf(helpers === null)('every helper serves two tiers', () => {
    if (helpers === null) return;
    expect(
      helpers.tiers.length,
      'control · the scope names its tiers',
    ).toBeGreaterThan(1);
    const sources = filesNamedBy(scope, ['**/*.{ts,tsx,mts}']).map((file) => ({
      file,
      text: fs.readFileSync(path.join(scope.root, file), 'utf8'),
    }));
    expect(
      lonelyHelpersIn(sources, {
        root: helpers.root,
        tiers: helpers.tiers,
        exempt: helpers.exemptions.map(({ file }) => file),
        resolve,
      }),
    ).toEqual([]);
  });
});
