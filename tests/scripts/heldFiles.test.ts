import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { BUILD_THEME } from '../../ports/build-theme/copySet.ts';
import { HELD } from '../../ports/build-theme/held.ts';
import { HERE } from '../../scripts/repos.ts';

describe('what this repository holds from the build side stands in its home', () => {
  it('every held file is in the design home: a move or a retirement mends the list', () => {
    const gone = HELD.filter(
      (file) => !fs.existsSync(path.join(HERE, BUILD_THEME.into, file)),
    );
    expect(HELD.length).toBeGreaterThan(0);
    expect(gone).toStrictEqual([]);
  });
});
