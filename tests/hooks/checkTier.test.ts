import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { hookRepo } from './hookRepo.ts';

const HOOK = 'checkTier.ts';
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-tier-'));
const USAGE = 'checkTier: commit [--staged [--write]] | feature';

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

// the scripts yarn ran, in order, and the files a tool was handed
const scriptsOf = (calls: readonly string[]): readonly string[] =>
  calls
    .filter((call) => call.startsWith('yarn -s '))
    .map((call) => call.slice('yarn -s '.length));
const handed = (calls: readonly string[], tool: string): string =>
  calls.find((call) => call.startsWith(`${tool} `)) ?? '';

describe('the tier a hook runs is named whole', () => {
  const repo = hookRepo({ base, name: 'usage' });

  it.each([
    ['no tier', []],
    ['a tier it does not know', ['push']],
    ['a flag it does not know', ['commit', '--all']],
    ['a write with nothing staged to write to', ['commit', '--write']],
    ['the staged files of a feature', ['feature', '--staged']],
  ])('%s is refused with its usage, and nothing runs', (_, args) => {
    const said = repo.ran({ hook: HOOK, args });
    expect(said.status).toBe(2);
    expect(said.stdout).toContain(USAGE);
    expect(said.calls).toEqual([]);
  });
});

describe('the commit tier reads the files a change holds', () => {
  const repo = hookRepo({ base, name: 'commit' });
  repo.committed('kept.ts', 'export const kept = 1;\n');
  repo.committed('leaves.ts', 'export const leaves = 1;\n');
  repo.committed('fixtures/wrong.ts', 'export const wrong = 1;\n');

  it('a tree with no change runs the checks of the tree, and no ESLint', () => {
    const said = repo.ran({ hook: HOOK, args: ['commit'] });
    expect(said.status).toBe(0);
    expect(scriptsOf(said.calls)).toEqual([
      'lint:files',
      'lint:deps',
      'tsc',
      'own:commit',
    ]);
    expect(handed(said.calls, 'eslint')).toBe('');
    expect(said.stdout).toMatch(/^✓ lint:files · \d+\.\d s$/m);
    expect(said.stdout).toMatch(/^commit · \d+\.\d s$/m);
  });

  it('a changed file and a new one are handed to each tool; one removed or ignored is not', () => {
    fs.writeFileSync(
      path.join(repo.root, 'kept.ts'),
      'export const kept = 2;\n',
    );
    fs.writeFileSync(path.join(repo.root, 'new.md'), '# new\n');
    fs.writeFileSync(
      path.join(repo.root, 'fixtures', 'wrong.ts'),
      'export const wrong = 2;\n',
    );
    fs.rmSync(path.join(repo.root, 'leaves.ts'));
    const { calls } = repo.ran({ hook: HOOK, args: ['commit'] });
    expect(handed(calls, 'prettier')).toBe(
      'prettier --check --ignore-unknown --log-level warn kept.ts new.md',
    );
    expect(handed(calls, 'cspell')).toBe(
      'cspell --no-progress --no-summary --no-must-find-files --file kept.ts --file new.md',
    );
    expect(handed(calls, 'eslint')).toBe('eslint --no-warn-ignored kept.ts');
    expect(scriptsOf(calls)).not.toContain('lint');
  });

  it('staged, the index alone is read', () => {
    repo.git(['add', '--', 'new.md']);
    const { calls } = repo.ran({ hook: HOOK, args: ['commit', '--staged'] });
    expect(handed(calls, 'prettier')).toBe(
      'prettier --check --ignore-unknown --log-level warn new.md',
    );
    expect(handed(calls, 'eslint')).toBe('');
  });

  it('a red check fails the tier and says why below the list', () => {
    const said = repo.ran({
      hook: HOOK,
      args: ['commit'],
      red: ['tsc'],
      out: 'kept.ts(1,1): a type is wrong',
    });
    expect(said.status).toBe(1);
    expect(said.stdout).toMatch(/^✗ tsc · /m);
    expect(said.stdout).toMatch(/^✓ lint:files · /m);
    expect(said.stdout).toContain('\ntsc:\nkept.ts(1,1): a type is wrong');
  });

  it('a check whose tool is not there says so, red', () => {
    fs.renameSync(
      path.join(repo.root, 'node_modules', '.bin', 'prettier'),
      path.join(repo.root, 'node_modules', '.bin', 'prettier-gone'),
    );
    const said = repo.ran({ hook: HOOK, args: ['commit'] });
    expect(said.status).toBe(1);
    expect(said.stdout).toMatch(/^✗ format:check · /m);
    expect(said.stdout).toContain('ENOENT');
  });
});

describe('a commit writes what it can fix', () => {
  const repo = hookRepo({ base, name: 'write' });
  repo.committed('whole.ts', 'export const whole = 1;\n');
  repo.committed('part.ts', 'export const part = 1;\n');

  it('a file staged whole is fixed, then formatted, then staged again; one staged in part is left', () => {
    fs.writeFileSync(
      path.join(repo.root, 'whole.ts'),
      'export const whole = 2;\n',
    );
    fs.writeFileSync(
      path.join(repo.root, 'part.ts'),
      'export const part = 2;\n',
    );
    repo.git(['add', '--', 'whole.ts', 'part.ts']);
    fs.writeFileSync(
      path.join(repo.root, 'part.ts'),
      'export const part = 3;\n',
    );
    const said = repo.ran({
      hook: HOOK,
      args: ['commit', '--staged', '--write'],
    });
    expect(said.status).toBe(0);
    expect(repo.git(['show', ':whole.ts'])).toBe(
      'export const whole = 2;\n// fixed\n// formatted',
    );
    expect(repo.git(['show', ':part.ts'])).toBe('export const part = 2;');
    expect(said.stdout).toContain(
      'checked, not formatted (staged in part): part.ts',
    );
  });
});

describe('the feature tier reads the tree', () => {
  const repo = hookRepo({ base, name: 'feature' });

  it('every check runs as its script, the feature end after the commit', () => {
    const said = repo.ran({ hook: HOOK, args: ['feature'] });
    expect(said.status).toBe(0);
    expect(said.calls.map((call) => call.replace('yarn -s ', ''))).toEqual([
      'lint:files',
      'lint:deps',
      'format:check',
      'lint:words',
      'lint',
      'tsc',
      'lint:exports',
      'own:commit',
      'own:end',
    ]);
    expect(said.stdout).toMatch(/^feature · \d+\.\d s$/m);
  });

  it('a spike branch runs neither tier', () => {
    repo.git(['checkout', '-q', '-b', 'spike/a-try']);
    const said = repo.ran({ hook: HOOK, args: ['feature'] });
    expect(said.status).toBe(0);
    expect(said.calls).toEqual([]);
    expect(said.stdout).toContain('spike/a-try is a spike');
  });
});
