/**
 * - `moduleNeeds` · the files a module waits for, or names when it throws
 * - `pageScriptsCheck` · a page loading a module without what that module needs
 * - `contentCheck` · the modules' and the delivery's checks, each line a finding
 */
import type { SourceFinding, Texts } from './sourceCheckTypes.ts';

const topModules = (texts: Texts): readonly string[] =>
  Object.keys(texts).filter(
    (file) => /\.js$/.test(file) && !file.includes('/'),
  );

// each global read back to the first file that assigns it
function globalHomes(texts: Texts): ReadonlyMap<string, string> {
  const homes = new Map<string, string>();
  for (const file of topModules(texts))
    for (const found of String(texts[file]).matchAll(
      /(?:root|window|globalThis)\.([A-Z]\w*)\s*=\s*(?!=)/g,
    ))
      if (!homes.has(String(found[1]))) homes.set(String(found[1]), file);
  return homes;
}

// a wait on a global (whenAll, whenGlobal), or an error saying what to load first
function namedNeeds(
  text: string,
  homes: ReadonlyMap<string, string>,
): readonly (string | undefined)[] {
  const waits = (text.match(/whenAll\(\s*\[[^\]]*\]/g) ?? []).flatMap((found) =>
    (found.match(/'([A-Z]\w*)'/g) ?? []).map((quoted) =>
      homes.get(quoted.slice(1, -1)),
    ),
  );
  const globals = (text.match(/whenGlobal\(\s*'[A-Z]\w*'/g) ?? []).map(
    (found) => homes.get(String(/'([A-Z]\w*)'/.exec(found)?.[1])),
  );
  const thrown = (
    text.match(/throw new Error\(\s*('|"|`)(?:(?!\1)[^\n]){0,160}\1/g) ?? []
  )
    .filter((found) => /load|need|first/.test(found))
    .flatMap((found) => found.match(/[\w-]+\.js/g) ?? []);
  return [...waits, ...globals, ...thrown];
}

function moduleNeeds(
  texts: Texts,
): Readonly<Record<string, readonly string[]>> {
  const homes = globalHomes(texts);
  return Object.fromEntries(
    topModules(texts)
      .map((file): readonly [string, readonly string[]] => [
        file,
        [
          ...new Set(
            namedNeeds(String(texts[file]), homes).filter(
              (need): need is string =>
                Boolean(need) && need !== file && texts[need ?? ''] != null,
            ),
          ),
        ],
      ])
      .filter(([, needs]) => needs.length > 0),
  );
}

function pageScriptsCheck(texts: Texts): readonly SourceFinding[] {
  const needs = moduleNeeds(texts);
  const pages = Object.keys(texts).filter(
    (file) => /\.dc\.html$/.test(file) && !file.includes('/'),
  );
  return pages.flatMap((page) => {
    const loaded = (
      String(texts[page]).match(/<script src="\.?\/?[\w.-]+\.js"/g) ?? []
    ).map((tag) => String(/([\w.-]+\.js)/.exec(tag)?.[1]));
    return loaded.flatMap((file) =>
      (needs[file] ?? [])
        .filter((need) => !loaded.includes(need))
        .map((need) => ({
          kind: 'script without its need',
          row: 'a page loads what its modules need (PM, 23 Oct)',
          file: page,
          line: 0,
          text: `${file} needs ${need}`,
        })),
    );
  });
}

type ContentWorld = {
  readonly ContentCheck?: { readonly contentFindings: () => readonly string[] };
};

function contentCheck(world?: ContentWorld | null): readonly SourceFinding[] {
  const check = world?.ContentCheck;
  if (!check) return [];
  return check.contentFindings().map((text) => ({
    kind: 'content',
    row: 'modules and delivery (T23, T28, T55)',
    file: 'content-check.js',
    line: 0,
    text,
  }));
}

export { contentCheck, moduleNeeds, pageScriptsCheck };
