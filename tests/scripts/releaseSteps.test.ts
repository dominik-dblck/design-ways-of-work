import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  bumped,
  changelogText,
  leftSince,
} from '../../scripts/releaseSteps.ts';
import { scratchRepo } from './scratchRepo.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-release-'));

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('the version a release takes', () => {
  it.each([
    ['patch', '0.1.11'],
    ['minor', '0.2.0'],
    ['major', '1.0.0'],
  ] as const)('a %s release after 0.1.10 is %s', (kind, version) => {
    expect(bumped('0.1.10', kind)).toBe(version);
  });

  it('a version that is not three numbers is refused', () => {
    expect(() => bumped('1.0', 'patch')).toThrow('no version of three numbers');
  });
});

describe('the paths that moved or left a home since a tag', () => {
  it('a move and a removal are named by home; a file only changed is not', () => {
    const repo = scratchRepo({ base, name: 'homes' });
    repo.committed('design/stays.ts', 'export const stays = 1;\n');
    repo.committed('design/moves.ts', 'export const moves = 1;\n');
    repo.committed('design/leaves.ts', 'export const leaves = 1;\n');
    repo.committed('shared/changes.ts', 'export const changes = 1;\n');
    repo.git(['tag', 'v1']);
    repo.git(['mv', 'design/moves.ts', 'design/moved.ts']);
    repo.git(['rm', '-q', 'design/leaves.ts']);
    repo.git(['commit', '-q', '-m', 'a move and a removal']);
    repo.committed('shared/changes.ts', 'export const changes = 2;\n');
    const left = leftSince({
      root: repo.root,
      tag: 'v1',
      homes: ['design', 'shared', 'dev'],
    });
    expect(Object.keys(left)).toEqual(['design']);
    expect([...(left.design ?? [])].sort()).toEqual([
      'design/leaves.ts → gone',
      'design/moves.ts → design/moved.ts',
    ]);
  });
});

describe("the changelog's file", () => {
  it('holds each release as data, and nothing in hand', () => {
    const text = changelogText([
      {
        version: '0.2.0',
        date: '2026-11-11',
        kind: 'minor',
        what: 'one command',
        action: 'none',
        rules: { added: [], changed: ['file-name'], removed: ['old-key'] },
        outputs: {},
        moved: {},
        tried: { product: 'abc1234' },
      },
    ]);
    expect(text).toContain('"version":"0.2.0"');
    expect(text).toContain('"tried":{"product":"abc1234"}');
    expect(text).toContain(
      '"rules":{"added":[],"changed":["file-name"],"removed":["old-key"]}',
    );
    expect(text).toContain(
      'const NEXT: Unreleased = {"kind":"patch","what":""',
    );
  });
});
