/**
 * - `Mirror`, `mirrorAt` · the built project a run reads and writes, file by file
 * - `pageWorld`, `bareWorld`, `loadAll` · a window, and the bundles run in it
 * - `errorMessageOf`, `parsedOr`, `lineOf`, `tallyOf` · error, JSON, line, tally
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

type World = Record<string, unknown>;

interface Mirror {
  readonly mode: string;
  readonly read: (file: string) => string;
  readonly readOr: (file: string, fallback: string | null) => string | null;
  readonly list: (prefix?: string) => readonly string[];
  readonly save: (file: string, text: string) => void;
  readonly saved: () => readonly string[];
}

type CopyTo = ((file: string) => string | null) | null;

// a file written to the mirror and, when the run saves back, to its home in the repository
function saverAt(
  root: string,
  { copyTo, saved }: { readonly copyTo: CopyTo; readonly saved: Set<string> },
): (file: string, text: string) => void {
  return (file, text) => {
    const home = copyTo ? copyTo(file) : null;
    if (copyTo && home === null)
      throw new Error(`no home in tools/layout.ts takes ${file}`);
    for (const to of [path.join(root, file), ...(home ? [home] : [])]) {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.writeFileSync(to, text);
    }
    saved.add(home ?? file);
  };
}

// the top folder only: a page in a subfolder is not a sheet page
function mirrorAt(
  root: string,
  { mode, copyTo }: { readonly mode: string; readonly copyTo: CopyTo },
): Mirror {
  const saved = new Set<string>();
  const read = (file: string): string => {
    const full = path.join(root, file.replace(/^\.\//, ''));
    if (!fs.existsSync(full)) throw new Error(`not in the mirror: ${file}`);
    return fs.readFileSync(full, 'utf8');
  };
  return {
    mode,
    read,
    readOr: (file, fallback) => {
      try {
        return read(file);
      } catch {
        return fallback;
      }
    },
    list: (prefix) =>
      fs
        .readdirSync(root, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .sort()
        .filter((name) => !prefix || name.startsWith(prefix)),
    save: saverAt(root, { copyTo, saved }),
    saved: () => [...saved],
  };
}

// a page's window: what the bundles touch when they load
function pageWorld(): World {
  const world: World = {
    document: {
      querySelectorAll: () => [],
      getElementById: () => null,
      addEventListener() {},
    },
    addEventListener() {},
    location: { pathname: '/' },
  };
  world.window = world;
  return world;
}

function bareWorld(): World {
  const world: World = { document: { querySelectorAll: () => [] } };
  world.window = world;
  return world;
}

// a bundle the project built, run as a page runs it: its window, globalThis and self are the world
function runIn(world: World, text: string): void {
  vm.compileFunction(text, ['window', 'globalThis', 'self'])(
    world,
    world,
    world,
  );
}

// a JSON text's value, undefined when it is none
function parsedOr(text: string | null): unknown {
  try {
    return text == null ? undefined : JSON.parse(text);
  } catch {
    return undefined;
  }
}

function errorMessageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// each file run in order; a file that throws is handed to failed, the rest still load
function loadAll(
  world: World,
  {
    mirror,
    files,
    failed,
  }: {
    readonly mirror: Mirror;
    readonly files: readonly string[];
    readonly failed?: (file: string, message: string) => void;
  },
): void {
  for (const file of files)
    try {
      runIn(world, mirror.read(file));
    } catch (error) {
      failed?.(file, errorMessageOf(error));
    }
}

function lineOf(
  name: string,
  { ok, text }: { readonly ok: boolean; readonly text: string },
): string {
  return `${ok ? 'OK  ' : 'FAIL'} · ${name} · ${text}`;
}

function tallyOf(lines: readonly string[]): string {
  return lines.every((line) => /^OK/.test(line))
    ? 'ALL GREEN'
    : `${lines.filter((line) => /^FAIL/.test(line)).length} FAILED`;
}

export {
  bareWorld,
  lineOf,
  loadAll,
  errorMessageOf,
  mirrorAt,
  pageWorld,
  parsedOr,
  tallyOf,
};
export type { Mirror, World };
