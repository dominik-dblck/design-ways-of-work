/**
 * - `resolutionOf` · how a repository's imports resolve, as its tsconfig says
 */
import path from 'node:path';
import ts from 'typescript';

type Resolution = { readonly project: string; readonly symlinks: boolean };

// a linked file keeps its own path when the tsconfig preserves symlinks, as the program does
function resolutionOf(root: string): Resolution {
  const project = path.join(root, 'tsconfig.json');
  const read = ts.readConfigFile(project, (file) => ts.sys.readFile(file));
  const options = ts.parseJsonConfigFileContent(
    read.config,
    ts.sys,
    root,
  ).options;
  return { project, symlinks: options.preserveSymlinks !== true };
}

export { resolutionOf };
