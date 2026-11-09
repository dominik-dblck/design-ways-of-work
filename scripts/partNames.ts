/**
 * - `node scripts/partNames.ts <root>...` · parts named for their component
 * - writes the rename and move maps of each part that lacks it; none once all hold
 * - a stem no name can mend is listed, never guessed: a drawer's, or no purpose
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import {
  carriesItsName,
  componentOf,
  DRAWERS,
  wordsOwed,
} from '../shared/lint/partNames.ts';
import { declaredName } from './declarations.ts';
import { HERE } from './repos.ts';

interface Part {
  readonly file: string;
  readonly component: string;
}

const DESIGN = path.join(HERE, 'design');
const A_SOURCE = /\.tsx?$/;
const A_HOOK = /^use[A-Z]/;
const RENAMES = path.join(HERE, 'plan', 'renames-chunk-6f.tsv');
const MOVES = path.join(HERE, 'plan', 'moves', 'organism-parts.tsv');

const stemOf = (file: string): string =>
  path.posix.basename(file).replace(A_SOURCE, '');
const upperFirst = (name: string): string =>
  `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
const lowerFirst = (name: string): string =>
  `${name.charAt(0).toLowerCase()}${name.slice(1)}`;

// every source under a folder, as a path from design/
const sourcesUnder = (folder: string): readonly string[] =>
  fs.existsSync(path.join(DESIGN, folder))
    ? fs
        .readdirSync(path.join(DESIGN, folder), {
          recursive: true,
          encoding: 'utf8',
        })
        .filter((file) => A_SOURCE.test(file))
        .map((file) => path.posix.join(folder, file.split(path.sep).join('/')))
    : [];

// each part of each component under a root, at any depth
const partsOf = (root: string): readonly Part[] =>
  sourcesUnder(root).flatMap((file) => {
    const component = componentOf(file, [root]);
    return component === null ? [] : [{ file, component }];
  });

const isHeld = ({ file, component }: Part): boolean =>
  carriesItsName(stemOf(file), component) &&
  wordsOwed({ file, stem: stemOf(file), component }).length === 0;

// the component's name before the stem: a hook after `use`, a service after its verb
function prefixed({ file, component }: Part, stem: string): string {
  if (A_HOOK.test(stem)) return `use${component}${stem.slice(3)}`;
  if (path.posix.basename(path.posix.dirname(file)) === 'services') {
    const [verb = '', ...rest] = stem.split(/(?=[A-Z])/);
    return `${verb}${component}${rest.join('')}`;
  }
  const named = `${component}${upperFirst(stem)}`;
  return /^[A-Z]/.test(stem) ? named : lowerFirst(named);
}

// a part's new stem, or null where only a person can name its purpose
function newStemOf(part: Part): string | null {
  const stem = stemOf(part.file);
  if (DRAWERS.includes(stem.toLowerCase())) return null;
  const named = carriesItsName(stem, part.component)
    ? stem
    : prefixed(part, stem);
  const [word = ''] = wordsOwed({ ...part, stem: named });
  const closed = `${named}${word}`;
  return wordsOwed({ ...part, stem: closed }).length > 0 ? null : closed;
}

// the declarations named for a file's stem: its component or hook, and its props
function renamesIn(part: Part, stem: string): readonly string[] {
  const was = stemOf(part.file);
  const text = fs.readFileSync(path.join(DESIGN, part.file), 'utf8');
  const syntax = ts.createSourceFile(
    part.file,
    text,
    ts.ScriptTarget.Latest,
    true,
  );
  const wanted = new Map([
    [was, stem],
    [`${was}Props`, `${stem}Props`],
  ]);
  return syntax.statements.flatMap((statement) => {
    const name = declaredName(statement);
    const now = name === null ? undefined : wanted.get(name);
    if (name === null || now === undefined) return [];
    const at = syntax.getLineAndCharacterOfPosition(
      text.indexOf(name, statement.getStart(syntax)),
    );
    return [
      `${part.file}:${String(at.line + 1)}:${String(at.character + 1)}\t${now}`,
    ];
  });
}

const parts = process.argv
  .slice(2)
  .flatMap(partsOf)
  .filter((part) => !isHeld(part))
  .map((part) => ({ part, stem: newStemOf(part) }));
const named = parts.flatMap(({ part, stem }) =>
  stem === null ? [] : [{ part, stem }],
);
const renames = named.flatMap(({ part, stem }) => renamesIn(part, stem));
const moves = named.map(
  ({ part, stem }) =>
    `${part.file}\t${path.posix.join(path.posix.dirname(part.file), stem)}${path.posix.extname(part.file)}`,
);
// a tree that holds leaves the last maps as they are: the record of what moved
if (named.length > 0) {
  fs.writeFileSync(RENAMES, renames.map((row) => `${row}\n`).join(''));
  fs.writeFileSync(
    MOVES,
    ['from\tto', ...moves].map((row) => `${row}\n`).join(''),
  );
}
parts
  .filter(({ stem }) => stem === null)
  .forEach(({ part }) => {
    console.log(`${part.file} · no name mends it: its purpose is a person's`);
  });
console.log(
  `${String(parts.length)} parts · ${String(renames.length)} renames, ${String(moves.length)} moves`,
);
process.exitCode = named.length < parts.length ? 1 : 0;
