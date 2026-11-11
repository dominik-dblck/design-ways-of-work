import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { HERE } from '../../scripts/repos.ts';
import { childEnv } from '../../scripts/scratch.ts';
import { scratchRepo } from './scratchRepo.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-backup-'));
// where the script makes the folder its bundle is written in
const bundles = path.join(base, 'bundles');

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('the backup zips the repository beside itself', () => {
  const repo = scratchRepo({ base, name: 'project' });
  repo.committed('.gitignore', '.env\n');
  repo.committed('kept.txt', 'tracked');
  repo.committed('dist/built.txt', 'built');
  fs.writeFileSync(path.join(repo.root, 'new.txt'), 'not yet tracked');
  fs.writeFileSync(path.join(repo.root, '.env'), 'SECRET=1');
  fs.mkdirSync(path.join(repo.root, 'scripts'));
  fs.copyFileSync(
    path.join(HERE, 'scripts', 'zipRepo.sh'),
    path.join(repo.root, 'scripts', 'zipRepo.sh'),
  );
  fs.mkdirSync(bundles);
  execFileSync('zsh', [path.join(repo.root, 'scripts', 'zipRepo.sh')], {
    cwd: base,
    env: { ...childEnv(), TMPDIR: bundles },
  });
  const [zip = ''] = fs
    .readdirSync(base)
    .filter((entry) => entry.endsWith('.zip'));
  const held = execFileSync('unzip', ['-Z1', path.join(base, zip)], {
    encoding: 'utf8',
  })
    .split('\n')
    .filter(Boolean);

  it('tracked and new files are in, what git ignores and what is built are out', () => {
    expect(zip).toMatch(/^project-.*-dirty\.zip$/);
    expect(held).toEqual(
      expect.arrayContaining(['project/kept.txt', 'project/new.txt']),
    );
    expect(held).not.toContain('project/.env');
    expect(held).not.toContain('project/dist/built.txt');
  });

  it('the history is in as one bundle', () => {
    expect(held).toContain('project.bundle');
  });

  it('the temp folder it made is gone, removed empty', () => {
    expect(fs.readdirSync(bundles)).toEqual([]);
  });
});
