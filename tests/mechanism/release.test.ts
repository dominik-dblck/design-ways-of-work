import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { scratchWow } from './scratchWow.ts';
import type { ScratchWow } from './scratchWow.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-released-'));
const IN_HAND = { kind: 'minor', what: 'a release a test puts out' } as const;
const COMMIT_CHECK = 'yarn -s check:chunk --staged --write';
const PUSH_CHECK = 'yarn -s check:feature';
const RELEASED = 'chore(release): v0.2.0';

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

const versionOf = ({ wow }: ScratchWow): unknown =>
  Reflect.get(
    Object(
      JSON.parse(fs.readFileSync(path.join(wow.root, 'package.json'), 'utf8')),
    ),
    'version',
  );
const subjectOf = ({ wow }: ScratchWow): string =>
  wow.git(['log', '-1', '--format=%s']);
const isClean = ({ wow }: ScratchWow): boolean =>
  wow.git(['status', '--porcelain']) === '';
const tagHere = ({ wow }: ScratchWow): string =>
  wow.git(['tag', '--list', 'v0.2.0']);

describe('a release goes out whole, by one command', () => {
  const scratch = scratchWow({ base, name: 'whole' });
  scratch.wow.git(['mv', 'design/says.txt', 'design/said.txt']);
  scratch.wow.git(['commit', '-q', '-m', 'a file of a home moves']);
  scratch.inHand(IN_HAND);
  const said = scratch.ran({
    script: 'release.ts',
    args: ['--trailer', 'Tried-By: a test'],
  });
  const head = scratch.wow.git(['rev-parse', 'HEAD']);
  const row = fs.readFileSync(
    path.join(scratch.wow.root, 'releases', 'changelog.ts'),
    'utf8',
  );

  it('one commit holds the version and the row, with the trailer handed in', () => {
    expect(said.stdout).toContain('v0.2.0 is out');
    expect(said.status).toBe(0);
    expect(subjectOf(scratch)).toBe(RELEASED);
    expect(scratch.wow.git(['log', '-1', '--format=%b'])).toBe(
      `${IN_HAND.what}\n\nTried-By: a test`,
    );
    expect(versionOf(scratch)).toBe('0.2.0');
    expect(isClean(scratch)).toBe(true);
  });

  it('the row holds what the script adds, and nothing stays in hand', () => {
    const tried = scratch.product.git(['rev-parse', '--short', 'main']);
    expect(row).toContain('version: "0.2.0"');
    expect(row).toContain(`what: "${IN_HAND.what}"`);
    expect(row).toMatch(/date: "\d{4}-\d{2}-\d{2}"/);
    expect(row).toContain(
      'moved: { design: ["design/says.txt → design/said.txt"] }',
    );
    expect(row).toContain(`tried: { product: "${tried}" }`);
    expect(row).toMatch(
      /const NEXT: Unreleased = \{\s+kind: "patch",\s+what: ""/,
    );
  });

  it('main goes past the checks once; its tag, on a commit main holds, past none', () => {
    expect(said.calls).toEqual([COMMIT_CHECK, PUSH_CHECK]);
    expect(scratch.held('refs/heads/main')).toBe(head);
    expect(scratch.held('refs/tags/v0.2.0')).toBe(head);
  });

  it('run again, nothing is sent: the release is out', () => {
    const again = scratch.ran({ script: 'release.ts' });
    expect(again.status).toBe(1);
    expect(again.stdout).toContain('NEXT says nothing');
    expect(again.calls).toEqual([]);
    expect(scratch.wow.git(['rev-parse', 'HEAD'])).toBe(head);
  });
});

describe('a commit the checks refuse leaves nothing written', () => {
  const scratch = scratchWow({ base, name: 'refused-commit' });
  scratch.inHand(IN_HAND);
  const before = scratch.wow.git(['rev-parse', 'HEAD']);
  const said = scratch.ran({
    script: 'release.ts',
    red: ['check:chunk'],
    out: 'a check is red',
  });

  it('the release stops, the tree as it was', () => {
    expect(said.status).toBe(1);
    expect(said.stdout).toContain('the commit was refused');
    expect(scratch.wow.git(['rev-parse', 'HEAD'])).toBe(before);
    expect(isClean(scratch)).toBe(true);
    expect(versionOf(scratch)).toBe('0.1.10');
  });

  it('nothing is pushed and no tag is cut', () => {
    expect(said.calls).toEqual([COMMIT_CHECK]);
    expect(tagHere(scratch)).toBe('');
    expect(scratch.held('refs/tags/v0.2.0')).toBe('');
  });
});

describe('a push the checks refuse leaves no tag', () => {
  const scratch = scratchWow({ base, name: 'refused-push' });
  scratch.inHand(IN_HAND);
  const said = scratch.ran({ script: 'release.ts', red: ['check:feature'] });
  const head = scratch.wow.git(['rev-parse', 'HEAD']);

  it('the release commit stays here, untagged, and the remote holds nothing of it', () => {
    expect(said.status).toBe(1);
    expect(said.stdout).toContain('the push was refused and no tag is cut');
    expect(subjectOf(scratch)).toBe(RELEASED);
    expect(tagHere(scratch)).toBe('');
    expect(scratch.held('refs/heads/main')).not.toBe(head);
    expect(scratch.held('refs/tags/v0.2.0')).toBe('');
  });

  it('once the checks pass, the same release goes out: no second commit', () => {
    const again = scratch.ran({ script: 'release.ts' });
    expect(again.status).toBe(0);
    expect(again.stdout).toContain('v0.2.0 is out');
    expect(again.calls).toEqual([PUSH_CHECK]);
    expect(scratch.wow.git(['rev-parse', 'HEAD'])).toBe(head);
    expect(scratch.held('refs/tags/v0.2.0')).toBe(head);
  });
});

describe('a release starts from a clean main where git runs the hooks', () => {
  const scratch = scratchWow({ base, name: 'not-ready' });
  scratch.inHand(IN_HAND);
  const before = scratch.wow.git(['rev-parse', 'HEAD']);
  const refused = (why: string): void => {
    const said = scratch.ran({ script: 'release.ts' });
    expect(said.status).toBe(1);
    expect(said.stdout).toContain(`no release · ${why}`);
    expect(said.calls).toEqual([]);
    expect(scratch.wow.git(['rev-parse', 'main'])).toBe(before);
    expect(versionOf(scratch)).toBe('0.1.10');
  };

  it('another branch is refused', () => {
    scratch.wow.git(['checkout', '-q', '-b', 'side']);
    refused('a release is cut from main');
    scratch.wow.git(['checkout', '-q', 'main']);
  });

  it('uncommitted work is refused', () => {
    const stray = path.join(scratch.wow.root, 'stray.txt');
    fs.writeFileSync(stray, 'no commit holds me');
    refused('the tree holds uncommitted work');
    fs.rmSync(stray);
  });

  it('a clone where git runs no hook is refused', () => {
    scratch.wow.git(['config', '--unset', 'core.hooksPath']);
    refused('git runs no hook here');
  });
});

describe('a manifest that cannot take the version stops the release', () => {
  const scratch = scratchWow({ base, name: 'manifest' });
  scratch.wow.committed(
    'package.json',
    '{"name":"design-ways-of-work","version":"0.1.10","type":"module"}\n',
  );
  scratch.inHand(IN_HAND);
  const before = scratch.wow.git(['rev-parse', 'HEAD']);
  const said = scratch.ran({ script: 'release.ts' });

  it('before a file is written or a commit made', () => {
    expect(said.status).not.toBe(0);
    expect(said.stdout).toContain('holds no "version": "0.1.10"');
    expect(isClean(scratch)).toBe(true);
    expect(scratch.wow.git(['rev-parse', 'HEAD'])).toBe(before);
    expect(said.calls).toEqual([]);
  });
});
