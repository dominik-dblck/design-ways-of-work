import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { hookRepo } from './hookRepo.ts';
import { repositoryName, sameRepository } from '../../shared/hooks/remotes.ts';

const HTTPS = 'https://github.com/owner/product.git';
const base = fs.realpathSync(
  fs.mkdtempSync(path.join(os.tmpdir(), 'wow-post-commit-')),
);
// the hook's home folder: its backups land under it, never the machine's
const home = path.join(base, 'home');
const backups = path.join(home, 'backups', 'product');

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('a remote reads as host/owner/repo', () => {
  it('an ssh origin is the https field', () => {
    expect(sameRepository('git@github.com:owner/product.git', HTTPS)).toBe(
      true,
    );
  });

  it('an https origin is the field, with or without .git', () => {
    expect(sameRepository('https://github.com/owner/product', HTTPS)).toBe(
      true,
    );
  });

  it("a clone's local path is never it", () => {
    expect(sameRepository('/Users/someone/projects/product', HTTPS)).toBe(
      false,
    );
  });

  it('the name is its last segment', () => {
    expect(repositoryName(HTTPS)).toBe('product');
  });
});

describe("the post-commit hook backs up where origin is the scope's remote", () => {
  const repo = hookRepo({ base, name: 'product' });
  // the remote's pushes land in a bare repository on disk
  const bare = path.join(base, 'remote.git');
  execFileSync('git', ['init', '-q', '--bare', bare]);
  fs.writeFileSync(
    path.join(repo.root, 'scope.ts'),
    `const scope = { backup: { remote: '${HTTPS}' } };\n\nexport { scope };\n`,
  );
  repo.git(['config', `url.${bare}.insteadOf`, HTTPS]);
  const run = (): string =>
    repo.ran({ hook: 'postCommit.ts', env: { HOME: home } }).stdout;

  it('a clone whose origin is a local path bundles and pushes nothing', () => {
    repo.git(['remote', 'add', 'origin', path.join(base, 'elsewhere')]);
    expect(run()).toContain("no backup: origin is not the scope's remote");
    expect(fs.existsSync(path.join(home, 'backups'))).toBe(false);
  });

  it('the repository itself, its origin by ssh: the bundle written, the branch pushed', () => {
    repo.git(['remote', 'set-url', 'origin', 'git@github.com:owner/product']);
    const said = run();
    expect(said).toContain('bundle ok · ');
    expect(said).toContain('push ok · main · ');
    expect(fs.existsSync(path.join(backups, 'product.bundle'))).toBe(true);
    expect(execFileSync('git', ['-C', bare, 'rev-parse', 'main'])).toEqual(
      execFileSync('git', ['-C', repo.root, 'rev-parse', 'HEAD']),
    );
  });

  it('the next run keeps the last bundle as the previous one', () => {
    run();
    expect(fs.existsSync(path.join(backups, 'product.prev.bundle'))).toBe(true);
  });
});
