import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { emptied } from '../../scripts/scratch.ts';

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
    expect(emptied({ scratch, folder })).toBe(folder);
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
    expect(() => emptied({ scratch, folder })).toThrow('nothing removed');
    expect(fs.existsSync(path.join(scratch, 'file.txt'))).toBe(true);
    expect(fs.existsSync(path.join(outside, 'file.txt'))).toBe(true);
  });
});
