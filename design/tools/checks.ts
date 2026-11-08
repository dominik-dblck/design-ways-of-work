/**
 * - `node tools/checks.ts [a,c] [--snap]` · the project's checks on the built mirror
 * - each part's lines, OK or FAIL, then its tally; exit 1 on a failed line
 * - lists the files the checks wrote, to publish with the change
 */
import fs from 'node:fs';
import path from 'node:path';
import { mirrorAt, tallyOf } from '../guards/checks/checkWorld.ts';
import type { Mirror } from '../guards/checks/checkWorld.ts';
import { contentTypePart } from '../guards/checks/contentTypePart.ts';
import { guardPart } from '../guards/checks/guardPart.ts';
import { journeysPart } from '../guards/checks/journeysPart.ts';
import { listPart } from '../guards/checks/listPart.ts';
import { pagesPart } from '../guards/checks/pagesPart.ts';
import { propsPart } from '../guards/checks/propsPart.ts';
import { flowPart, rulesPart } from '../guards/checks/rulesParts.ts';
import { sourceOf } from './layout.ts';
import { sentencesPart } from '../guards/checks/sentencesPart.ts';
import { wireframesPart } from '../guards/checks/wireframesPart.ts';
import { builtRoot } from './root.ts';

// the parts in the order a full run takes them; b, c and d diff against snapshots retaken by hand
const PARTS: Readonly<
  Record<string, ((mirror: Mirror) => readonly string[]) | undefined>
> = {
  a: guardPart,
  e: flowPart,
  f: rulesPart,
  g: journeysPart,
  b: sentencesPart,
  c: contentTypePart,
  d: listPart,
  w: wireframesPart,
  r: pagesPart,
  h: propsPart,
};

function partText(part: string, mirror: Mirror): string {
  const started = Date.now();
  try {
    const lines = (PARTS[part] ?? ((): readonly string[] => []))(mirror);
    const seconds = Math.round((Date.now() - started) / 1000);
    return `${lines.join('\n')}\n${tallyOf(lines)} · part ${part} · ${seconds} s`;
  } catch (error) {
    const said =
      error instanceof Error ? error.stack || error.message : String(error);
    return `FAIL · part ${part} threw · ${said.slice(0, 400)}`;
  }
}

function partsAsked(args: readonly string[]): readonly string[] {
  return (
    args.find((one) => !one.startsWith('--')) || Object.keys(PARTS).join(',')
  )
    .split(',')
    .map((one) => one.trim())
    .filter(Boolean);
}

function mirrorOf(mode: string): Mirror | null {
  const root = builtRoot();
  if (!fs.existsSync(path.join(root, 'source-check.js'))) {
    console.error(`no built project at ${root} · run yarn build first`);
    return null;
  }
  const copyTo = process.env.DESIGN_SAVE ? sourceOf : null;
  return mirrorAt(root, { mode, copyTo });
}

function main(): number {
  const args = process.argv.slice(2);
  const mode = args.includes('--snap') ? 'snap' : 'diff';
  const parts = partsAsked(args);
  const mirror = mirrorOf(mode);
  if (!mirror) return 2;
  let failed = 0;
  for (const part of parts) {
    const text = partText(part, mirror);
    console.log(`── part ${part}\n${text}`);
    failed += (text.match(/^FAIL/gm) ?? []).length;
  }
  const saved = mirror.saved();
  if (saved.length)
    console.log(
      `\nwritten by the checks (publish with the change): ${saved.join(', ')}`,
    );
  console.log(
    `\n${failed ? `${failed} FAILED` : 'ALL GREEN'} · parts ${parts.join(',')} · mode ${mode}`,
  );
  return failed ? 1 : 0;
}

process.exit(main());
