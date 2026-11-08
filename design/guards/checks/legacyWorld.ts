/**
 * - `legacyWorld` · a page's window, every bundle a legacy page reads run in it
 * - the one place the checks run bundles: it leaves with the last legacy page
 */
import { loadAll, pageWorld } from './checkWorld.ts';
import type { Mirror, World } from './checkWorld.ts';

// a legacy page's inline script reads these globals: each bundle carries its own imports
const PAGE_BUNDLES: readonly string[] = [
  'glossary.js',
  'messages.js',
  'messages-content.js',
  'languages.js',
  'directory.js',
  'gate-states.js',
  'block-rules.js',
  'content-types.js',
  'content-modules.js',
  'content-assembly.js',
  'blocks.js',
  'field-kinds.js',
  'events.js',
  'sample-run.js',
  'commands.js',
  'refusals.js',
  'gate-rules.js',
  'scenes.js',
  'translation-flow.js',
  'role-combinations.js',
  'approval-logic.js',
  'sheet-status.js',
  'delivery-flow.js',
  'content-check.js',
  'content-type-logic.js',
  'catalog.js',
  'content-samples.js',
  'content-list.js',
  'screen-view.js',
  'wireframes.js',
];

function legacyWorld(mirror: Mirror): World {
  const world = pageWorld();
  loadAll(world, { mirror, files: PAGE_BUNDLES });
  return world;
}

export { legacyWorld };
