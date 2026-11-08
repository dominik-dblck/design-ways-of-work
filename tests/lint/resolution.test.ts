import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolutionOf } from '../../shared/lint/resolution.ts';
import { FIXTURES } from './ruleTester.ts';

describe('how a repository resolves its imports', () => {
  it('a link is followed to its file, as tsc follows it by default', () => {
    expect(resolutionOf(FIXTURES)).toEqual({
      project: path.join(FIXTURES, 'tsconfig.json'),
      symlinks: true,
    });
  });

  it('a link keeps its own path where the tsconfig preserves it, read through its extends', () => {
    expect(resolutionOf(path.join(FIXTURES, 'linked')).symlinks).toBe(false);
  });
});
