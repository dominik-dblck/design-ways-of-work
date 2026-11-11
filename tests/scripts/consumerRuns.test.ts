import { describe, expect, it } from 'vitest';
import { settled } from '../../scripts/consumerRuns.ts';

const ROOT = '/scratch/product/pinned';

describe("an output is kept with its clone's root and its timings out", () => {
  it.each([
    [
      'a clone names its files by <root>',
      `${ROOT}/app/a.ts:3`,
      '<root>/app/a.ts:3',
    ],
    ["a check part's seconds", '12 OK · part g · 3 s', '12 OK · part g'],
    ["a tier line's seconds", '✓ lint · 2.1 s', '✓ lint'],
    [
      "a test file's milliseconds",
      ' ❯ tests/a.test.ts (3 tests | 1 failed) 63ms',
      ' ❯ tests/a.test.ts (3 tests | 1 failed)',
    ],
    [
      "a slow test's seconds",
      '   ✓ builds every page 1.20s',
      '   ✓ builds every page',
    ],
    ["vitest's start", '   Start at  12:24:14', ''],
    ["vitest's duration", '   Duration  2.05s (import 61%, tests 29%)', ''],
  ])('%s', (_, printed, kept) => {
    expect(settled(ROOT, printed)).toBe(kept);
  });

  it('a run slow enough for the isolate hint reads as one that was not', () => {
    const summary =
      ' Test Files  1 failed | 15 passed (16)\n   Start at  12:24:14\n   Duration  2.05s (import 61%)\n';
    const hint = [
      '',
      '    Isolate  36 workers spawned · ~99ms startup each (spawn + environment, per file)',
      '             at least ~258ms faster with isolate: false — reuses workers across files instead of one per file',
      '',
    ].join('\n');
    expect(settled(ROOT, `${summary}${hint}`)).toBe(settled(ROOT, summary));
    expect(settled(ROOT, summary)).toBe(
      ' Test Files  1 failed | 15 passed (16)\n\n',
    );
  });

  it.each([
    ['a number a check states', 'FAIL · the block waits 30s before it retries'],
    [
      'a duration in the middle of a line',
      'timeout 30s exceeded in block-rules',
    ],
    ['a size', 'dist/project/app.js 412ms budget, 2 chunks'],
  ])('%s stands as printed', (_, printed) => {
    expect(settled(ROOT, printed)).toBe(printed);
  });
});
