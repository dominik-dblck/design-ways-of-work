/**
 * - `createRule` · a rule of the way of working's plugin, documented by its gate
 * - `syntaxOf`, `pathOf` · the file a rule reads: its tree, its repository path
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

export { createRule, pathOf, syntaxOf };
export type { Context };
