/**
 * - `readStarts` · what a read starts from beside the entries, for knip
 * - each page the build bundles, each module printed as data, each read by name
 */
import { emitted, filesOf, pageOf } from './layout.ts';
import { buildReads } from '../sheet/project.ts';

// the build side reads some modules by name alone: no import of ours reaches them
function readStarts(): readonly string[] {
  return [
    ...filesOf().filter((file) => pageOf(file) !== null),
    ...emitted().map((one) => one.module),
    ...Object.keys(buildReads.names),
  ];
}

export { readStarts };
