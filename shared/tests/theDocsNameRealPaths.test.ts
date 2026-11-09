/**
 * - a path a doc of the scope's `namedPaths` names in backticks exists
 * - a placeholder, a line or an anchor, a pointer's ` · export` are no part of it
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { heldToItsBaseline } from './baseline.ts';
import { filesNamedBy, globsNamingNothing, isOnDisk } from './globs.ts';

interface Doc {
  readonly path: string;
  readonly text: string;
}

// what a doc is read against: the top folders a path starts with, and whether a path is there
interface Reading {
  readonly roots: readonly string[];
  readonly exists: (file: string) => boolean;
}

// a name standing for many: `{x}`, `*`, `<x>`, `…`, `...` (a catch-all's `[...name]` is a real folder)
const A_PLACEHOLDER = /[{}*<>…]|\.\.\.(?!\w*\])/;
// what follows a path without being one: a line, a range, an anchor, the sentence's punctuation
// (a `)` closing a route group's `(name)` is the path's own)
const A_TAIL = /(?::\d+(?:[–-]\d+)?|#.*|(?:[.,;:]|(?<!\([^()]*)\))+)$/;

const A_REGEX_CHARACTER = /[.*+?^${}()|[\]\\]/g;

// a backticked path under one of the roots, a pointer's ` · export` after it
function pathsUnder(roots: readonly string[]): RegExp {
  const alternatives = roots
    .map((root) => root.replace(A_REGEX_CHARACTER, '\\$&'))
    .join('|');
  return new RegExp(`\`((?:${alternatives})/[^\`\\s]+)(?:\\s·[^\`]*)?\``, 'g');
}

// the paths a doc names that are not there, given what is
function missingIn(doc: Doc, { roots, exists }: Reading): readonly string[] {
  return [
    ...new Set(
      [...doc.text.matchAll(pathsUnder(roots))].map(([, named = '']) =>
        named.replace(A_TAIL, ''),
      ),
    ),
  ]
    .filter((named) => !A_PLACEHOLDER.test(named) && !exists(named))
    .sort();
}

// the real tree: a path there in the case the doc writes it, as a disk that minds case reads it
const onDisk = (named: string): boolean => isOnDisk(scope.root, named);

describe('the docs name real paths', () => {
  it('a path not there is found; one there, a placeholder of each kind, a line, an anchor and a pointer are not', () => {
    const there = new Set([
      'tools/layout.ts',
      'app/api/auth/[...nextauth]/route.ts',
      'docs/rules/size.md',
      '.claude/skills/a/SKILL.md',
      'app/(auth)',
    ]);
    expect(
      missingIn(
        {
          path: 'docs/planted.md',
          text: [
            'Read `sheet/model/directory.ts` first, then `tools/layout.ts:56` and `tools/layout.ts:3–5`.',
            'A pointer: `tools/layout.ts · sourceOf`; an anchor: `docs/rules/size.md#limits`.',
            'Placeholders: `sheet/logic/{capability}/`, `tests/*.ts`, `app/<page>/`, `notes/…`, `app/.../x.ts`.',
            'A catch-all: `app/api/auth/[...nextauth]/route.ts`, and one gone: `app/api/[...gone]/route.ts`.',
            'A dotted root: `.claude/skills/a/SKILL.md`, and an alias that is no path: `@/app/x.ts`.',
            'Under no root: `elsewhere/x.ts`, nor `xclaude/skills/a.md`; a route group: `app/(auth)`.',
            'A pointer to nothing: `sheet/gone.ts · thing`; a path the sentence closes: `tools/layout.ts;`.',
          ].join('\n'),
        },
        {
          roots: ['sheet', 'tools', 'tests', 'app', 'notes', 'docs', '.claude'],
          exists: (file) => there.has(file),
        },
      ),
    ).toEqual([
      'app/api/[...gone]/route.ts',
      'sheet/gone.ts',
      'sheet/model/directory.ts',
    ]);
  });

  it('on the real tree, a path in a case the disk does not write is missing', () => {
    expect(
      missingIn(
        {
          path: 'docs/planted.md',
          text: '`shared/tests/globs.ts` is there; `shared/Tests/globs.ts` is not.',
        },
        { roots: ['shared'], exists: onDisk },
      ),
    ).toEqual(['shared/Tests/globs.ts']);
  });

  it('every glob of the scope names a doc', () => {
    expect(globsNamingNothing(scope, scope.namedPaths.docs)).toEqual([]);
  });

  it('no doc of the scope names a missing path, beyond its baseline', () => {
    const missing = filesNamedBy(scope, scope.namedPaths.docs).flatMap((file) =>
      missingIn(
        {
          path: file,
          text: fs.readFileSync(path.join(scope.root, file), 'utf8'),
        },
        {
          roots: scope.namedPaths.roots,
          exists: onDisk,
        },
      ).map((named) => `${file} · ${named}`),
    );
    expect(heldToItsBaseline('theDocsNameRealPaths', missing)).toEqual({
      added: [],
      fixed: [],
    });
  });
});
