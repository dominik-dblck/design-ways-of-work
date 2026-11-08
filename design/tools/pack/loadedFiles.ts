/**
 * - `loadedSection` · every source a root of the pack loads, closed over the
 * - globals each bundle reads, and every fixture measure names, with its digest
 */
import type { Mirror } from '../../guards/checks/checkWorld.ts';
import { entryOfModule, publishedOf } from '../layout.ts';
import type { Cut } from './fileLines.ts';
import { bytesOf, sha256 } from './packSources.ts';
import type { Source } from './packSources.ts';

const BUILT_IN =
  /^(Object|Array|JSON|Math|Date|Promise|String|Number|Boolean|Error|TextEncoder|React|ReactDOM|DCLogic|Intl|Set|Map|RegExp|Symbol)$/;
const SETS = /\b(?:root|window|globalThis)\.([A-Z][A-Za-z0-9]+)\s*=(?!=)/g;
const READS = /\b(?:root|window|globalThis)\.([A-Z][A-Za-z0-9]+)/g;

// a root is a file the pack states a digest for
function rootsOf(md: string): ReadonlySet<string> {
  const quoted =
    /^_([\w./-]+\.(?:ts|js|json))_ · [^\n]*?sha256 [0-9a-f]{12,64}/gm;
  const listed = /^- ([\w./-]+\.(?:ts|js|json)) · [^\n]*sha256 [0-9a-f]{64}/gm;
  return new Set(
    [...md.matchAll(quoted), ...md.matchAll(listed)].map((one) =>
      String(one[1]),
    ),
  );
}

// the bundle a source is built into: a part of sheet/contract/commands.ts is commands.js
const sheetOfSource = (file: string): string =>
  (publishedOf(entryOfModule(file)) ?? file).replace(/\.ts$/, '.js');

// each global's bundle: the first that sets it
function ownersOf(
  bundles: ReadonlyMap<string, string>,
): ReadonlyMap<string, string> {
  const owner = new Map<string, string>();
  for (const [file, text] of bundles)
    for (const set of text.matchAll(SETS))
      if (!owner.has(String(set[1]))) owner.set(String(set[1]), file);
  return owner;
}

// each global a bundle reads is the bundle that sets it, closed over; a global none sets is a miss
function closure(
  start: readonly string[],
  {
    bundles,
    miss,
  }: {
    readonly bundles: ReadonlyMap<string, string>;
    readonly miss: (text: string) => void;
  },
): ReadonlySet<string> {
  const owner = ownersOf(bundles);
  const seen = new Set<string>();
  const queue = [...start];
  for (let file = queue.shift(); file !== undefined; file = queue.shift()) {
    if (seen.has(file)) continue;
    seen.add(file);
    const names = [...String(bundles.get(file)).matchAll(READS)].map((read) =>
      String(read[1]),
    );
    for (const name of names) {
      const from = owner.get(name);
      if (from === undefined && !BUILT_IN.test(name))
        miss(`loaded · ${file} reads ${name}, which no file assigns`);
      if (from !== undefined && !seen.has(from)) queue.push(from);
    }
  }
  return seen;
}

// every file the repository holds as a fixture, measure itself hashed from outside
function fixturesOf(cut: Cut): readonly string[] {
  const text = cut.reader.read('measure/measureFiles.ts') ?? '';
  const lists = text.matchAll(
    /const [A-Z_]*FIXTURES: readonly string\[\] = \[([^\]]*)\]/g,
  );
  return [
    ...[...lists].flatMap((entry) =>
      [...String(entry[1]).matchAll(/'([^']+)'/g)].map((one) => String(one[1])),
    ),
    'measure.js',
  ].filter((file) => !file.includes('/'));
}

function loadedSection(
  md: string,
  { cut, mirror }: { readonly cut: Cut; readonly mirror: Mirror },
): string {
  const roots = rootsOf(md);
  const bundles = new Map(
    mirror
      .list('')
      .filter((file) => /\.js$/.test(file))
      .map((file) => [file, mirror.read(file)]),
  );
  const sheets = [...roots]
    .map(sheetOfSource)
    .filter((file) => bundles.has(file));
  const seen = [
    ...closure(sheets, { bundles, miss: cut.miss }),
    ...fixturesOf(cut),
  ];
  const files = new Map<string, Source>();
  for (const name of seen)
    for (const source of cut.reader.sourcesOf(name))
      if (!roots.has(source.path)) files.set(source.path, source);
  const listed = [...files.values()].sort((one, two) =>
    one.path < two.path ? -1 : 1,
  );
  return [
    `## The files the roots load · ${listed.length}`,
    '',
    'Every source of each sheet a root of this pack loads, closed over the globals each one reads, and every file the repository holds as a fixture (measure.ts), with the digest of its bytes on this side: copy a root with all of these, or with none (PM, 27 Oct).',
    '',
    ...listed.map(
      (one) =>
        `- ${one.path} · ${bytesOf(one.text)} B · sha256 ${sha256(one.text)}`,
    ),
    '',
  ].join('\n');
}

export { loadedSection };
