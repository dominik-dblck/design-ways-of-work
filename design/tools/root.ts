/**
 * - `ROOT`, `BUILT` · the repository's folder, and the project built in it
 * - `builtRoot` · the built project a tool reads: DESIGN_MIRROR names another one
 */
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const BUILT = path.join(ROOT, 'dist', 'project');

const builtRoot = (): string =>
  path.resolve(process.env.DESIGN_MIRROR || BUILT);

export { BUILT, builtRoot, ROOT };
