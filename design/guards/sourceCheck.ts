/**
 * - `codeScan`, `ownModules`, `twiceCheck`, `fileHeads` · copies
 * - `contentCheck`, `architecture` · the content's findings, the view of it all
 * - `sourceLayers`, `requirementReads`, `ratchet`, `sourceScope` · layers, counts
 */
export { architecture } from './sourceCheck/architecture.ts';
export { scan, scanAll } from './sourceCheck/codeScan.ts';
export {
  MODULE_ENTRIES as moduleEntries,
  MODULE_IMPORTS as moduleImports,
  ownModulesText,
} from './sourceCheck/ownModules.ts';
export { aboutCheck } from './sourceCheck/fileHeads.ts';
export { contentCheck } from './sourceCheck/contentFindings.ts';
export {
  BASELINE as baseline,
  copies,
  findingCounts,
  frozen,
  ratchet,
  summary,
} from './sourceCheck/ratchet.ts';
export { readList, targets } from './sourceCheck/requirementReads.ts';
export {
  branchesCheck,
  LAYERS as layers,
  layersCheck,
  readsOf,
} from './sourceCheck/sourceLayers.ts';
export { MAP as map, SCOPE as scope } from './sourceCheck/sourceScope.ts';
export { twiceCheck } from './sourceCheck/twiceCheck.ts';
export type { MapMove, SourceFinding } from './sourceCheck/sourceCheckTypes.ts';
