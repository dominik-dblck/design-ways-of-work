/**
 * - `HOMES` · each home of the way of working and where it lands in a product
 * - `filesOfHomes` · each file of the homes named: [in wow, in the product]
 */
import fs from 'node:fs';
import path from 'node:path';

// design/ lands on the product's own paths; the others keep their folder
const HOMES: Readonly<Record<string, string>> = {
  design: '',
  dev: 'dev',
  shared: 'shared',
  'design-system': 'design-system',
};

function filesUnder(folder: string): readonly string[] {
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== '.DS_Store')
    .map((entry) =>
      path.relative(folder, path.join(entry.parentPath, entry.name)),
    );
}

// a home wow does not have is a mistake in the product's list, so the take stops on it
function filesOfHomes({
  source,
  homes,
}: {
  readonly source: string;
  readonly homes: readonly string[];
}): readonly (readonly [string, string])[] {
  return homes.flatMap((home) => {
    const at = HOMES[home];
    if (at === undefined)
      throw new Error(
        `${home} is no home of the way of working: ${Object.keys(HOMES).join(', ')}`,
      );
    return filesUnder(path.join(source, home)).map(
      (file) => [path.join(source, home, file), path.join(at, file)] as const,
    );
  });
}

export { filesOfHomes, HOMES };
