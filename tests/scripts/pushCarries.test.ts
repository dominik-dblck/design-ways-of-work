import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { carried } from '../../scripts/pushCarries.ts';
import { childEnv } from '../../scripts/scratch.ts';
import { scratchRepo } from './scratchRepo.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-push-'));
const remote = scratchRepo({ base, name: 'remote.git', flags: ['--bare'] });
const local = scratchRepo({ base, name: 'local' });
const NO_COMMIT = '0'.repeat(40);

const lineOf = (ref: string, sha: string): string =>
  `${ref} ${sha} ${ref} ${NO_COMMIT}`;
const carriedTo = (url: string, lines: string): readonly string[] =>
  carried({ root: local.root, url, lines, env: childEnv() });

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('a push carries the commits its remote lacks', () => {
  const first = local.committed('a.txt', 'one');

  it('a commit never pushed is carried', () => {
    expect(carriedTo(remote.root, lineOf('refs/heads/main', first))).toEqual([
      first,
    ]);
  });

  it('once pushed it is carried no more, under its branch or under a tag', () => {
    local.git(['push', '-q', remote.root, 'main']);
    expect(carriedTo(remote.root, lineOf('refs/heads/main', first))).toEqual(
      [],
    );
    expect(carriedTo(remote.root, lineOf('refs/tags/v1', first))).toEqual([]);
  });

  it('a commit made since is carried, alone', () => {
    const second = local.committed('a.txt', 'two');
    expect(carriedTo(remote.root, lineOf('refs/heads/main', second))).toEqual([
      second,
    ]);
  });

  it('a ref deleted carries nothing', () => {
    const deleted = `(delete) ${NO_COMMIT} refs/heads/gone ${first}`;
    expect(carriedTo(remote.root, deleted)).toEqual([]);
  });

  it('a remote that does not answer holds nothing: every commit is carried', () => {
    const head = local.git(['rev-parse', 'HEAD']);
    const absent = path.join(base, 'absent.git');
    expect(carriedTo(absent, lineOf('refs/heads/main', head))).toHaveLength(2);
  });
});
