import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { knipConfig } from '../../shared/lint/knipConfig.ts';
import { FIXTURES } from './ruleTester.ts';
import { scopeAt } from './scopeAt.ts';

const SKILLS_WRITER = 'shared/skills/writeE2eSkills.ts';
const TAKE = 'shared/take/takeWow.ts';
const INSTALLER = 'shared/user-hooks/installUserHooks.ts';

// the entries less the browser tier's face, its skills' writer, the take and the user hooks' installer, which every scope's knip holds alike
const beyondTheFace = (
  entries: string | readonly string[] | undefined,
): readonly string[] =>
  (typeof entries === 'string' ? [entries] : (entries ?? [])).filter(
    (entry) =>
      !entry.startsWith('shared/e2e/') &&
      entry !== SKILLS_WRITER &&
      entry !== TAKE &&
      entry !== INSTALLER,
  );

const taken = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-knip-taken-'));

afterAll(() => {
  fs.rmSync(taken, { recursive: true, force: true });
});

describe('knip from a scope', () => {
  it("a product's take: each file of code the take wrote is an entry, its own files not", () => {
    fs.mkdirSync(path.join(taken, '.git'));
    fs.writeFileSync(
      path.join(taken, '.git', 'wow-taken'),
      '# design-ways-of-work 1.0.0\nsheet/words/sayWord.ts\t0\ndocs/rules/size.md\t0\n',
    );
    const { entry } = knipConfig(scopeAt(taken));
    expect(entry).toEqual(expect.arrayContaining(['sheet/words/sayWord.ts']));
    expect(entry).not.toEqual(expect.arrayContaining(['docs/rules/size.md']));
  });

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
      'product.ts',
      'productView.ts',
    ]);
    expect(config.project).toEqual(
      expect.arrayContaining(['sheet/**/*.ts', 'tests/**', 'scope.ts']),
    );
    expect(config.ignore).toEqual(['dist/**', 'app/tokens.ts']);
    expect(config.ignoreDependencies).toEqual([
      'design-ways-of-work',
      '@ls-lint/ls-lint',
    ]);
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
      'product.ts',
      'productView.ts',
    ]);
  });
});
