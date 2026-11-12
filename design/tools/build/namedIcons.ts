/**
 * - `copyNamedIcons` · each lucide icon a source names, written from the package
 * - at lucide-icons/<name>.svg (W40); a name the package lacks fails the build
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { filesOf } from '../layout.ts';
import { ROOT } from '../root.ts';

const NAMED = /lucide-icons\/([a-z0-9-]+)\.svg/g;
// the package where node finds it, so the dependency reads as one
const PACKAGE = path.join(
  path.dirname(
    fileURLToPath(import.meta.resolve('lucide-static/package.json')),
  ),
  'icons',
);

// the icons any source names, each once
const namedIcons = (): ReadonlySet<string> =>
  new Set(
    filesOf()
      .filter((file) => /\.tsx?$/.test(file))
      .flatMap((file) =>
        [...fs.readFileSync(path.join(ROOT, file), 'utf8').matchAll(NAMED)].map(
          (found) => String(found[1]),
        ),
      ),
  );

function copyNamedIcons(out: string): number {
  const names = namedIcons();
  for (const name of names) {
    const from = path.join(PACKAGE, `${name}.svg`);
    if (!fs.existsSync(from))
      throw new Error(`lucide-static has no ${name}.svg, which a source names`);
    const to = path.join(out, 'lucide-icons', `${name}.svg`);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
  return names.size;
}

export { copyNamedIcons };
