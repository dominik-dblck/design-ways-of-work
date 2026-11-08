/**
 * - `node scripts/wrap-headers.ts <file>...` · a bullet past its length, in two
 * - cut at a clause: a colon first, then a comma; a header with no room is listed
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  A_HEADER,
  bulletsOf,
  LONGEST_BULLET,
  MOST_BULLETS,
  PROLOGUE,
} from '../shared/lint/header.ts';

// the cuts a bullet takes, best first: the colon that ends its subject, then a list's comma
const CUTS = [': ', '; ', ', '];
const SHORTEST_TAIL = 20;

// a bullet in two at its best cut, each half in its length; null when none fits
function cutOf(bullet: string): readonly [string, string] | null {
  const fits = CUTS.flatMap((cut, rank) =>
    [...bullet.matchAll(new RegExp(cut, 'g'))].flatMap(({ index }) => {
      const head = bullet.slice(0, index);
      const tail = bullet.slice(index + cut.length);
      return head.length <= LONGEST_BULLET && tail.length <= LONGEST_BULLET
        ? [{ head, tail, rank, isShort: tail.length < SHORTEST_TAIL }]
        : [];
    }),
  );
  const best = [...fits].sort(
    (one, other) =>
      Number(one.isShort) - Number(other.isShort) ||
      one.rank - other.rank ||
      other.head.length - one.head.length,
  )[0];
  return best === undefined ? null : [best.head, best.tail];
}

// a header's bullets, each past its length cut in two; null when they will not fit
function wrapped(bullets: readonly string[]): readonly string[] | null {
  const lines: (readonly string[] | null)[] = bullets.map((bullet) =>
    bullet.length <= LONGEST_BULLET ? [bullet] : cutOf(bullet),
  );
  const flat = lines.flatMap((line) => line ?? []);
  return lines.includes(null) || flat.length > MOST_BULLETS ? null : flat;
}

const files = process.argv.slice(2);
const verdicts = files.map((file) => {
  const text = fs.readFileSync(path.resolve(file), 'utf8');
  const bullets = bulletsOf(text);
  if (bullets === null || bullets.every((one) => one.length <= LONGEST_BULLET))
    return 'held';
  const lines = wrapped(bullets);
  if (lines === null) {
    console.log(`${file} · no room to wrap: its header is a person's`);
    return 'listed';
  }
  const prologue = PROLOGUE.exec(text)?.[0] ?? '';
  const header = `/**\n${lines.map((line) => ` * - ${line}`).join('\n')}\n */`;
  fs.writeFileSync(
    path.resolve(file),
    `${prologue}${text.slice(prologue.length).replace(A_HEADER, header)}`,
  );
  return 'wrapped';
});
console.log(
  `${String(verdicts.filter((one) => one === 'wrapped').length)} wrapped, ${String(verdicts.filter((one) => one === 'listed').length)} listed`,
);
process.exitCode = verdicts.includes('listed') ? 1 : 0;
