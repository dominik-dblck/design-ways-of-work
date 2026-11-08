/**
 * - `targetText`, `needsOf`, `Row` · a moved part's new file and what it imports
 * - `importLines`, `importPathOf` · imports written again, as a file names them
 */
import path from 'node:path';
import ts from 'typescript';
import { textOf } from './declarations.ts';
import type { Bound } from './declarations.ts';

interface Row {
  readonly file: string;
  readonly name: string;
  readonly target: string;
  readonly bullet: string;
}

// a relative module seen from another folder; a package's stays as it is
function moduleFrom(
  module: string,
  { from, to }: { readonly from: string; readonly to: string },
): string {
  if (!module.startsWith('.')) return module;
  const moved = path.posix.relative(to, path.posix.join(from, module));
  return moved.startsWith('.') ? moved : `./${moved}`;
}

// one module's import lines: its default, its namespace, its values, its types
function linesOf(module: string, own: readonly Bound[]): readonly string[] {
  const listed = (isTypeOnly: boolean): string =>
    own
      .filter((one) => !['default', 'namespace'].includes(one.imported))
      .filter((one) => one.isTypeOnly === isTypeOnly)
      .map((one) =>
        one.imported === one.local
          ? one.local
          : `${one.imported} as ${one.local}`,
      )
      .join(', ');
  const plain = own.find((one) => one.imported === 'default');
  const whole = own.find((one) => one.imported === 'namespace');
  return [
    plain === undefined ? '' : `import ${plain.local} from '${module}';`,
    whole === undefined ? '' : `import * as ${whole.local} from '${module}';`,
    listed(false) === '' ? '' : `import { ${listed(false)} } from '${module}';`,
    listed(true) === ''
      ? ''
      : `import type { ${listed(true)} } from '${module}';`,
  ].filter((line) => line !== '');
}

const importLines = (bounds: readonly Bound[]): string =>
  [...new Set(bounds.map((one) => one.module))]
    .flatMap((module) =>
      linesOf(
        module,
        bounds.filter((one) => one.module === module),
      ),
    )
    .join('\n');

const dirOf = (file: string): string => path.posix.dirname(file);

// the module one file names another by, from its own folder
const importPathOf = (from: string, to: string): string =>
  moduleFrom(`./${path.posix.relative(dirOf(from), to)}`, {
    from: dirOf(from),
    to: dirOf(from),
  });

// a new file's text: its header, the imports its parts read, the parts, their export
function targetText({
  syntax,
  parts,
  needs,
}: {
  readonly syntax: ts.SourceFile;
  readonly parts: readonly (readonly [Row, ts.Statement])[];
  readonly needs: readonly Bound[];
}): string {
  const header = parts.map(([row]) => ` * - \`${row.name}\` · ${row.bullet}`);
  const isAType = (statement: ts.Statement): boolean =>
    ts.isInterfaceDeclaration(statement) ||
    ts.isTypeAliasDeclaration(statement);
  const valueNames = parts
    .filter(([, one]) => !isAType(one))
    .map(([row]) => row.name);
  const typeNames = parts
    .filter(([, one]) => isAType(one))
    .map(([row]) => row.name);
  return [
    [`/**\n${header.join('\n')}\n */`, importLines(needs)]
      .filter((block) => block !== '')
      .join('\n'),
    ...parts.map(([, one]) => textOf(syntax, one)),
    [
      ...(valueNames.length === 0
        ? []
        : [`export { ${valueNames.join(', ')} };`]),
      ...(typeNames.length === 0
        ? []
        : [`export type { ${typeNames.join(', ')} };`]),
    ].join('\n'),
  ]
    .filter((block) => block !== '')
    .join('\n\n')
    .concat('\n');
}

// what a group of parts imports: the source's bindings it reads, and parts moved elsewhere
function needsOf({
  file,
  target,
  reads,
  bounds,
  movedTo,
}: {
  readonly file: string;
  readonly target: string;
  readonly reads: ReadonlySet<string>;
  readonly bounds: readonly Bound[];
  readonly movedTo: ReadonlyMap<string, string>;
}): readonly Bound[] {
  return [
    ...bounds
      .filter((one) => reads.has(one.local))
      .map((one) => ({
        ...one,
        module: moduleFrom(one.module, {
          from: dirOf(file),
          to: dirOf(target),
        }),
      })),
    ...[...movedTo]
      .filter(([name, at]) => reads.has(name) && at !== target)
      .map(([name, at]) => ({
        local: name,
        module: importPathOf(target, at),
        imported: name,
        isTypeOnly: false,
      })),
  ];
}

export { importLines, importPathOf, needsOf, targetText };
export type { Row };
