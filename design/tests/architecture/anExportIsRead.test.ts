/**
 * - `docs/rules/responsibility.md`: an entry's export is read by its global (a part's: knip)
 * - the build side reads names too: `sheet/project.ts` · buildReads.names
 * - a module's data the build writes as JSON is read by name (`tools/layout.ts · emitted`)
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import * as PROJECT from '../../sheet/project.ts';
import { emitted } from '../../tools/layout.ts';
import { ROOT } from '../../tools/root.ts';
import { heldToItsBaseline } from '../../shared/tests/baseline.ts';
import { exportedValuesOf } from './fileSyntax.ts';
import {
  entryOf,
  importsOf,
  isEntry,
  productionSources,
  homeTexts,
  textsUnder,
} from './tree.ts';
import type { Source } from './tree.ts';

const globalOf = (entry: string): string =>
  path.posix
    .basename(entry, '.ts')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

/** The names one source imports from `target`, `*` for a whole module. */
function namesImported(source: Source, target: string): readonly string[] {
  return importsOf(source)
    .filter((one) => one.to === target)
    .flatMap((one) => {
      if (/\*\s+as\s+\w+/.test(one.clause)) return ['*'];
      const braces = /\{([^}]*)\}/.exec(one.clause)?.[1] ?? '';
      return braces
        .split(',')
        .map(
          (name) =>
            name
              .replace(/^\s*type\s+/, '')
              .trim()
              .split(/\s+as\s+/)[0] ?? '',
        )
        .filter(Boolean);
    });
}

function unreadIn(
  source: Source,
  readers: readonly Source[],
): readonly string[] {
  const others = readers.filter(
    (reader) =>
      reader.path !== source.path && entryOf(reader.path) !== source.path,
  );
  const imported = new Set(
    others.flatMap((reader) => namesImported(reader, source.path)),
  );
  const global = isEntry(source.path) ? globalOf(source.path) : null;
  const throughGlobal =
    global === null
      ? []
      : others.filter((reader) => reader.text.includes(global));
  const outside = [
    ...(PROJECT.buildReads.names[source.path] ?? []),
    ...emitted()
      .filter((one) => one.module === source.path)
      .map((one) => one.name),
  ];
  const named = isEntry(source.path)
    ? new RegExp(
        `\\b${path.posix.basename(source.path, '.ts')}\\.(?:js|ts) · (\\w+(?:, \\w+)*)`,
        'g',
      )
    : null;
  const inAReadList = new Set(
    named === null
      ? []
      : readers.flatMap((reader) =>
          [...reader.text.matchAll(named)].flatMap(([, names = '']) =>
            names.split(', ').map((name) => name.toLowerCase()),
          ),
        ),
  );
  return exportedValuesOf(source)
    .filter((name) => !imported.has(name) && !imported.has('*'))
    .filter((name) => !outside.includes(name))
    .filter((name) => !inAReadList.has(name.toLowerCase()))
    .filter(
      (name) =>
        !throughGlobal.some((reader) =>
          new RegExp(`\\.${name}\\b`).test(reader.text),
        ),
    )
    .map((name) => `${source.path} · ${name}`);
}

// the repository's own configs read code too: eslint.config.ts reads the shared lint config
const rootConfigs = (): readonly Source[] =>
  fs
    .readdirSync(ROOT)
    .filter((file) => /\.config\.m?ts$/.test(file))
    .map((file) => ({
      path: file,
      text: fs.readFileSync(path.join(ROOT, file), 'utf8'),
    }));

const theReaders = (): readonly Source[] => [
  ...homeTexts(['.ts', '.tsx', '.js', '.html', '.mjs']),
  ...textsUnder('tools', ['.ts', '.mjs']),
  ...rootConfigs(),
];

describe('an export is read', () => {
  const part: Source = {
    path: 'sheet/words/planted/rows.ts',
    text: 'export const ROWS = 1;\nexport const UNREAD = 2;',
  };
  const entry: Source = {
    path: 'sheet/words/planted.ts',
    text: "import { ROWS } from './planted/rows.ts';\nconst rows = ROWS;\nconst unread = 2;\nexport { rows, unread };",
  };
  const page: Source = {
    path: 'sheet/words/Planted.dc.html',
    text: 'const P = window.Planted; P.rows;',
  };
  const ticket: Source = {
    path: 'sheet/words/tickets/E18.js',
    text: "reads: ['planted.js · UNREAD']",
  };

  it('a part read by an import, an entry read through its global pass; the rest are found', () => {
    expect(unreadIn(part, [part, entry, page])).toEqual([
      'sheet/words/planted/rows.ts · UNREAD',
    ]);
  });

  it('an entry export a ticket reads as `planted.js · UNREAD` passes', () => {
    expect(unreadIn(entry, [part, entry, page])).toEqual([
      'sheet/words/planted.ts · unread',
    ]);
    expect(unreadIn(entry, [part, entry, page, ticket])).toEqual([]);
  });

  it('each name the build side reads is still exported', () => {
    for (const [file, names] of Object.entries(PROJECT.buildReads.names)) {
      const source = productionSources().find((one) => one.path === file);
      expect(source, file).toBeDefined();
      if (source !== undefined)
        expect(exportedValuesOf(source)).toEqual(
          expect.arrayContaining([...names]),
        );
    }
  });

  it('no export beyond the baseline goes unread', () => {
    const readers = theReaders();
    expect(
      heldToItsBaseline(
        'anExportIsRead',
        productionSources()
          .filter((source) => isEntry(source.path))
          .flatMap((source) => unreadIn(source, readers)),
      ),
    ).toEqual({
      added: [],
      fixed: [],
    });
  });
});
