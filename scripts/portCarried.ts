/**
 * - `isCarried` · a trunk's change a home holds now, named by its row in `ports/`
 * - `carriedDropped` · each file the trunk added that a home holds, out of the merge
 */
import type { Port } from './portTypes.ts';

type Git = (
  args: readonly string[],
  how?: { readonly mayFail: boolean },
) => string;

const isCarried = (
  port: Port,
  { file, blob }: { readonly file: string; readonly blob?: string },
): boolean =>
  port.carried.some((row) => row.file === file && row.blob === blob);

// a file the merge staged at the blob its row names, which the branch never held: the home's form stands for it
function carriedDropped(git: Git, port: Port): readonly string[] {
  return port.carried
    .filter(({ file, blob }) => {
      const staged = git(['ls-files', '-s', '--', file]).split(/\s+/)[1];
      return staged === blob && git(['ls-tree', 'HEAD', '--', file]) === '';
    })
    .map(({ file }) => {
      git(['rm', '-q', '-f', '--', file]);
      return `CARRIED · ${file} · the trunk added it, its home holds it`;
    });
}

export { carriedDropped, isCarried };
