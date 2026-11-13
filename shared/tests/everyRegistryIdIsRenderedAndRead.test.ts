/**
 * - every id the tier's registry holds is rendered by production code and read
 *   by a test or a flow: by its path, an alias, a registry helper, or its group whole
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { isARegistryExport } from '../e2e/theRegistry.ts';
import { testsOf } from '../repoScope.ts';
import { filesNamedBy, isNamedBy } from './globs.ts';
import {
  helpersIn,
  registryLeavesOf,
  spelledIn,
  unreadOf,
} from './registryLeaves.ts';

const tier = 'none' in scope.browser ? null : scope.browser;
const isCode = (file: string): boolean => /\.tsx?$/.test(file);
const isTheRegistry = (file: string): boolean =>
  tier !== null && file.startsWith(`${tier.registry}/`);
const read = (file: string) => ({
  file,
  text: fs.readFileSync(path.join(scope.root, file), 'utf8'),
});

const registryFiles =
  tier === null ? [] : filesNamedBy(scope, [`${tier.registry}/**/*.ts`]);
const flows =
  tier === null
    ? []
    : filesNamedBy(scope, [`${tier.screensRoot}/**/*.ts`]).filter(
        (file) => !isTheRegistry(file),
      );
const tests = filesNamedBy(scope, testsOf(scope)).filter(isCode);
const production = filesNamedBy(scope, scope.production).filter(
  (file) =>
    isCode(file) && !isNamedBy(file, testsOf(scope)) && !isTheRegistry(file),
);

// each `{screen}TestIds` export of the registry, its ids as paths
async function leavesHeld(): Promise<readonly string[]> {
  const loaded = await Promise.all(
    registryFiles.map(
      async (file): Promise<unknown> =>
        import(pathToFileURL(path.join(scope.root, file)).href),
    ),
  );
  return loaded.flatMap((module) =>
    typeof module === 'object' && module !== null
      ? Object.entries(module)
          .filter(([root]) => isARegistryExport(root))
          .flatMap(([root, held]) => registryLeavesOf(root, held))
      : [],
  );
}

describe('every registry id is rendered and read', () => {
  // a repository without a browser tier says why, and the gate skips under that sentence
  it.skipIf(tier !== null)(
    `no browser tier · ${'none' in scope.browser ? scope.browser.none : 'held'}`,
    () => undefined,
  );

  it.skipIf(tier === null)(
    'each id is rendered by production code and read by a test or a flow',
    async () => {
      const leaves = await leavesHeld();
      expect(leaves.length, 'control · the registry loads').toBeGreaterThan(0);
      const roots = new Set(leaves.map((leaf) => leaf.split('.')[0] ?? ''));
      const spelling = {
        roots,
        helpers: helpersIn(registryFiles.map(read), roots),
      };
      const spelledBy = (files: readonly string[]): ReadonlySet<string> =>
        new Set(
          files.map(read).flatMap((source) => [...spelledIn(source, spelling)]),
        );
      expect(
        unreadOf(leaves, spelledBy(production)),
        'rendered by no component',
      ).toEqual([]);
      expect(
        unreadOf(leaves, spelledBy([...tests, ...flows])),
        'read by no flow and no test',
      ).toEqual([]);
    },
  );
});
