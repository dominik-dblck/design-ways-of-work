import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { carried, misread } from '../../scripts/pushCarries.ts';
import { childEnv } from '../../scripts/scratch.ts';
import { scratchRepo } from './scratchRepo.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-push-'));
const remote = scratchRepo({ base, name: 'remote.git', flags: ['--bare'] });
const local = scratchRepo({ base, name: 'local' });
const NO_COMMIT = '0'.repeat(40);
const MAIN = 'refs/heads/main';

// a ref new to the remote
const lineOf = (ref: string, sha: string): string =>
  `${ref} ${sha} ${ref} ${NO_COMMIT}`;
// main, which the remote holds at a commit
const mainOver = (sha: string, held: string): string =>
  `${MAIN} ${sha} ${MAIN} ${held}`;
const carriedTo = (url: string, lines: string): readonly string[] =>
  carried({ root: local.root, url, lines, env: childEnv() }).flatMap(
    ({ commits }) => commits,
  );

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('a push carries the commits its remote lacks', () => {
  const first = local.committed('a.txt', 'one');

  it('a commit never pushed is carried', () => {
    expect(carriedTo(remote.root, lineOf(MAIN, first))).toEqual([first]);
  });

  it('once main holds it, it is carried no more: to main or under a new tag', () => {
    local.git(['push', '-q', remote.root, 'main']);
    expect(carriedTo(remote.root, mainOver(first, first))).toEqual([]);
    expect(carriedTo(remote.root, lineOf('refs/tags/v1', first))).toEqual([]);
  });

  it('a commit made since is carried, alone', () => {
    const second = local.committed('a.txt', 'two');
    expect(carriedTo(remote.root, mainOver(second, first))).toEqual([second]);
  });

  it('a ref deleted carries nothing', () => {
    const deleted = `(delete) ${NO_COMMIT} refs/heads/gone ${first}`;
    expect(carriedTo(remote.root, deleted)).toEqual([]);
  });

  it('a remote that does not answer holds nothing: every commit is carried', () => {
    const head = local.git(['rev-parse', 'HEAD']);
    const absent = path.join(base, 'absent.git');
    expect(carriedTo(absent, lineOf(MAIN, head))).toHaveLength(2);
  });

  it('a commit the remote holds under another branch alone is carried to main and to a tag', () => {
    const head = local.git(['rev-parse', 'HEAD']);
    local.git(['push', '-q', remote.root, 'main:refs/heads/side']);
    expect(carriedTo(remote.root, mainOver(head, first))).toEqual([head]);
    expect(carriedTo(remote.root, lineOf('refs/tags/v2', head))).toEqual([
      head,
    ]);
  });

  it('what the remote holds and this checkout lacks takes nothing away', () => {
    const head = local.git(['rev-parse', 'HEAD']);
    const unknown = 'a'.repeat(40);
    expect(carriedTo(remote.root, mainOver(head, unknown))).toHaveLength(2);
  });

  it('the ref points at a commit, a tag with a message peeled to it', () => {
    const head = local.git(['rev-parse', 'HEAD']);
    local.git(['tag', '-a', 'v3', '-m', 'a release']);
    const tag = local.git(['rev-parse', 'refs/tags/v3']);
    const [sent] = carried({
      root: local.root,
      url: remote.root,
      lines: lineOf('refs/tags/v3', tag),
      env: childEnv(),
    });
    expect(tag).not.toBe(head);
    expect(sent?.tip).toBe(head);
  });
});

describe('the checks read the checkout, so it stands clean on what is pushed', () => {
  const checkout = { root: local.root, env: childEnv() };

  it('a clean checkout on the pushed commit is read as pushed', () => {
    expect(misread(checkout, [local.git(['rev-parse', 'HEAD'])])).toBe(
      undefined,
    );
  });

  it('a push of another commit than the one checked out is refused', () => {
    const before = local.git(['rev-parse', 'HEAD~1']);
    expect(misread(checkout, [before])).toContain(
      `not the pushed ${before.slice(0, 7)}`,
    );
  });

  it('uncommitted work is refused: tracked or not', () => {
    const head = local.git(['rev-parse', 'HEAD']);
    fs.writeFileSync(path.join(local.root, 'stray.txt'), 'no push carries me');
    expect(misread(checkout, [head])).toContain('uncommitted work');
    fs.rmSync(path.join(local.root, 'stray.txt'));
    fs.writeFileSync(path.join(local.root, 'a.txt'), 'three');
    expect(misread(checkout, [head])).toContain('uncommitted work');
  });
});
