/**
 * - `architecture` · each file the run read: its layer, its header, its readers
 * - each copy drawn to its home, each fact's move; the findings are never recounted
 */
import { aboutOf, fileHeadOf } from './fileHeads.ts';
import { linksOf, tallied, totalOf } from './fileLinks.ts';
import { callOf, usesOf } from './fileUses.ts';
import { exportsOf } from './bundleExports.ts';
import { copies, findingCounts } from './ratchet.ts';
import { targets } from './requirementReads.ts';
import { LAYERS, layerOf, readsOf } from './sourceLayers.ts';
import { MAP, SCOPE } from './sourceScope.ts';
import type {
  DrawnFiles,
  FileNode,
  SourceFinding,
  GuardMap,
  MapOptions,
  NodeBase,
  Texts,
  UseRow,
} from './sourceCheckTypes.ts';

// a reader of layer 6 is a test's example: it checks the file, it does not use it
const inTests = (one: UseRow): boolean => one.layer >= 6 && one.layer < 7;

function nodeOf(
  base: NodeBase,
  {
    drawn,
    counts,
  }: {
    readonly drawn: DrawnFiles;
    readonly counts?: ReadonlyMap<string, number> | undefined;
  },
): FileNode {
  const { file } = base;
  const text = drawn.texts[file];
  const head = fileHeadOf(file, text);
  const own = drawn.reads[file];
  const used = drawn.uses.get(file) ?? [];
  return {
    ...base,
    findings: Object.fromEntries(counts ?? []),
    total: totalOf(counts),
    answers: head.answers,
    holds: head.holds,
    exposes: {
      globals: own ? own.exports : [],
      names:
        /\.js$/.test(file) && text != null
          ? exportsOf(String(text)).map((one) => one.name)
          : [],
    },
    reads: (own?.reads ?? []).map((read) => {
      const call = callOf(text, {
        line: read.line,
        globals: drawn.reads[read.file]?.exports ?? [],
      });
      return { file: read.file, line: call.line, code: call.code };
    }),
    usedBy: used.filter((one) => !inTests(one)),
    checkedBy: used.filter(inTests),
  };
}

// the layered files and the ported ones first, then each file a copy names
function registry(texts: Texts): {
  readonly known: ReadonlyMap<string, NodeBase>;
  readonly add: (file: string) => void;
} {
  const ported = [...SCOPE, ...targets()];
  const known = new Map<string, NodeBase>();
  const add = (file: string): void => {
    if (known.has(file)) return;
    known.set(file, {
      file,
      layer: layerOf(file),
      homeRows: MAP.filter((row) => row.home.includes(file)).map(
        (row) => row.row,
      ),
      ported: ported.includes(file),
      about: aboutOf(file, texts[file]),
    });
  };
  [...Object.keys(LAYERS), ...ported].forEach(add);
  return { known, add };
}

function architecture(
  found: readonly SourceFinding[],
  {
    texts,
    names,
    moves,
    layerNames,
  }: MapOptions & { readonly texts: Texts; readonly names?: readonly string[] },
): GuardMap {
  const reads = readsOf(texts);
  const drawn: DrawnFiles = { texts, reads, uses: usesOf(reads, texts) };
  const { known, add } = registry(texts);
  const copied = copies(found);
  const { byFile, pairs } = tallied(copied, add);
  const files = [...known.values()]
    .map((base) => nodeOf(base, { drawn, counts: byFile.get(base.file) }))
    .sort(
      (one, other) =>
        one.layer - other.layer || (one.file < other.file ? -1 : 1),
    );
  return {
    files,
    links: linksOf(drawn, { known, pairs, moves }),
    moves: moves ?? [],
    layerNames: layerNames ?? {},
    quiet: (names ?? []).filter((file) => !known.has(file)),
    counts: findingCounts(copied),
  };
}

export { architecture };
