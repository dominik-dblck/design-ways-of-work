/**
 * - a glob list names its files in the disk's case
 * - a `!` glob and an ignored folder aside; a product's tree by its own glob
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { filesNamedBy, globsNamingNothing, isOnDisk } from './globs.ts';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-globs-'));
afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});
for (const file of [
  '.claude/skills/a/SKILL.md',
  '.claude/skills/b/SKILL.md',
  'legacy/CLAUDE.md',
  'CLAUDE.md',
  'product/CLAUDE.md',
  'product/rules/a.ts',
  'product-kit/b.tsx',
]) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), '# a\n');
}
// a skill linked to a file kept elsewhere: the link resolves out of its folder
fs.mkdirSync(path.join(root, 'elsewhere'), { recursive: true });
fs.mkdirSync(path.join(root, '.claude/skills/c'), { recursive: true });
fs.writeFileSync(path.join(root, 'elsewhere/c.md'), '# c\n');
fs.symlinkSync(
  path.join(root, 'elsewhere/c.md'),
  path.join(root, '.claude/skills/c/SKILL.md'),
);
const tree = { root, ignores: ['legacy/**'], productTrees: ['product/**'] };

describe('a glob list names its files', () => {
  it('names each file, a linked one too, a `!` glob taking one out, an ignored folder never read', () => {
    expect(
      filesNamedBy(tree, ['.claude/skills/*/SKILL.md', '!.claude/skills/b/**']),
    ).toEqual(['.claude/skills/a/SKILL.md', '.claude/skills/c/SKILL.md']);
    expect(filesNamedBy(tree, ['**/CLAUDE.md'])).toEqual(['CLAUDE.md']);
  });

  it('a product tree is read by a glob that starts inside it, never by a broad one', () => {
    expect(filesNamedBy(tree, ['**/*.ts'])).toEqual([]);
    expect(filesNamedBy(tree, ['product/**/*.ts', '**/CLAUDE.md'])).toEqual([
      'CLAUDE.md',
      'product/rules/a.ts',
    ]);
  });

  it('a tree named without its `/**` holds its own folder alone, never a sibling sharing its start', () => {
    expect(
      filesNamedBy({ ...tree, productTrees: ['product'] }, [
        'product*/**/*.{ts,tsx}',
      ]),
    ).toEqual(['product-kit/b.tsx']);
    expect(
      filesNamedBy({ ...tree, productTrees: ['product'] }, ['product/**/*.ts']),
    ).toEqual(['product/rules/a.ts']);
  });

  it('a path is on disk as the disk spells it, a folder with its closing slash too', () => {
    expect(isOnDisk(root, 'CLAUDE.md')).toBe(true);
    expect(isOnDisk(root, '.claude/skills/')).toBe(true);
    expect(isOnDisk(root, 'claude.md')).toBe(false);
    expect(isOnDisk(root, '.claude/Skills/a/SKILL.md')).toBe(false);
    expect(isOnDisk(root, 'missing/x.md')).toBe(false);
  });

  it('a glob in the wrong case names nothing, on a disk that ignores case too', () => {
    expect(filesNamedBy(tree, ['.claude/skills/*/SKILL.MD'])).toEqual([]);
    expect(filesNamedBy(tree, ['.claude/SKILLS/a/*.md'])).toEqual([]);
  });

  it('a glob that names no file is found; a `!` glob is never asked to', () => {
    expect(
      globsNamingNothing(tree, ['CLAUDE.md', 'docs/*.md', '!docs/x.md']),
    ).toEqual(['docs/*.md']);
  });
});
