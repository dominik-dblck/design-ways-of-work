/**
 * - a committed take (W113) writes the tag's files and `wow.lock`, git seeing both
 * - its check reads the lock alone: a taken file edited or gone is red
 * - `--tag` clones the tag and runs that tag's own take; a branch is refused
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';

const made: string[] = [];
afterAll(() => {
  for (const folder of made)
    fs.rmSync(folder, { recursive: true, force: true });
});

const TAKE = path.resolve(import.meta.dirname, '..', 'take');
const RULE = path.join('shared', 'lint', 'rule.ts');
// a hook's git hands its children its own index and folder: each repository here is its own
const ENV = Object.fromEntries(
  Object.entries(process.env).filter(([name]) => !name.startsWith('GIT_')),
);

const git = ({
  cwd,
  args,
}: {
  readonly cwd: string;
  readonly args: readonly string[];
}): string =>
  execFileSync(
    'git',
    ['-c', 'user.name=take', '-c', 'user.email=take@local', ...args],
    { cwd, encoding: 'utf8', env: ENV },
  );

const headOf = (cwd: string): string =>
  git({ cwd, args: ['rev-parse', 'HEAD'] }).trim();

const scratch = (prefix: string): string => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  made.push(folder);
  return folder;
};

// the way of working at one tag: its take scripts, one shared file, its version
function aTaggedSource(): string {
  const source = scratch('take-tagged-');
  fs.cpSync(TAKE, path.join(source, 'shared', 'take'), { recursive: true });
  fs.mkdirSync(path.join(source, 'shared', 'lint'), { recursive: true });
  fs.writeFileSync(path.join(source, RULE), 'tag\n');
  fs.writeFileSync(
    path.join(source, 'package.json'),
    JSON.stringify({ name: 'design-ways-of-work', version: '1.0.0' }),
  );
  git({ cwd: source, args: ['init', '-q'] });
  git({ cwd: source, args: ['add', '-A'] });
  git({ cwd: source, args: ['commit', '-q', '-m', 'tag'] });
  git({ cwd: source, args: ['tag', 'v1.0.0'] });
  return source;
}

// a build repository taking shared/ by commit, its remote the tagged source
function aBuildRepository(source: string): string {
  const root = scratch('take-build-');
  git({ cwd: root, args: ['init', '-q'] });
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify({
      name: 'build',
      wow: { takes: ['shared'], commits: true, remote: source },
    }),
  );
  return root;
}

const take = ({
  root,
  args,
}: {
  readonly root: string;
  readonly args: readonly string[];
}): { readonly status: number | null; readonly out: string } => {
  const ran = spawnSync('node', [path.join(TAKE, 'takeWow.ts'), ...args], {
    cwd: root,
    encoding: 'utf8',
    env: ENV,
  });
  return { status: ran.status, out: ran.stdout + ran.stderr };
};

describe('a committed take', () => {
  it('writes the files and the lock, both for git to commit', () => {
    const source = aTaggedSource();
    const root = aBuildRepository(source);
    expect(take({ root, args: ['--from', source] }).status).toBe(0);
    expect(fs.readFileSync(path.join(root, RULE), 'utf8')).toBe('tag\n');
    const seen = git({ cwd: root, args: ['status', '--porcelain', '-uall'] });
    expect(seen).toContain(`?? ${RULE}`);
    expect(seen).toContain('?? wow.lock');
  });

  it('takes a tracked file again with no refusal: the lock says it is wow’s', () => {
    const source = aTaggedSource();
    const root = aBuildRepository(source);
    take({ root, args: ['--from', source] });
    git({ cwd: root, args: ['add', '-A'] });
    git({ cwd: root, args: ['commit', '-q', '-m', 'take'] });
    const again = take({ root, args: ['--from', source] });
    expect(again.status).toBe(0);
    expect(again.out).toContain('0 written, 0 removed');
  });

  it('is checked by its lock alone, red on a file edited or gone', () => {
    const source = aTaggedSource();
    const root = aBuildRepository(source);
    take({ root, args: ['--from', source] });
    expect(take({ root, args: ['--check'] }).status).toBe(0);
    fs.writeFileSync(path.join(root, RULE), 'edited\n');
    const edited = take({ root, args: ['--check'] });
    expect(edited.status).toBe(1);
    expect(edited.out).toContain(`EDITED · ${RULE}`);
    fs.rmSync(path.join(root, RULE));
    expect(take({ root, args: ['--check'] }).out).toContain(`GONE · ${RULE}`);
  });

  it('clones the tag at the commit named, runs its take and locks that commit', () => {
    const source = aTaggedSource();
    const root = aBuildRepository(source);
    const commit = headOf(source);
    const ran = take({ root, args: ['--tag', 'v1.0.0', '--sha', commit] });
    expect(ran.status).toBe(0);
    expect(fs.readFileSync(path.join(root, RULE), 'utf8')).toBe('tag\n');
    expect(fs.readFileSync(path.join(root, 'wow.lock'), 'utf8')).toMatch(
      new RegExp(`^# design-ways-of-work 1\\.0\\.0 ${commit}\\n`),
    );
  });

  it('writes nothing from a tag that stands on another commit than the one named', () => {
    const root = aBuildRepository(aTaggedSource());
    const ran = take({
      root,
      args: ['--tag', 'v1.0.0', '--sha', '0'.repeat(40)],
    });
    expect(ran.status).toBe(1);
    expect(ran.out).toContain('nothing taken');
    expect(fs.existsSync(path.join(root, 'shared'))).toBe(false);
  });

  it('takes the same tag again at the lock’s commit, and refuses it once moved', () => {
    const source = aTaggedSource();
    const root = aBuildRepository(source);
    take({ root, args: ['--tag', 'v1.0.0', '--sha', headOf(source)] });
    expect(take({ root, args: ['--tag', 'v1.0.0'] }).status).toBe(0);
    fs.writeFileSync(path.join(source, RULE), 'moved\n');
    git({ cwd: source, args: ['commit', '-q', '-am', 'moved'] });
    git({ cwd: source, args: ['tag', '-f', 'v1.0.0'] });
    expect(take({ root, args: ['--tag', 'v1.0.0'] }).status).toBe(1);
    expect(fs.readFileSync(path.join(root, RULE), 'utf8')).toBe('tag\n');
  });

  it('moves a hidden take to committed: its exclude block goes, the lock comes', () => {
    const source = aTaggedSource();
    const root = aBuildRepository(source);
    const manifest = path.join(root, 'package.json');
    fs.writeFileSync(
      manifest,
      JSON.stringify({ name: 'build', wow: { takes: ['shared'] } }),
    );
    take({ root, args: ['--from', source] });
    const exclude = path.join(root, '.git', 'info', 'exclude');
    expect(fs.readFileSync(exclude, 'utf8')).toContain(RULE);
    fs.writeFileSync(
      manifest,
      JSON.stringify({
        name: 'build',
        wow: { takes: ['shared'], commits: true },
      }),
    );
    expect(take({ root, args: ['--from', source] }).status).toBe(0);
    expect(fs.readFileSync(exclude, 'utf8')).not.toContain(RULE);
    expect(fs.existsSync(path.join(root, 'wow.lock'))).toBe(true);
  });

  it('refuses no release’s tag, a tag with no commit, and a take with no tag', () => {
    const root = aBuildRepository(aTaggedSource());
    expect(take({ root, args: ['--tag', 'main'] }).out).toContain(
      "no release's tag",
    );
    expect(take({ root, args: ['--tag', 'v1.0.0'] }).out).toContain(
      'names no commit',
    );
    expect(take({ root, args: [] }).out).toContain('names its tag');
    expect(fs.existsSync(path.join(root, 'shared'))).toBe(false);
  });
});
