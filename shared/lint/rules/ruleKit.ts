/**
 * - `createRule` · a rule of the way of working's plugin, documented by its gate
 * - `syntaxOf`, `pathOf` · the file a rule reads: its tree, its repository path
 * - `matchesAny`, `moduleOf` · a path a scope's globs name; a specifier's path
 */
import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESLint } from '@typescript-eslint/utils';
import path from 'node:path';
import ts from 'typescript';

const createRule = ESLintUtils.RuleCreator(
  (name) => `docs/rules/README.md#${name}`,
);

type Context = Readonly<TSESLint.RuleContext<string, readonly unknown[]>>;

const parsed = new WeakMap<object, ts.SourceFile>();

// the program's tree when typed and its parents are set, else one parse a file
function syntaxOf(context: Context): ts.SourceFile {
  const typed = context.sourceCode.parserServices?.program?.getSourceFile(
    context.filename,
  );
  if (typed?.statements[0]?.parent !== undefined) return typed;
  const kept = parsed.get(context.sourceCode);
  if (kept !== undefined) return kept;
  const file = ts.createSourceFile(
    context.filename,
    context.sourceCode.text,
    ts.ScriptTarget.Latest,
    true,
  );
  parsed.set(context.sourceCode, file);
  return file;
}

// `docs/process/plans.ts`, read from where ESLint runs
const pathOf = (context: Context, file = context.filename): string =>
  path.relative(context.cwd, file).split(path.sep).join('/');

const matchesAny = (file: string, globs: readonly string[]): boolean =>
  globs.some((glob) => path.matchesGlob(file, glob));

// the repository path a specifier names: the program's resolution, else a relative one by its folder
function moduleOf(context: Context, specifier: string): string | null {
  const program = context.sourceCode.parserServices?.program;
  const resolved =
    program === undefined || program === null
      ? undefined
      : ts.resolveModuleName(
          specifier,
          context.filename,
          program.getCompilerOptions(),
          ts.sys,
        ).resolvedModule;
  if (resolved !== undefined)
    return resolved.isExternalLibraryImport === true
      ? null
      : pathOf(context, resolved.resolvedFileName);
  return specifier.startsWith('.')
    ? path.posix.join(path.posix.dirname(pathOf(context)), specifier)
    : null;
}

export { createRule, matchesAny, moduleOf, pathOf, syntaxOf };
export type { Context };
