/**
 * - a Claude Code hook: ESLint, with fixes, on the TypeScript file just written
 * - what stays wrong goes back to the session as context, never blocks the edit
 */
import fs from 'node:fs';
import path from 'node:path';
import { ESLint } from 'eslint';
import { ROOT } from './root.ts';

const SKIPPED = /\/(node_modules|dist|poc|\.artifact)\//;

function editedFile(input: string): string | null {
  const said: unknown = JSON.parse(input || '{}');
  const toolInput: unknown = Reflect.get(Object(said), 'tool_input');
  const file: unknown = Reflect.get(Object(toolInput), 'file_path');
  if (typeof file !== 'string' || !/\.(ts|tsx|mts)$/.test(file)) return null;
  if (!file.startsWith(ROOT) || SKIPPED.test(file)) return null;
  return fs.existsSync(file) ? file : null;
}

async function lintOne(file: string): Promise<string> {
  const eslint = new ESLint({ cwd: ROOT, fix: true });
  const results = await eslint.lintFiles([file]);
  await ESLint.outputFixes(results);
  const found = results.flatMap((result) =>
    result.messages.map(
      (one) => `${path.relative(ROOT, file)}:${one.line} ${one.message}`,
    ),
  );
  return found.join('\n');
}

const file = editedFile(fs.readFileSync(0, 'utf8'));
if (file) {
  const found = await lintOne(file);
  if (found)
    console.log(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PostToolUse',
          additionalContext: `ESLint, after fixes:\n${found}`,
        },
      }),
    );
}
