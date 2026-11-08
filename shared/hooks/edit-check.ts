/**
 * - a Claude Code PostToolUse hook: a file just written is formatted and fixed
 * - what stays wrong goes back to the agent as context; it never blocks the edit
 * - each tool's own ignore decides its scope, in whichever repository it runs
 */
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
  const info = await prettier.getFileInfo(file, {
    ignorePath: path.join(ROOT, '.prettierignore'),
  });
  if (info.ignored || info.inferredParser === null) return;
  const text = fs.readFileSync(file, 'utf8');
  const options = await prettier.resolveConfig(file);
  const formatted = await prettier.format(text, { ...options, filepath: file });
  if (formatted !== text) fs.writeFileSync(file, formatted);
}

async function lintOne(file: string): Promise<readonly string[]> {
  const eslint = new ESLint({ cwd: ROOT, fix: true, applySuppressions: true });
  if (!LINTED.test(file) || (await eslint.isPathIgnored(file))) return [];
  const results = await eslint.lintFiles([file]);
  await ESLint.outputFixes(results);
  return results.flatMap((result) =>
    result.messages.map(
      (one) => `${path.relative(ROOT, file)}:${one.line} ${one.message}`,
    ),
  );
}

const file = editedFile(fs.readFileSync(0, 'utf8'));
if (file) {
  await formatOne(file);
  const found = await lintOne(file);
  if (found.length)
    console.log(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PostToolUse',
          additionalContext: `ESLint, after fixes:\n${found.join('\n')}`,
        },
      }),
    );
}
