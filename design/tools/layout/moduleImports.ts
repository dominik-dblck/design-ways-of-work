/**
 * - `importedEntries` · the entries a module imports at run time, from its own files
 * - a module is its entry and its parts; an import of a type alone is no read
 */
import fs from 'node:fs';
import path from 'node:path';

// an import or a re-export with a relative path, `import type` and `export type` marked
const AN_IMPORT =
  /^\s*(?:import|export)\s+(type\s+)?(?:[^'";]*?\s+from\s+)?['"](\.[^'"]+\.ts)['"]/gm;

// each entry the module's files import, its own aside, in path order
function importedEntries(
  files: readonly string[],
  {
    root,
    entryOf,
  }: { readonly root: string; readonly entryOf: (file: string) => string },
): readonly string[] {
  const own = new Set(files.map(entryOf));
  const found = files.flatMap((file) =>
    [...fs.readFileSync(path.join(root, file), 'utf8').matchAll(AN_IMPORT)]
      .filter((match) => match[1] === undefined)
      .map((match) =>
        entryOf(
          path.posix.normalize(
            path.posix.join(path.posix.dirname(file), String(match[2])),
          ),
        ),
      ),
  );
  return [...new Set(found)].filter((entry) => !own.has(entry)).sort();
}

export { importedEntries };
