/**
 * - `LAYERS`, `layerOf`, `readsOf`, `layersCheck` · seven layers, each reads lower
 * - `branchesCheck`, `codeLines` · a rule or a view branching on a type's name
 * - `exampleRow`, `readable` · a test's example row, the files a copy is read in
 */
import { SHEET_PAGE } from './sourceScope.ts';
import type {
  FileReads,
  SourceFinding,
  ReadRow,
  Texts,
} from './sourceCheckTypes.ts';

// a file reads only a lower number; within a layer the decimal orders the reads, the guard on top
const LAYERS: Readonly<Record<string, number | undefined>> = {
  'glossary.js': 1.1,
  'messages.js': 1.2,
  'messagesContent.js': 1.3,
  'gateStates.js': 2.1,
  'sheetStatus.js': 2.2,
  'blockModel.js': 3.0,
  'commands.js': 3.1,
  'events.js': 3.2,
  'queries.js': 3.3,
  'refusals.js': 3.4,
  'languages.js': 4.05,
  'directory.js': 4.1,
  'fieldKinds.js': 4.2,
  'contentModules.js': 4.25,
  'contentTypes.js': 4.27,
  'blocks.js': 4.3,
  'catalog.js': 4.5,
  'contentAssembly.js': 5.05,
  'gateRules.js': 5.1,
  'translationFlow.js': 5.2,
  'deliveryFlow.js': 5.25,
  'blockRules.js': 5.3,
  'sharedCases.js': 3.5,
  'dbSchema.js': 3.6,
  'agentFlow.js': 5.4,
  'agentAccess.js': 5.4,
  'signatures.js': 6.11,
  'threads.js': 6.12,
  'payloads.js': 6.13,
  'projections.js': 6.14,
  'scenes.js': 6.2,
  'roleCombinations.js': 6.3,
  'flowCheck.js': 6.4,
  'testCases.js': 6.5,
  'journeys.js': 6.6,
  'contentSamples.js': 6.7,
  'contentCheck.js': 6.8,
  'sampleRun.js': 6.1,
  'wireframes.js': 6.15,
  'approvalLogic.js': 7.1,
  'contentTypeLogic.js': 7.2,
  'screenView.js': 7.3,
  'contentList.js': 7.15,
  'sourceCheck.js': 7.9,
};

const TYPE_NAMES: readonly string[] = [
  'email',
  'push',
  'appBanner',
  'informational',
  'bottomSheet',
  'marketing',
];

const ASSIGNED = /\b(?:root|window|globalThis)\.([A-Z]\w*)\s*=(?!=)/g;
const NAMED = /\b(?:root|window|globalThis)\.([A-Z]\w*)/g;

function codeLines(text: unknown): readonly string[] {
  return String(text)
    .split('\n')
    .map((line) => (/^\s*\/\//.test(line) ? '' : line.replace(/\/\/.*/, '')));
}

const globalIn = (found: string): string =>
  /\.([A-Z]\w*)/.exec(found)?.[1] ?? '';

function readsIn(
  file: string,
  {
    text,
    owner,
  }: { readonly text: unknown; readonly owner: ReadonlyMap<string, string> },
): readonly ReadRow[] {
  const seen = new Set<string>();
  return codeLines(text).flatMap((line, index) =>
    (line.match(NAMED) ?? []).flatMap((found) => {
      const from = owner.get(globalIn(found));
      if (!from || from === file || seen.has(from)) return [];
      seen.add(from);
      return [{ file: from, line: index + 1 }];
    }),
  );
}

// who reads whom among the layered files: each file's globals, the files whose globals it reads
function readsOf(texts: Texts): Readonly<Record<string, FileReads>> {
  const owner = new Map<string, string>();
  const names = Object.keys(LAYERS).filter((file) => texts[file] != null);
  const exported = names.map((file) => {
    const globals = [
      ...new Set((String(texts[file]).match(ASSIGNED) ?? []).map(globalIn)),
    ];
    for (const one of globals) if (!owner.has(one)) owner.set(one, file);
    return globals;
  });
  return Object.fromEntries(
    names.map((file, index) => [
      file,
      {
        exports: exported[index] ?? [],
        reads: readsIn(file, { text: texts[file], owner }),
      },
    ]),
  );
}

function layersCheck(texts: Texts): readonly SourceFinding[] {
  return Object.entries(readsOf(texts)).flatMap(([file, { reads }]) =>
    reads
      .filter((read) => !((LAYERS[read.file] ?? NaN) < (LAYERS[file] ?? NaN)))
      .map((read) => ({
        kind: 'read upwards',
        row: 'the layers (rule:layers-read-downward)',
        file,
        line: read.line,
        text: `${file} (${String(LAYERS[file])}) reads ${read.file} (${String(LAYERS[read.file])})`,
      })),
  );
}

function layerOf(file: string): number {
  const layer = LAYERS[file];
  if (layer != null) return layer;
  return /\.dc\.html$/.test(file) ? 7.5 : 8;
}

// a rule or a view branching on a type's name: a layered file of the rules or above, every product page
function branchesCheck(texts: Texts): readonly SourceFinding[] {
  const files = Object.keys(texts).filter(
    (file) =>
      texts[file] != null &&
      ((LAYERS[file] ?? 0) >= 5 ||
        (/\.dc\.html$/.test(file) && !SHEET_PAGE.test(file))),
  );
  return files.flatMap((file) =>
    codeLines(texts[file]).flatMap((line, index) =>
      TYPE_NAMES.some((name) =>
        new RegExp(
          `(===?|!==?)\\s*'${name}'|'${name}'\\s*(===?|!==?)|\\|\\|\\s*'${name}'`,
        ).test(line),
      )
        ? [
            {
              kind: 'branch on a type name',
              row: 'a type is its row (T18b)',
              file,
              line: index + 1,
              text: line.trim().slice(0, 140),
            },
          ]
        : [],
    ),
  );
}

// an example names its facts by id: a list in a row of a layer-6 file is no copy, a declared one is
function exampleRow(file: string, line: string): boolean {
  const layer = LAYERS[file] ?? 0;
  return (
    layer >= 6 &&
    layer < 7 &&
    !/^\s*(?:var|const|let)\s+\w+\s*=\s*\[/.test(line)
  );
}

function readable(texts: Texts): readonly string[] {
  return Object.keys(texts).filter(
    (file) =>
      texts[file] != null &&
      file !== 'sourceCheck.js' &&
      !SHEET_PAGE.test(file),
  );
}

export {
  branchesCheck,
  exampleRow,
  LAYERS,
  layerOf,
  layersCheck,
  readable,
  readsOf,
};
