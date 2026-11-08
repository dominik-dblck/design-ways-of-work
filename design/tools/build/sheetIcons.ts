/**
 * - `copySheetIcons` · each lucide icon the sheet names, written from the package
 * - at lucide-icons/<name>.svg over any copy there (D10); one it lacks fails
 */
import fs from 'node:fs';
import path from 'node:path';
import { filesOf } from '../layout.ts';
import { ROOT } from '../root.ts';

const NAMED = /lucide-icons\/([a-z0-9-]+)\.svg/g;
const PACKAGE = path.join(ROOT, 'node_modules', 'lucide-static', 'icons');

// the icons the sheet's rows name, each once
const namedIcons = (): ReadonlySet<string> =>
  new Set(
    filesOf()
      .filter((file) => file.startsWith('sheet/') && file.endsWith('.ts'))
      .flatMap((file) =>
        [...fs.readFileSync(path.join(ROOT, file), 'utf8').matchAll(NAMED)].map(
          (found) => String(found[1]),
        ),
      ),
  );

function copySheetIcons(out: string): number {
  const names = namedIcons();
  for (const name of names) {
    const from = path.join(PACKAGE, `${name}.svg`);
    if (!fs.existsSync(from))
      throw new Error(
        `lucide-static has no ${name}.svg, which the sheet names`,
      );
    const to = path.join(out, 'lucide-icons', `${name}.svg`);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
  return names.size;
}

export { copySheetIcons };
