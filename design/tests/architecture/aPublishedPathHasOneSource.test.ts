/**
 * - `tools/layout.ts`: each published path has one file in the repository (D18)
 * - a file's published path leads back to it, and no two files publish to one path
 */
import { describe, expect, it } from 'vitest';
import { filesOf, isEntry, publishedOf, sourceOf } from '../../tools/layout.ts';

// what lands in dist: an entry as its bundle, every other file but TypeScript as it is
function publishedFiles(): readonly (readonly [string, string])[] {
  return filesOf().flatMap((file): readonly (readonly [string, string])[] => {
    const published = publishedOf(file);
    if (published === null) return [];
    if (isEntry(file)) return [[file, published.replace(/\.ts$/, '.js')]];
    return file.endsWith('.ts') ? [] : [[file, published]];
  });
}

describe('a published path has one source', () => {
  it('no two files of the homes publish to one path', () => {
    const seen = new Map<string, string[]>();
    for (const [file, published] of publishedFiles())
      seen.set(published, [...(seen.get(published) ?? []), file]);
    expect(
      [...seen].filter(([, files]) => files.length > 1).map(([at]) => at),
    ).toEqual([]);
  });

  it('a published path leads back to its file', () => {
    expect(
      filesOf().filter((file) => {
        const published = publishedOf(file);
        return published !== null && sourceOf(published) !== file;
      }),
    ).toEqual([]);
  });

  it('a new file takes the one home whose folder its path names', () => {
    expect(sourceOf('packs/T-E99-00.md')).toBe('fixtures/packs/T-E99-00.md');
    expect(sourceOf('scraps/guardMap.ts')).toBe(
      'guards/__snapshots__/guardMap.ts',
    );
    expect(sourceOf('nowhere-yet.json')).toBeNull();
  });
});
