import { describe, expect, it } from 'vitest';
import {
  explained,
  haltedOnTag,
  mapDifferences,
  runDifferences,
  unwrittenOnTag,
} from '../../scripts/consumerDiff.ts';
import type { Run } from '../../scripts/consumerDiff.ts';

const build: Run = { command: 'build', status: 0, output: 'built 12 pages' };

describe("two clones' runs, compared", () => {
  it('a run alike on both sides is no difference', () => {
    expect(runDifferences({ pinned: [build], next: [build] })).toEqual([]);
  });

  it('an output that moved is named by its script', () => {
    const next = [{ ...build, output: 'built 13 pages' }];
    expect(runDifferences({ pinned: [build], next })).toEqual([
      'output · yarn build',
    ]);
  });

  it('an exit that moved is a difference of its own, beside the output', () => {
    const next = [{ ...build, status: 1, output: 'no pages' }];
    expect(runDifferences({ pinned: [build], next })).toEqual([
      'output · yarn build',
      'exit · yarn build · 0 → 1',
    ]);
  });

  it('a run one side lacks is named', () => {
    expect(runDifferences({ pinned: [build], next: [] })).toEqual([
      'missing run · yarn build',
    ]);
  });
});

describe("two clones' files, compared", () => {
  it('a file changed, one gone and one new are each named, in order', () => {
    const pinned = new Map([
      ['same.js', 'a'],
      ['moved.js', 'a'],
      ['gone.js', 'a'],
    ]);
    const next = new Map([
      ['same.js', 'a'],
      ['moved.js', 'b'],
      ['come.js', 'a'],
    ]);
    expect(mapDifferences('dist', { pinned, next })).toEqual([
      'dist · come.js',
      'dist · gone.js',
      'dist · moved.js',
    ]);
  });
});

describe('a difference is expected by a row of the release, or it is red', () => {
  it('a difference no row names is unexplained', () => {
    const { unexplained, stale } = explained({
      found: ['output · yarn build'],
      expected: {},
      allowed: {},
    });
    expect(unexplained).toEqual(['output · yarn build']);
    expect(stale).toEqual([]);
  });

  it('a row names its difference, with why', () => {
    const { lines, unexplained } = explained({
      found: ['output · yarn build'],
      expected: { 'output · yarn build': 'a page more' },
      allowed: {},
    });
    expect(unexplained).toEqual([]);
    expect(lines).toEqual(['EXPECTED · output · yarn build · a page more']);
  });

  it('a row ending in a star expects every difference it opens', () => {
    const { unexplained } = explained({
      found: ['dist · project/a.js', 'dist · project/b.js', 'dist · other.js'],
      expected: { 'dist · project/*': 'the pages are built again' },
      allowed: {},
    });
    expect(unexplained).toEqual(['dist · other.js']);
  });

  it('a row of a release put out since the pin explains too, and is never stale', () => {
    const { lines, unexplained, stale } = explained({
      found: ['output · yarn build'],
      expected: {},
      allowed: {
        'output · yarn build': 'v0.3.0 · a page more',
        'output · yarn test': 'v0.3.0 · a test more',
      },
    });
    expect(unexplained).toEqual([]);
    expect(stale).toEqual([]);
    expect(lines).toEqual([
      'EXPECTED · output · yarn build · v0.3.0 · a page more',
    ]);
  });

  it('a row nothing matches is stale: the release no longer means it', () => {
    const { stale, lines } = explained({
      found: [],
      expected: { 'output · yarn build': 'a page more' },
      allowed: {},
    });
    expect(stale).toEqual(['output · yarn build']);
    expect(lines).toEqual([
      'STALE · output · yarn build · expected, and the same now',
    ]);
  });

  it('what a run the tag halted on first wrote explains itself; a row on it still says more', () => {
    const failed: Run = { ...build, status: 1 };
    const left = (...files: readonly string[]): Run => ({
      ...build,
      standing: new Set(files.map((file) => `dist · ${file}`)),
    });
    const runs = {
      pinned: [failed, build],
      next: [
        left('a.js', 'b.js', 'c.js'),
        left('a.js', 'b.js', 'c.js', 'd.js'),
      ],
    };
    const files = {
      pinned: new Map([['a.js', '1']]),
      next: new Map([
        ['a.js', '2'],
        ['b.js', '3'],
        ['c.js', '4'],
        ['d.js', '5'],
      ]),
    };
    const unwritten = unwrittenOnTag('dist', files);
    expect(unwritten).toEqual(['dist · b.js', 'dist · c.js', 'dist · d.js']);
    const halted = new Set(haltedOnTag(runs, unwritten));
    expect([...halted]).toEqual(['dist · b.js', 'dist · c.js']);
    const { unexplained, stale, lines } = explained({
      found: mapDifferences('dist', files),
      expected: { 'dist · c.js': 'a page more' },
      allowed: {},
      halted,
    });
    expect(unexplained).toEqual(['dist · a.js', 'dist · d.js']);
    expect(stale).toEqual([]);
    expect(lines.slice(1, 3)).toEqual([
      'EXPECTED · dist · b.js · the tag’s side never wrote it: the run that first writes it failed there and passed here',
      'EXPECTED · dist · c.js · a page more',
    ]);
  });

  it('a run that passed on the tag and failed here halts nothing', () => {
    const failed: Run = { ...build, status: 1 };
    const runs = {
      pinned: [build],
      next: [{ ...failed, standing: new Set(['dist · b.js']) }],
    };
    expect(haltedOnTag(runs, ['dist · b.js'])).toEqual([]);
  });
});
