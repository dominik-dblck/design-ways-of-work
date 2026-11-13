import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { HERE } from '../../scripts/repos.ts';
import { childEnv } from '../../scripts/scratch.ts';
import { belowOf, emptied } from '../../shared/emptied.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-scratch-'));
const scratch = path.join(base, 'scratch');
const outside = path.join(base, 'kept');

const holding = (folder: string): string => {
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'file.txt'), 'held');
  return folder;
};

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('a folder is emptied below the scratch alone', () => {
  it('a folder below the scratch is made new', () => {
    const folder = holding(path.join(scratch, 'one', 'clone'));
    expect(emptied({ within: scratch, folder })).toBe(folder);
    expect(fs.readdirSync(folder)).toEqual([]);
  });

  it.each([
    ['the scratch itself', scratch],
    ['a folder beside the scratch', outside],
    ['a path that climbs out of it', path.join(scratch, '..', 'kept')],
    ["the scratch's parent", base],
  ])('%s is refused, and nothing is removed', (_, folder) => {
    holding(scratch);
    holding(outside);
    expect(() => emptied({ within: scratch, folder })).toThrow(
      'nothing removed',
    );
    expect(fs.existsSync(path.join(scratch, 'file.txt'))).toBe(true);
    expect(fs.existsSync(path.join(outside, 'file.txt'))).toBe(true);
  });

  it('a folder whose name starts with two dots is below, and made new', () => {
    const folder = holding(path.join(scratch, '..cache'));
    expect(emptied({ within: scratch, folder })).toBe(folder);
    expect(fs.readdirSync(folder)).toEqual([]);
  });

  it('a link below the scratch that leads out of it is refused, and nothing is removed', () => {
    holding(scratch);
    const kept = holding(path.join(outside, 'x'));
    const link = path.join(scratch, 'link');
    fs.symlinkSync(outside, link);
    expect(() =>
      emptied({ within: scratch, folder: path.join(link, 'x') }),
    ).toThrow('nothing removed');
    expect(fs.existsSync(path.join(kept, 'file.txt'))).toBe(true);
    fs.unlinkSync(link);
  });
});

describe('where a folder stands within another', () => {
  it.each([
    ['the folder itself', scratch, ''],
    ['a folder below it', path.join(scratch, 'one'), 'one'],
    ['a name with two dots first', path.join(scratch, '..new'), '..new'],
    ['a folder beside it', outside, null],
    ['a path that climbs out of it', path.join(scratch, '..', 'kept'), null],
  ])('%s', (_, folder, below) => {
    holding(scratch);
    expect(belowOf({ within: scratch, folder })).toBe(below);
  });

  it('a link outside that leads into it stands where it leads', () => {
    holding(path.join(scratch, 'deep'));
    const link = path.join(base, 'into');
    fs.symlinkSync(path.join(scratch, 'deep'), link);
    expect(belowOf({ within: scratch, folder: path.join(link, 'new') })).toBe(
      path.join('deep', 'new'),
    );
    fs.unlinkSync(link);
  });
});

describe("a child's environment holds none of git's names for one repository", () => {
  it('what a hook hands down is left out, the rest is kept', () => {
    expect(
      childEnv({
        GIT_DIR: '.git',
        GIT_INDEX_FILE: '.git/index',
        GIT_AUTHOR_NAME: 'kept: no repository is named by it',
        PATH: '/usr/bin',
      }),
    ).toEqual({
      GIT_AUTHOR_NAME: 'kept: no repository is named by it',
      PATH: '/usr/bin',
    });
  });
});

describe('a check that clones is named, so a clone never clones again', () => {
  const scripts: Readonly<Record<string, unknown>> = Object(
    Reflect.get(
      Object(
        JSON.parse(fs.readFileSync(path.join(HERE, 'package.json'), 'utf8')),
      ),
      'scripts',
    ),
  );
  // a script that builds a clone names the scratch it builds it in
  const namesTheScratch = (script: string): boolean => {
    const file = /^node (scripts\/\S+\.ts)/.exec(String(scripts[script]))?.[1];
    return (
      file !== undefined &&
      /\bSCRATCH\b/.test(fs.readFileSync(path.join(HERE, file), 'utf8'))
    );
  };

  it('each check of the feature end that names the scratch is one the scope names, and no other', () => {
    expect(scope.checks.featureEnd.filter(namesTheScratch).sort()).toEqual(
      [...scope.checks.cloning].sort(),
    );
  });
});
