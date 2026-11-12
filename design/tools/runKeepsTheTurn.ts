/**
 * - a Claude Code Stop hook: while `.claude/run.json` names a run, a reply opens
 * - with two bars, the run's and the piece's, ending on a `⏸️ stop:` line
 * - no run, or one marked done: the turn ends as it always does
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './root.ts';

const RUN_FILE = path.join(ROOT, '.claude', 'run.json');
const WHOLE = /^(🟢|🟡|🔴) .+ · krok \d+ z \d+ [▓░]+/u;
const PIECE = /^\S.* \d+ z \d+ [▓░]+/u;
const STOP = /^⏸️? ?stop: (decyzja|migawka|koniec|blokada)\b/u;
const EXAMPLE = [
  '🟢 B · krok 2 z 7 ▓▓░░░░░',
  'partia 2 · plik 30 z 64 ▓▓▓▓░░░░░░',
].join('\n');
const EACH_CHUNK =
  'Each chunk ends with lint, the tests, the checks, a commit and a push.';

// the run in hand, its name; none when the file is absent, unreadable or done
function runInHand(): string | null {
  try {
    const run: unknown = JSON.parse(fs.readFileSync(RUN_FILE, 'utf8'));
    const name: unknown = Reflect.get(Object(run), 'run');
    const done: unknown = Reflect.get(Object(run), 'done');
    return typeof name === 'string' && done !== true ? name : null;
  } catch {
    return null;
  }
}

function linesOf(input: string): readonly string[] {
  const event: unknown = JSON.parse(input || '{}');
  const said: unknown = Reflect.get(Object(event), 'last_assistant_message');
  return typeof said === 'string'
    ? said
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '')
    : [];
}

function heldBecause(run: string, lines: readonly string[]): string | null {
  if (lines.some((line) => STOP.test(line))) return null;
  const hasOpening = WHOLE.test(lines[0] ?? '') && PIECE.test(lines[1] ?? '');
  if (!hasOpening)
    return `${run} is a run: a reply opens with two progress lines, the whole run, then the piece in hand, e.g.\n${EXAMPLE}\nWrite them, then go on with the next step in this turn. ${EACH_CHUNK}`;
  return `${run} goes on: end the turn only with a line opening \`⏸️ stop:\` and one of decyzja (a choice the PM makes), migawka (a snapshot to retake), koniec (the run done) or blokada (blocked). ${EACH_CHUNK}`;
}

const run = runInHand();
const reason = run
  ? heldBecause(run, linesOf(fs.readFileSync(0, 'utf8')))
  : null;
if (reason)
  console.log(
    JSON.stringify({
      decision: 'block',
      reason,
      systemMessage: `🔵 **run** - turn end held: ${run}`,
    }),
  );
