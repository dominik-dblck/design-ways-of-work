/**
 * - `tools/layout.ts · emitted`: a JSON the build writes is its module's data (D21)
 * - edited by hand, it differs from what its module prints, and the test fails
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { emittedTexts } from '../../tools/emit.ts';
import { ROOT } from '../../tools/layout.ts';

describe('a generated file is its module', () => {
  it('each JSON in fixtures/data/ is what its module prints', async () => {
    const stale = (await emittedTexts()).filter(
      ([file, text]) =>
        !fs.existsSync(path.join(ROOT, file)) ||
        fs.readFileSync(path.join(ROOT, file), 'utf8') !== text,
    );
    expect(stale.map(([file]) => file)).toEqual([]);
  });
});
