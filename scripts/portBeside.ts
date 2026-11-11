/**
 * - `laidBeside` · two changes of one text that share no line of it, both kept
 * - `ThreeWays` · three files: the text before, the branch's, the trunk's
 * - git reads two changes that touch as one place; here a shared line alone is
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const BUFFER = 1 << 28;
const HUNK = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/;

interface ThreeWays {
  readonly base: string;
  readonly ours: string;
  readonly theirs: string;
}

interface Hunk {
  // the gaps between the base's lines it stands between: one gap where it adds alone
  readonly from: number;
  readonly to: number;
  readonly lines: readonly string[];
}

// each line with its own end, so a text joins back byte for byte
function linesOf(text: string): readonly string[] {
  const parts = text.split('\n');
  const last = parts.at(-1) ?? '';
  return [
    ...parts.slice(0, -1).map((line) => `${line}\n`),
    ...(last === '' ? [] : [last]),
  ];
}

const textOf = (file: string): string => fs.readFileSync(file, 'utf8');

// a count git leaves out is one; a count of none names the line before the gap
function hunkOf(line: string, side: readonly string[]): readonly Hunk[] {
  const [, start = '', count = '1', sideStart = '', sideCount = '1'] =
    HUNK.exec(line) ?? [];
  if (start === '') return [];
  const [taken, given] = [Number(count), Number(sideCount)];
  const from = taken === 0 ? Number(start) : Number(start) - 1;
  const first = given === 0 ? Number(sideStart) : Number(sideStart) - 1;
  return [{ from, to: from + taken, lines: side.slice(first, first + given) }];
}

// one side's changes, each by the lines of the base it replaces
function hunksOf(base: string, side: string): readonly Hunk[] {
  const sideLines = linesOf(textOf(side));
  const args = ['diff', '--no-index', '--no-color', '--no-ext-diff', '-U0'];
  return spawnSync('git', [...args, base, side], {
    encoding: 'utf8',
    maxBuffer: BUFFER,
  })
    .stdout.split('\n')
    .flatMap((line) => hunkOf(line, sideLines));
}

const isSame = (one: Hunk, other: Hunk): boolean =>
  one.from === other.from &&
  one.to === other.to &&
  one.lines.join('') === other.lines.join('');

// two changes meet where they share a line of the base, or add at one gap
function meet(one: Hunk, other: Hunk): boolean {
  const isAdded = one.from === one.to;
  const isOtherAdded = other.from === other.to;
  if (isAdded && isOtherAdded) return one.from === other.from;
  if (isAdded) return other.from < one.from && one.from < other.to;
  if (isOtherAdded) return one.from < other.from && other.from < one.to;
  return Math.max(one.from, other.from) < Math.min(one.to, other.to);
}

interface Walked {
  readonly kept: readonly string[];
  // how many of the base's lines are behind
  readonly at: number;
}

// none when the two meet: that place is a person's to read
function laidBeside({ base, ours, theirs }: ThreeWays): string | undefined {
  const mine = hunksOf(base, ours);
  const trunk = hunksOf(base, theirs).filter(
    (one) => !mine.some((other) => isSame(one, other)),
  );
  if (trunk.some((one) => mine.some((other) => meet(one, other))))
    return undefined;
  const before = linesOf(textOf(base));
  const walked = [...mine, ...trunk]
    .sort((one, other) => one.from - other.from || one.to - other.to)
    .reduce<Walked>(
      ({ kept, at }, hunk) => ({
        kept: [...kept, ...before.slice(at, hunk.from), ...hunk.lines],
        at: hunk.to,
      }),
      { kept: [], at: 0 },
    );
  return [...walked.kept, ...before.slice(walked.at)].join('');
}

export { laidBeside };
export type { ThreeWays };
