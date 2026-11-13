/**
 * - `tools/layout.ts` is the homes' map: a file git holds or would add under a
 *   home's first folder stands in a home it names, or the build writes it
 */
import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { emitted, homes, ROOT } from '../../tools/layout.ts';

const inside = (file: string, folder: string): boolean =>
  file === folder || file.startsWith(`${folder}/`);

const firstStepOf = (file: string): string => file.split('/')[0] ?? '';

// a file under a folder some home stands in, and in no home itself
function offTheMap({
  files,
  sources,
}: {
  readonly files: readonly string[];
  readonly sources: readonly string[];
}): readonly string[] {
  const roots = new Set(sources.map(firstStepOf));
  return files.filter(
    (file) =>
      file.includes('/') &&
      roots.has(firstStepOf(file)) &&
      !sources.some((source) => inside(file, source)),
  );
}

const heldByGit = (): readonly string[] =>
  execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard'],
    { cwd: ROOT, encoding: 'utf8' },
  )
    .split('\n')
    .filter((file) => file !== '');

describe('the homes are the tree', () => {
  it('a file in a folder no home names is found; one in a home, at the root or under no home root, is not', () => {
    expect(
      offTheMap({
        files: [
          'app/components/Card/Card.tsx',
          'app/hooks/useCard.ts',
          'docs/rules/naming.ts',
          'docs/notes.md',
          'sheet/project.ts',
          'README.md',
          'scripts/build.ts',
        ],
        sources: ['app/components', 'docs/rules', 'sheet'],
      }),
    ).toStrictEqual(['app/hooks/useCard.ts', 'docs/notes.md']);
  });

  it('every file git holds under a home root stands in a home, or the build writes it', () => {
    const files = heldByGit();
    expect(files.length, 'git lists the tree').toBeGreaterThan(0);
    const sources = [
      ...homes().map((home) => home.source),
      ...emitted().map((row) => row.fixture),
    ];
    expect(offTheMap({ files, sources })).toStrictEqual([]);
  });
});
