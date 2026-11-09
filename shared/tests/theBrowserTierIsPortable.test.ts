/**
 * - the browser tier's framework imports node's builtins, Playwright and itself
 * - so it lifts into any product, and any product's flows into it never reach
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { reachesOut } from './browserGates.ts';

const FRAMEWORK = path.join(scope.root, 'shared', 'e2e');

describe('the browser tier is portable', () => {
  it('control · an import of a product or of a folder above is caught', () => {
    expect(
      reachesOut(
        "import { theme } from '@/app/styles/theme';\nimport { a } from '../lint/a.ts';\nimport fs from 'node:fs';",
      ),
    ).toEqual(['@/app/styles/theme', '../lint/a.ts']);
  });

  it('no file of shared/e2e imports past itself, Playwright and node', () => {
    const files = fs
      .readdirSync(FRAMEWORK)
      .filter((file) => file.endsWith('.ts'));
    expect(
      files.length,
      'control · the walk reaches the framework',
    ).toBeGreaterThan(0);
    expect(
      files.flatMap((file) =>
        reachesOut(fs.readFileSync(path.join(FRAMEWORK, file), 'utf8')).map(
          (specifier) => `${file} · ${specifier}`,
        ),
      ),
    ).toEqual([]);
  });
});
