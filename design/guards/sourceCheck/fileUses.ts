/**
 * - `callOf` · where a reader uses a file: its line, or its first call through it
 * - `usesOf` · each file's readers: a layered file's reads
 */
import { layerOf } from './sourceLayers.ts';
import { isCode } from './sourceScope.ts';
import type { CallRow, FileReads, Texts, UseRow } from './sourceCheckTypes.ts';

const NAME = '[A-Za-z_$][\\w$]*';

// the name a line takes a global under: var GR = root.GateRules, or a function returning it
function callPattern(line: string, global: string): RegExp | null {
  const taken = new RegExp(
    `(${NAME})\\s*=\\s*(?:root|window|globalThis)\\.${global}\\b(?!\\s*\\.)`,
  ).exec(line);
  if (taken)
    return new RegExp(
      `\\b${String(taken[1]).replace(/\$/g, '\\$')}\\.${NAME}\\s*\\(`,
    );
  const getter = new RegExp(
    `function\\s+(${NAME})\\s*\\(\\)\\s*\\{\\s*return\\s+(?:root|window|globalThis)\\.${global}\\b`,
  ).exec(line);
  return getter
    ? new RegExp(`\\b${String(getter[1])}\\(\\)\\.${NAME}\\s*\\(`)
    : null;
}

function callOf(
  text: unknown,
  {
    line,
    globals,
  }: { readonly line: number; readonly globals: readonly string[] },
): CallRow {
  const lines = String(text || '').split('\n');
  const own = lines[line - 1] || '';
  for (const global of globals) {
    const pattern = callPattern(own, global);
    if (!pattern) continue;
    const last = Math.min(lines.length, line + 300);
    for (let at = line - 1; at < last; at++) {
      const code = lines[at] ?? '';
      if (isCode(code) && pattern.test(code))
        return { line: at + 1, code: code.trim().slice(0, 120) };
    }
  }
  return { line, code: own.trim().slice(0, 120) };
}

function readUses(
  reads: Readonly<Record<string, FileReads>>,
  texts: Texts,
): Map<string, UseRow[]> {
  const uses = new Map<string, UseRow[]>();
  for (const [file, { reads: rows }] of Object.entries(reads))
    for (const read of rows) {
      if (read.file === file) continue;
      const call = callOf(texts[file], {
        line: read.line,
        globals: reads[read.file]?.exports ?? [],
      });
      uses.set(read.file, [
        ...(uses.get(read.file) ?? []),
        { file, line: call.line, code: call.code, layer: layerOf(file) },
      ]);
    }
  return uses;
}

function usesOf(
  reads: Readonly<Record<string, FileReads>>,
  texts: Texts,
): ReadonlyMap<string, readonly UseRow[]> {
  return readUses(reads, texts);
}

export { callOf, usesOf };
