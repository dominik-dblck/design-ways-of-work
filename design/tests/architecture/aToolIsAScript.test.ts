/**
 * - `docs/rules/responsibility.md`: a tool sits in `tools/` and runs behind a `yarn` script
 * - a tool is a `tools/*.ts` no other tool imports; a Claude Code or git hook may run one too
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { importsOf, ROOT, textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

const A_RUN = /\bnode\s+(tools\/[\w-]+\.ts)\b/g;

// the files whose commands run a tool: the scripts, the git hooks, the Claude Code hooks
const RUNNERS = ['package.json', '.claude/settings.json'];

const runIn = (text: string): readonly string[] =>
  [...text.matchAll(A_RUN)].map(([, tool]) => tool);

function theTools(sources: readonly Source[]): readonly string[] {
  const imported = new Set(
    sources.flatMap((source) => importsOf(source).map(({ to }) => to)),
  );
  return sources
    .map((source) => source.path)
    .filter((file) => path.posix.dirname(file) === 'tools')
    .filter((file) => !imported.has(file));
}

const theRunners = (): string =>
  [
    ...RUNNERS.map((file) => fs.readFileSync(path.join(ROOT, file), 'utf8')),
    ...textsUnder('.husky', ['']).map((source) => source.text),
  ].join('\n');

describe('a tool is a script', () => {
  it('the scan sees what a command runs, and a tool another imports is a part', () => {
    expect(
      runIn('"checks": "node tools/build.ts && node tools/checks.ts"'),
    ).toEqual(['tools/build.ts', 'tools/checks.ts']);
    expect(
      theTools([
        { path: 'tools/build.ts', text: "import { all } from './emit.ts';" },
        { path: 'tools/emit.ts', text: '' },
        { path: 'tools/pack/packText.ts', text: '' },
      ]),
    ).toEqual(['tools/build.ts']);
  });

  it('every tool runs behind a script or a hook', () => {
    const run = new Set(runIn(theRunners()));
    const tools = theTools(textsUnder('tools', ['.ts']));
    expect(tools).toContain('tools/build.ts');
    expect(tools.filter((tool) => !run.has(tool))).toEqual([]);
  });
});
