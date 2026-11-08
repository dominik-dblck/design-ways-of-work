/**
 * - `node scripts/keeps-its-rules.ts [copy]` · the way of working keeps its rules
 * - no directive in a file of its own, no suppression of one in a rehearsal copy
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { HERE, linkedFiles, repoAt } from './repos.ts';

const COPY = repoAt(path.join(HERE, '.rehearsal', 'eagle-design'));
const SUPPRESSIONS = 'eslint-suppressions.json';
const A_SOURCE = /\.(?:ts|tsx|mts|cts|js|mjs)$/;
// the files a rule's tests read as a program, wrong on purpose
const FIXTURES = 'tests/lint/fixtures/';
// a comment that turns a check off: ESLint's, or TypeScript's
const A_DIRECTIVE =
  /^\/(?:\/|\*+)\s*(?:eslint-(?:disable|enable|env)\b|eslint\s|global\s|@ts-(?:ignore|expect-error|nocheck)\b)/;

// every comment of a source, its trivia read by the compiler, never a string's text
function commentsOf(file: string, text: string): readonly string[] {
  const syntax = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const starts = new Set<number>();
  const visit = (node: ts.Node): void => {
    // a JSX brace holding a comment alone has no node inside to carry it
    const inBraces = ts.isJsxExpression(node)
      ? [node.getStart(syntax) + 1]
      : [];
    for (const at of [node.getFullStart(), node.getEnd(), ...inBraces])
      for (const range of [
        ...(ts.getLeadingCommentRanges(text, at) ?? []),
        ...(ts.getTrailingCommentRanges(text, at) ?? []),
      ])
        starts.add(range.pos);
    ts.forEachChild(node, visit);
  };
  visit(syntax);
  return [...starts].map((at) => {
    const end = text.indexOf('\n', at);
    return text.slice(at, end === -1 ? undefined : end);
  });
}

// each file of its own that holds a directive, with the line
function directives(): readonly string[] {
  const files = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard'],
    {
      cwd: HERE,
      encoding: 'utf8',
    },
  )
    .split('\n')
    .filter((file) => A_SOURCE.test(file) && !file.startsWith(FIXTURES))
    // the index lists a file deleted but not yet staged: only one on disk is read
    .filter((file) => fs.existsSync(path.join(HERE, file)));
  return files.flatMap((file) => {
    const text = fs.readFileSync(path.join(HERE, file), 'utf8');
    return commentsOf(file, text)
      .filter((comment) => A_DIRECTIVE.test(comment))
      .map((comment) => `${file} · ${comment.trim()}`);
  });
}

// each suppression of a file of its own: here, or a linked file's in the copy
function suppressions(): readonly string[] {
  const own = fs.existsSync(path.join(HERE, SUPPRESSIONS))
    ? [`${SUPPRESSIONS} · this repository suppresses its own code`]
    : [];
  const copied = path.join(COPY, SUPPRESSIONS);
  if (!fs.existsSync(copied)) return own;
  const held: Readonly<Record<string, unknown>> = JSON.parse(
    fs.readFileSync(copied, 'utf8'),
  );
  const linked = new Set(linkedFiles().map(([, at]) => at));
  return [
    ...own,
    ...Object.keys(held)
      .filter((file) => linked.has(file))
      .map((file) => `${path.basename(COPY)}/${SUPPRESSIONS} · ${file}`),
  ];
}

const found = [...directives(), ...suppressions()];
for (const line of found) console.log(`  KEPT NOT · ${line}`);
console.log(
  found.length === 0
    ? 'the way of working keeps its rules: no directive, no suppression'
    : `${String(found.length)} turned off: fix the code, never the check`,
);
process.exitCode = found.length === 0 ? 0 : 1;
