/**
 * - a glob list names its files in the disk's case, a `!` glob and an ignored folder aside
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { filesNamedBy, globsNamingNothing } from './globs.ts';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-globs-'));
afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});
for (const file of [
  '.claude/skills/a/SKILL.md',
  '.claude/skills/b/SKILL.md',
  'legacy/CLAUDE.md',
  'CLAUDE.md',
]) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), '# a\n');
}
const tree = { root, ignores: ['legacy/**'] };

describe('a glob list names its files', () => {
  it('names each file, a `!` glob taking one out, an ignored folder never read', () => {
    expect(
      filesNamedBy(tree, ['.claude/skills/*/SKILL.md', '!.claude/skills/b/**']),
    ).toEqual(['.claude/skills/a/SKILL.md']);
    expect(filesNamedBy(tree, ['**/CLAUDE.md'])).toEqual(['CLAUDE.md']);
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
