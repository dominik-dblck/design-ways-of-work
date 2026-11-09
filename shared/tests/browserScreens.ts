/**
 * - `tierAt`, `screensOf` · a scope's browser tier, null when none, and its screens
 * - `catalogOf`, `statusOf`, `statusFileOf`, `Catalog` · a screen's flows and status
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { FLOW_PATHS } from '../e2e/flowPaths.ts';
import type { FlowPath } from '../e2e/flowPaths.ts';
import type { BrowserTier } from '../browserTypes.ts';
import type { RepoScope } from '../repoScope.ts';

interface CatalogEntry {
  readonly userType: string;
  readonly paths: readonly FlowPath[];
}

type Catalog = Readonly<Record<string, CatalogEntry>>;

// where a tier sits: the repository's root and its scope's paths
interface Tier {
  readonly root: string;
  readonly tier: BrowserTier;
}

const tierAt = ({ root, browser }: RepoScope): Tier | null =>
  'none' in browser ? null : { root, tier: browser };

const catalogFile = ({ root, tier }: Tier, screen: string): string =>
  path.join(
    root,
    tier.screensRoot,
    screen,
    'testingFlows',
    `${screen}FlowsCatalog.ts`,
  );

// every screen the tier holds a catalogue for: read off the folders, never listed
const screensOf = (at: Tier): readonly string[] =>
  fs
    .readdirSync(path.join(at.root, at.tier.screensRoot), {
      withFileTypes: true,
    })
    .filter(
      (entry) =>
        entry.isDirectory() && fs.existsSync(catalogFile(at, entry.name)),
    )
    .map((entry) => entry.name)
    .sort();

const isFlowPath = (kind: unknown): kind is FlowPath =>
  FLOW_PATHS.some((one) => one === kind);

const isEntry = (entry: unknown): entry is CatalogEntry =>
  typeof entry === 'object' &&
  entry !== null &&
  typeof Reflect.get(entry, 'userType') === 'string' &&
  Array.isArray(Reflect.get(entry, 'paths')) &&
  [Reflect.get(entry, 'paths')].flat().length > 0 &&
  [Reflect.get(entry, 'paths')].flat().every(isFlowPath);

const isCatalog = (catalog: unknown): catalog is Catalog =>
  typeof catalog === 'object' &&
  catalog !== null &&
  Object.values(catalog).every(isEntry);

const catalogOf = async (at: Tier, screen: string): Promise<Catalog> => {
  const loaded: unknown = await import(
    pathToFileURL(catalogFile(at, screen)).href
  );
  const catalog: unknown =
    typeof loaded === 'object' && loaded !== null
      ? Reflect.get(loaded, `${screen}FlowsCatalog`)
      : undefined;
  if (!isCatalog(catalog))
    throw new Error(
      `${screen} · its catalogue's entries each name a user type and a path FLOW_PATHS holds`,
    );
  return catalog;
};

const statusFileOf = ({ tier }: Tier, screen: string): string =>
  path.join(tier.statusRoot, `${screen}-status.md`);

const statusOf = (at: Tier, screen: string): string | null => {
  const file = path.join(at.root, statusFileOf(at, screen));
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
};

export { catalogOf, screensOf, statusFileOf, statusOf, tierAt };
export type { Catalog };
