import { describe, expect, it } from 'vitest';
import { knipConfig } from '../../shared/lint/knipConfig.ts';
import { FIXTURES } from './ruleTester.ts';
import { scopeAt } from './scopeAt.ts';

const SKILLS_WRITER = 'shared/skills/writeE2eSkills.ts';
const TAKE = 'shared/take/takeWow.ts';

// the entries less the browser tier's face, its skills' writer and the take, which every scope's knip holds alike
const beyondTheFace = (
  entries: string | readonly string[] | undefined,
): readonly string[] =>
  (typeof entries === 'string' ? [entries] : (entries ?? [])).filter(
    (entry) =>
      !entry.startsWith('shared/e2e/') &&
      entry !== SKILLS_WRITER &&
      entry !== TAKE,
  );

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
    expect(beyondTheFace(config.entry)).toEqual([
      'sheet/words.ts',
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

  it("the browser tier's face, its skills' writer and the take are entries of every scope, its own parts not", () => {
    const { entry } = knipConfig(scopeAt('/nowhere'));
    expect(entry).toEqual(
      expect.arrayContaining([
        'shared/e2e/runCategorisedTests.ts',
        'shared/e2e/theScreenSuite.ts',
        SKILLS_WRITER,
        TAKE,
      ]),
    );
    expect(entry).not.toContain('shared/e2e/dragHold.ts');
  });

  it('a repository with no Claude Code settings has no hook entries', () => {
    expect(beyondTheFace(knipConfig(scopeAt('/nowhere')).entry)).toEqual([
      '*.config.{ts,mts}',
      'scope.ts',
    ]);
  });
});
