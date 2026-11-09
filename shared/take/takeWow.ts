/**
 * - `node takeWow.ts [--check] [--from dir]` · take the homes package.json names
 * - run from a copy of its folder: node strips no type under node_modules
 * - `--check` · the take would change nothing, and the record is current
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { filesOfHomes } from './takeHomes.ts';
import { planTake } from './takePlan.ts';
import type { Plan } from './takePlan.ts';
import { takenFiles, writeExclude, writeRecord } from './takeRecord.ts';

const ROOT = process.cwd();
const PACKAGE = 'design-ways-of-work';

const argAfter = (flag: string): string | undefined => {
  const at = process.argv.indexOf(flag);
  return at === -1 ? undefined : process.argv[at + 1];
};

const readJson = (file: string): Record<string, unknown> =>
  Object(JSON.parse(fs.readFileSync(file, 'utf8')));

const digestOf = (file: string): string | undefined =>
  fs.existsSync(file)
    ? createHash('sha256').update(fs.readFileSync(file)).digest('hex')
    : undefined;

// the product names what it takes: nothing by default
function homesTaken(): readonly string[] {
  const wow = Object(readJson(path.join(ROOT, 'package.json')).wow);
  const takes: unknown = wow.takes;
  if (!Array.isArray(takes) || takes.length === 0)
    throw new Error(
      'package.json · wow.takes names no home of the way of working',
    );
  return takes.map(String);
}

// git's names with -z: split on NUL, never quoted
const trackedFiles = (): ReadonlySet<string> =>
  new Set(
    execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' })
      .split('\0')
      .filter(Boolean),
  );

function removeFile(file: string): void {
  fs.rmSync(path.join(ROOT, file));
  // the folders the take emptied go with it, never the root
  for (
    let folder = path.dirname(path.join(ROOT, file));
    folder !== ROOT && fs.readdirSync(folder).length === 0;
    folder = path.dirname(folder)
  )
    fs.rmdirSync(folder);
}

function applyPlan({
  plan,
  from,
}: {
  readonly plan: Plan;
  readonly from: ReadonlyMap<string, string>;
}): void {
  for (const file of plan.writes) {
    const target = path.join(ROOT, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(String(from.get(file)), target);
  }
  for (const file of plan.removes) removeFile(file);
}

const isRecordCurrent = ({
  recorded,
  wanted,
}: {
  readonly recorded: ReadonlyMap<string, string>;
  readonly wanted: ReadonlyMap<string, string>;
}): boolean =>
  recorded.size === wanted.size &&
  [...wanted].every(([file, digest]) => recorded.get(file) === digest);

interface Taken {
  readonly version: string;
  readonly from: ReadonlyMap<string, string>;
  readonly wanted: ReadonlyMap<string, string>;
}

// the tag as installed: each file the product takes, where it comes from and its digest
function theTag(source: string): Taken {
  const version = String(readJson(path.join(source, 'package.json')).version);
  const from = new Map(
    filesOfHomes({ source, homes: homesTaken() }).map(
      ([here, at]) => [at, here] as const,
    ),
  );
  const wanted = new Map(
    [...from].map(([at, here]) => [at, String(digestOf(here))] as const),
  );
  return { version, from, wanted };
}

// a file absent from the disk has no digest, so the plan reads it as absent
const digestsOnDisk = (files: readonly string[]): ReadonlyMap<string, string> =>
  new Map(
    files.flatMap((file) => {
      const digest = digestOf(path.join(ROOT, file));
      return digest === undefined ? [] : [[file, digest] as const];
    }),
  );

function check({
  plan,
  tag,
  recorded,
}: {
  readonly plan: Plan;
  readonly tag: Taken;
  readonly recorded: ReadonlyMap<string, string>;
}): void {
  for (const file of plan.writes) console.log(`  DIFFERS · ${file}`);
  for (const file of plan.removes) console.log(`  GONE FROM THE TAG · ${file}`);
  const isCurrent =
    plan.writes.length === 0 &&
    plan.removes.length === 0 &&
    isRecordCurrent({ recorded, wanted: tag.wanted });
  console.log(
    isCurrent
      ? `${PACKAGE} ${tag.version} · ${tag.wanted.size} files, each the tag's`
      : `${PACKAGE} ${tag.version} · not the tag's: run yarn wow`,
  );
  process.exitCode = isCurrent ? 0 : 1;
}

function take({
  plan,
  tag,
}: {
  readonly plan: Plan;
  readonly tag: Taken;
}): void {
  applyPlan({ plan, from: tag.from });
  writeRecord({ root: ROOT, version: tag.version, digests: tag.wanted });
  writeExclude({ root: ROOT, files: [...tag.wanted.keys()] });
  console.log(
    `${PACKAGE} ${tag.version} · ${tag.wanted.size} files taken: ${plan.writes.length} written, ${plan.removes.length} removed`,
  );
}

// a refusal stops the take before it writes anything, the check included
function main(): void {
  const source = path.resolve(
    ROOT,
    argAfter('--from') ?? path.join('node_modules', PACKAGE),
  );
  const tag = theTag(source);
  const recorded = takenFiles(ROOT);
  const files = [...new Set([...tag.wanted.keys(), ...recorded.keys()])];
  const plan = planTake({
    wanted: tag.wanted,
    recorded,
    onDisk: digestsOnDisk(files),
    tracked: trackedFiles(),
  });
  for (const { file, why } of plan.refusals)
    console.log(`  REFUSED · ${file} · ${why}`);
  if (plan.refusals.length > 0) {
    console.log(
      `${PACKAGE} ${tag.version} · the take stopped: nothing written`,
    );
    process.exitCode = 1;
  } else if (process.argv.includes('--check')) check({ plan, tag, recorded });
  else take({ plan, tag });
}

main();
