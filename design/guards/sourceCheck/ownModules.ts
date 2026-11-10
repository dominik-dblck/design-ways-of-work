/**
 * - `ownModulesText` · a bundle's own modules, each entry it imports a global read
 * - `MODULE_ENTRIES`, `MODULE_IMPORTS` · the build's maps: entries, reads
 * - an entry's files and reads are the layout's: handed in, never worked out
 */

const MODULE_ENTRIES = 'module-entries.json';
const MODULE_IMPORTS = 'module-imports.json';

// the line a bundle opens each module with: a tab, then the module's path
const A_MODULE = /^\t\/\/ ([\w./-]+\.ts)$/gm;
// where a bundle's own code ends: its exports, then the line that sets its global
const THE_TAIL = /^\t(?:exports\.\w+ =|return exports;)/m;

interface Module {
  readonly entry: string;
  readonly at: number;
}

const baseOf = (file: string): string =>
  file.slice(file.lastIndexOf('/') + 1).replace(/\.ts$/, '');

const globalOf = (entry: string): string =>
  baseOf(entry)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

// the bundle's head, its own modules, a read of each entry its files import, then its tail
function ownModulesText(
  text: string,
  {
    name,
    entryOf,
    importsOf,
  }: {
    readonly name: string;
    readonly entryOf: (file: string) => string;
    readonly importsOf: (entry: string) => readonly string[];
  },
): string {
  const modules: readonly Module[] = [...text.matchAll(A_MODULE)].map(
    (found) => ({ entry: entryOf(String(found[1])), at: found.index }),
  );
  const own = modules.find((one) => baseOf(one.entry) === name)?.entry;
  const first = modules[0];
  if (own === undefined || first === undefined) return text;
  const last = modules[modules.length - 1]?.at ?? first.at;
  const tail = text.slice(last).search(THE_TAIL);
  const end = tail < 0 ? text.length : last + tail;
  const imported = importsOf(own).map(
    (entry) => `\tglobalThis.${globalOf(entry)};\n`,
  );
  const kept = modules.flatMap((module, index) =>
    module.entry === own
      ? [text.slice(module.at, modules[index + 1]?.at ?? end)]
      : [],
  );
  return [text.slice(0, first.at), ...kept, ...imported, text.slice(end)].join(
    '',
  );
}

export { MODULE_ENTRIES, MODULE_IMPORTS, ownModulesText };
