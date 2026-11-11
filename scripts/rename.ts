/**
 * - `node scripts/rename.ts <map.tsv> [tree]` · renames by TypeScript's own rename
 * - a row: `file:line:column` of a name, then its new name; each reference follows
 * - on this repository, or on a tree handed in: its tsconfig names the program
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { mapRows } from './mapRows.ts';
import { serviceOf } from './languageService.ts';
import { HERE, repoAt } from './repos.ts';

interface Row {
  readonly file: string;
  readonly line: number;
  readonly column: number;
  readonly name: string;
}

const MAP = repoAt('', 0);
const TREE = repoAt(HERE, 1);

const rows: readonly Row[] = mapRows(MAP).map(([at = '', name = '']) => {
  const [file = '', row = '0', column = '0'] = at.split(':');
  return { file, line: Number(row), column: Number(column), name };
});

interface Edit {
  readonly start: number;
  readonly length: number;
  readonly text: string;
}

interface Planned {
  readonly row: Row;
  readonly was: string;
  readonly edits: readonly (readonly [string, Edit])[];
  readonly headers: readonly string[];
}

const service = serviceOf(TREE);
const program = service.getProgram();
if (program === undefined) throw new Error(`no program in ${TREE}`);
const checker = program.getTypeChecker();
const ANY_NAME =
  ts.SymbolFlags.Value | ts.SymbolFlags.Type | ts.SymbolFlags.Alias;

function nodeAt(file: string, position: number): ts.Node {
  const syntax = program?.getSourceFile(file);
  if (syntax === undefined) throw new Error(`${file} is not compiled`);
  let found: ts.Node = syntax;
  const visit = (node: ts.Node): void => {
    if (node.getStart(syntax) <= position && position < node.getEnd()) {
      found = node;
      ts.forEachChild(node, visit);
    }
  };
  ts.forEachChild(syntax, visit);
  return found;
}

// a new name already in scope where the old one stands would bind there instead: refused
const clashes = (
  location: ts.RenameLocation,
  { name, symbol }: { readonly name: string; readonly symbol: ts.Symbol },
): boolean =>
  (symbol.flags & ts.SymbolFlags.Property) === 0 &&
  checker
    .getSymbolsInScope(
      nodeAt(location.fileName, location.textSpan.start),
      ANY_NAME,
    )
    .some((one) => one.name === name && one !== symbol);

// an exported name in a shorthand keeps the key it fills, a property keeps the value it reads
function editOf(
  location: ts.RenameLocation,
  {
    name,
    was,
    symbol,
  }: {
    readonly name: string;
    readonly was: string;
    readonly symbol: ts.Symbol;
  },
): Edit {
  const node = nodeAt(location.fileName, location.textSpan.start);
  const isShorthand = ts.isShorthandPropertyAssignment(node.parent);
  const isProperty = (symbol.flags & ts.SymbolFlags.Property) !== 0;
  // a shorthand `{ was }` becomes a pair: a property keeps its key, a value its name
  const pair = isProperty ? `${name}: ${was}` : `${was}: ${name}`;
  const text = isShorthand ? pair : name;
  return {
    start: location.textSpan.start,
    length: location.textSpan.length,
    text: `${location.prefixText ?? ''}${text}${location.suffixText ?? ''}`,
  };
}

// the declaring file, and an entry passing the name on
const headersOf = (
  file: string,
  locations: readonly ts.RenameLocation[],
): readonly string[] => [
  file,
  ...locations
    .filter((one) =>
      ts.isExportSpecifier(nodeAt(one.fileName, one.textSpan.start).parent),
    )
    .map((one) => one.fileName),
];

function plan(row: Row): Planned {
  const file = path.join(TREE, row.file);
  const syntax = program?.getSourceFile(file);
  if (syntax === undefined) throw new Error(`${row.file} is not compiled`);
  const at = syntax.getPositionOfLineAndCharacter(row.line - 1, row.column - 1);
  const named = nodeAt(file, at);
  const symbol = checker.getSymbolAtLocation(named);
  if (!ts.isIdentifier(named) || symbol === undefined)
    throw new Error(`${row.file}:${row.line}:${row.column} · no name there`);
  const isExported = service
    .getReferencesAtPosition(file, at)
    ?.some((one) => one.fileName !== file);
  const locations =
    service.findRenameLocations(file, at, false, false, {
      providePrefixAndSuffixTextForRename: isExported !== true,
    }) ?? [];
  const clashing = locations.filter((one) =>
    clashes(one, { name: row.name, symbol }),
  );
  if (clashing.length > 0)
    throw new Error(
      `${row.file}:${row.line} · ${row.name} is in scope at ${clashing[0]?.fileName}`,
    );
  const was = named.text;
  return {
    row,
    was,
    edits: locations.map(
      (one) =>
        [one.fileName, editOf(one, { name: row.name, was, symbol })] as const,
    ),
    headers: headersOf(file, locations),
  };
}

// the header's bullets name a file's exports: they move with the name, where it is declared or passed on
const withHeader = (
  text: string,
  { from, to }: { readonly from: string; readonly to: string },
): string =>
  text.replace(/^\/\*\*\n(?:[^*]|\*(?!\/))*\*\//, (header) =>
    header.replaceAll(`\`${from}\``, `\`${to}\``),
  );

// every row is read off the untouched tree, then each file is written once, its spans from the last
function rewrite(file: string, planned: readonly Planned[]): void {
  const edits = planned
    .flatMap((one) => one.edits)
    .filter(([at]) => at === file)
    .map(([, edit]) => edit)
    .sort((one, other) => other.start - one.start);
  edits.forEach((edit, at) => {
    const after = edits[at - 1];
    if (after !== undefined && edit.start + edit.length > after.start)
      throw new Error(`${file} · two rows rename one place`);
  });
  const renamed = edits.reduce(
    (text, edit) =>
      `${text.slice(0, edit.start)}${edit.text}${text.slice(edit.start + edit.length)}`,
    fs.readFileSync(file, 'utf8'),
  );
  const headed = planned
    .filter((one) => one.headers.includes(file))
    .reduce(
      (text, one) => withHeader(text, { from: one.was, to: one.row.name }),
      renamed,
    );
  fs.writeFileSync(file, headed);
}

const planned = rows.map(plan);
const files = new Set(
  planned.flatMap((one) => one.edits.map(([file]) => file)),
);
for (const file of files) rewrite(file, planned);
for (const one of planned)
  console.log(
    `${one.row.file}:${one.row.line} · ${one.was} → ${one.row.name} · ${one.edits.length} places`,
  );
console.log(`${planned.length} names renamed, ${files.size} files written`);
