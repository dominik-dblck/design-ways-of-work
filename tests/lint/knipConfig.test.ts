import { describe, expect, it } from 'vitest';
import { BROWSER_FACE, knipConfig } from '../../shared/lint/knipConfig.ts';
import { FIXTURES } from './ruleTester.ts';
import { scopeAt } from './scopeAt.ts';

describe('knip from a scope', () => {
  it("its entries are the scope's, the browser tier's face, what it starts from, each file a hook runs, once", () => {
    const config = knipConfig(
      scopeAt(FIXTURES, {
        entries: ['sheet/words.ts'],
        starts: ['app/pages/*.tsx'],
        production: ['sheet/**/*.ts'],
        ignores: ['dist/**'],
        generated: ['app/tokens.ts'],
      }),
    );
    expect(config.entry).toEqual([
      'sheet/words.ts',
      ...BROWSER_FACE,
      'app/pages/*.tsx',
      'tools/keepsTheTurn.ts',
      'shared/hooks/editCheck.ts',
      'scripts/guard.ts',
      'tools/local.mts',
      '*.config.{ts,mts}',
      'scope.ts',
    ]);
    expect(config.project).toEqual(
      expect.arrayContaining(['sheet/**/*.ts', 'tests/**', 'scope.ts']),
    );
    expect(config.ignore).toEqual(['dist/**', 'app/tokens.ts']);
  });

  it('a repository with no Claude Code settings has no hook entries', () => {
    expect(knipConfig(scopeAt('/nowhere')).entry).toEqual([
      ...BROWSER_FACE,
      '*.config.{ts,mts}',
      'scope.ts',
    ]);
  });
});
