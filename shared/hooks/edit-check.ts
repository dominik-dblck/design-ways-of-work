/**
 * - a Claude Code PostToolUse hook: a file written is formatted, fixed, spelled
 * - what stays wrong goes back to the agent as context; it never blocks the edit
 * - each tool's own ignore decides its scope, in whichever repository it runs
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ESLint } from 'eslint';
import * as prettier from 'prettier';

const ROOT = process.cwd();
const LINTED = /\.(ts|tsx|mts)$/;

function editedFile(input: string): string | null {
  const said: unknown = JSON.parse(input || '{}');
  const toolInput: unknown = Reflect.get(Object(said), 'tool_input');
  const file: unknown = Reflect.get(Object(toolInput), 'file_path');
  if (typeof file !== 'string' || !file.startsWith(`${ROOT}/`)) return null;
  return fs.existsSync(file) ? file : null;
}

async function formatOne(file: string): Promise<void> {
  const fileInfo = await prettier.getFileInfo(file, {
    ignorePath: path.join(ROOT, '.prettierignore'),
  });
  if (fileInfo.ignored || fileInfo.inferredParser === null) return;
  const text = fs.readFileSync(file, 'utf8');
  const options = await prettier.resolveConfig(file);
  const formatted = await prettier.format(text, { ...options, filepath: file });
  if (formatted !== text) fs.writeFileSync(file, formatted);
}

async function lintOne(file: string): Promise<readonly string[]> {
  const eslint = new ESLint({ cwd: ROOT, fix: true, applySuppressions: true });
  if (!LINTED.test(file) || (await eslint.isPathIgnored(file))) return [];
  const fileResults = await eslint.lintFiles([file]);
  await ESLint.outputFixes(fileResults);
  return fileResults.flatMap((fileResult) =>
    fileResult.messages.map(
      (one) => `${path.relative(ROOT, file)}:${one.line} ${one.message}`,
    ),
  );
}

// cspell on the file when its scope spells it: each word no dictionary holds, where it stands
function spellOne(file: string): readonly string[] {
  const run = spawnSync(
    path.join(ROOT, 'node_modules/.bin/cspell'),
    ['--no-progress', '--no-summary', '--no-must-find-files', '--file', file],
    { cwd: ROOT, encoding: 'utf8' },
  );
  const found = (run.stdout ?? '').split('\n').filter(Boolean);
  // a run that never spelled says why, never nothing (eagle-dev's F1)
  if (run.error) return [`cspell did not run: ${run.error.message}`];
  if (run.status !== 0 && !found.length)
    return [
      `cspell did not run: ${(run.stderr ?? '').split('\n').find(Boolean) ?? `exit ${String(run.status)}`}`,
    ];
  return found;
}

const titled = (title: string, lines: readonly string[]): readonly string[] =>
  lines.length ? [`${title}:`, ...lines] : [];

const file = editedFile(fs.readFileSync(0, 'utf8'));
if (file) {
  await formatOne(file);
  const said = [
    ...titled('ESLint, after fixes', await lintOne(file)),
    ...titled('cspell', spellOne(file)),
  ];
  if (said.length)
    console.log(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PostToolUse',
          additionalContext: said.join('\n'),
        },
      }),
    );
}
