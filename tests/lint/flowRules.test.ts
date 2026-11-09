import type { Linter } from 'eslint';
import { describe, expect, it } from 'vitest';
import { FLOW_SHAPES } from '../../shared/lint/flowShapes.ts';
import { testRules } from '../../shared/lint/testRules.ts';
import { scopeAt } from './scopeAt.ts';

const TIER = {
  screensRoot: 'e2e',
  statusRoot: 'roadmaps/e2e',
  registry: 'e2e/testingIds',
  templates: 'e2e/templates',
  componentRoots: [],
  roles: [],
  exemptions: [],
};

// the blocks whose list refuses an element reached but by the registry
const flowBlocksOf = (configs: readonly Linter.Config[]) =>
  configs.filter((one) =>
    [one.rules?.['no-restricted-syntax']]
      .flat()
      .some((option) => option === FLOW_SHAPES[0]),
  );

describe('a flow reaches the screen by the registry alone', () => {
  it('a tier lints its flows, its registry aside, and moves their time', () => {
    const configs = testRules(scopeAt('.', { browser: TIER }));
    expect(
      flowBlocksOf(configs).map(({ files, ignores }) => ({ files, ignores })),
    ).toEqual([{ files: ['e2e/**/*.ts'], ignores: ['e2e/testingIds/**'] }]);
    expect(
      configs.find(
        (one) => one.rules?.['wow/time-is-moved-not-waited'] !== undefined,
      )?.files,
    ).toContain('e2e/**/*.ts');
  });

  it('a scope with no browser tier has no flows to lint', () => {
    expect(flowBlocksOf(testRules(scopeAt('.')))).toEqual([]);
  });
});
