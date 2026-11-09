/**
 * - a component spells no test id in place: each it writes is imported from the
 *   tier's registry, or forwarded through the `testId` its own props declare
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { filesNamedBy } from './globs.ts';
import {
  conditionalExportsIn,
  literalIdsIn,
  unregisteredIn,
} from './testIds.ts';

const tier = 'none' in scope.browser ? null : scope.browser;
const read = (file: string) => ({
  file,
  text: fs.readFileSync(path.join(scope.root, file), 'utf8'),
});
const components =
  tier === null
    ? []
    : filesNamedBy(scope, scope.production)
        .filter((file) => file.endsWith('.tsx'))
        .map(read);
const registries =
  tier === null
    ? []
    : filesNamedBy(scope, [`${tier.registry}/**/*.ts`]).map(read);

// a file a component imports, by its path, when the disk holds it
const sibling = (file: string): string | undefined => {
  const at = path.join(scope.root, file);
  return fs.existsSync(at) ? fs.readFileSync(at, 'utf8') : undefined;
};

describe('test ids come from the registry', () => {
  // a repository without a browser tier says why, and the gate skips under that sentence
  it.skipIf(tier !== null)(
    `no browser tier · ${'none' in scope.browser ? scope.browser.none : 'held'}`,
    () => undefined,
  );

  it.skipIf(tier === null)(
    'no component spells an id, and each it writes is the registry’s',
    () => {
      if (tier === null) return;
      expect(
        components.length,
        'control · the walk reaches the components',
      ).toBeGreaterThan(0);
      expect(components.flatMap(literalIdsIn)).toEqual([]);
      expect(
        components.flatMap((source) =>
          unregisteredIn(source, { ...tier, sibling }),
        ),
      ).toEqual([]);
    },
  );

  it.skipIf(tier === null)(
    'no registry export is one build’s and not another’s',
    () => {
      expect(
        registries.length,
        'control · the walk reaches the registry',
      ).toBeGreaterThan(0);
      expect(registries.flatMap(conditionalExportsIn)).toEqual([]);
    },
  );
});
