import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { hooksInstalled } from '../../scripts/hooksInstalled.ts';
import { scratchRepo } from './scratchRepo.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-hooks-'));

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe("git runs a checkout's hooks once they are installed", () => {
  const repo = scratchRepo({ base, name: 'clone' });

  it('a fresh clone runs none', () => {
    expect(hooksInstalled(repo.root)).toBe(false);
  });

  it('hooks set to another folder are not the ones yarn hooks puts', () => {
    repo.git(['config', 'core.hooksPath', '.githooks']);
    expect(hooksInstalled(repo.root)).toBe(false);
  });

  it('set where yarn hooks puts them, they run', () => {
    repo.git(['config', 'core.hooksPath', '.husky/_']);
    expect(hooksInstalled(repo.root)).toBe(true);
  });
});
