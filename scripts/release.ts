/**
 * - `node scripts/release.ts [--trailer line]` · the release in hand, put out
 * - its row and version committed, main pushed past the gate, then its tag
 * - a refused push leaves no tag: mend it with a commit, run this again
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import * as prettier from 'prettier';
import { CONSUMERS } from '../ports/consumers.ts';
import { NEXT, RELEASES } from '../releases/changelog.ts';
import { HOMES } from '../shared/take/takeHomes.ts';
import type { Release } from './changelogTypes.ts';
import { hooksInstalled } from './hooksInstalled.ts';
import { changelogText, leftSince, versionOf } from './releaseSteps.ts';
import { overHttps, versioned } from './releaseTexts.ts';
import { HERE } from './repos.ts';
import { childEnv } from './scratch.ts';

const MANIFEST = path.join(HERE, 'package.json');
const CHANGELOG = path.join(HERE, 'releases', 'changelog.ts');
// a long pre-push outlives an SSH connection: the push goes over HTTPS, signed in by gh
const SIGNED_IN = [
  '-c',
  'credential.helper=',
  '-c',
  'credential.helper=!gh auth git-credential',
];

const asked = (args: readonly string[], root = HERE): string =>
  spawnSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    env: childEnv(),
  }).stdout.trim();

const done = (args: readonly string[]): boolean =>
  spawnSync('git', args, { cwd: HERE, stdio: 'inherit', env: childEnv() })
    .status === 0;

function stopped(why: string): never {
  console.error(`no release · ${why}`);
  process.exit(1);
}

function ready(): void {
  if (asked(['rev-parse', '--abbrev-ref', 'HEAD']) !== 'main')
    stopped('a release is cut from main');
  if (asked(['status', '--porcelain']) !== '')
    stopped('the tree holds uncommitted work');
  if (!hooksInstalled(HERE))
    stopped('git runs no hook here, so a push would pass no gate: yarn hooks');
}

function versionNow(): string {
  const manifest: Readonly<Record<string, unknown>> = JSON.parse(
    fs.readFileSync(MANIFEST, 'utf8'),
  );
  return String(manifest.version);
}

// by repository: the commit its branch stands on as the release is written
const triedOn = (): Readonly<Record<string, string>> =>
  Object.fromEntries(
    CONSUMERS.map(({ name, path: at, ref }) => [
      name,
      asked(['rev-parse', '--short', ref], path.resolve(HERE, at)),
    ]),
  );

async function written(version: string, last: string): Promise<void> {
  const release: Release = {
    version,
    date: new Date().toISOString().slice(0, 10),
    ...NEXT,
    moved: leftSince({
      root: HERE,
      tag: `v${last}`,
      homes: Object.keys(HOMES),
    }),
    tried: triedOn(),
  };
  // the manifest's text first: one that cannot take the version stops before a file is written
  const manifest = versioned(fs.readFileSync(MANIFEST, 'utf8'), {
    from: last,
    to: version,
  });
  const options = await prettier.resolveConfig(CHANGELOG);
  const text = changelogText([release, ...RELEASES]);
  fs.writeFileSync(
    CHANGELOG,
    await prettier.format(text, { ...options, filepath: CHANGELOG }),
  );
  fs.writeFileSync(MANIFEST, manifest);
}

function committed(version: string): void {
  const args = process.argv.slice(2);
  const trailers = args.flatMap((arg, at) =>
    arg === '--trailer' ? ['--trailer', args[at + 1] ?? ''] : [],
  );
  done(['add', '--', MANIFEST, CHANGELOG]);
  const message = ['-m', `chore(release): v${version}`, '-m', NEXT.what];
  if (done(['commit', ...message, ...trailers])) return;
  // the tree was clean before the two files were written: put back, it is clean again
  done(['restore', '--staged', '--worktree', '--', MANIFEST, CHANGELOG]);
  stopped(
    'the commit was refused, its checks say why above: nothing is left written',
  );
}

// main first, past the gate; its tag once the remote holds the commit, so the tag's own push checks nothing
function pushed(url: string, version: string): void {
  if (!done([...SIGNED_IN, 'push', url, 'main']))
    stopped('the push was refused and no tag is cut: mend it, run this again');
  const tag = `v${version}`;
  if (asked(['tag', '--list', tag]) === '') done(['tag', tag]);
  if (!done([...SIGNED_IN, 'push', url, `refs/tags/${tag}`]))
    stopped(`${tag} is cut here and not pushed: run this again`);
  console.log(`${tag} is out`);
}

// asked of the remote itself: a tag it holds is a release that went out whole
const isOut = (url: string, version: string): boolean =>
  asked([...SIGNED_IN, 'ls-remote', '--tags', url, `refs/tags/v${version}`]) !==
  '';

async function main(): Promise<void> {
  ready();
  const last = versionNow();
  const url = overHttps(asked(['remote', 'get-url', 'origin']));
  if (NEXT.what === '') {
    // a release written whose push or tag stopped goes out as it is: nothing is written twice
    if (RELEASES[0]?.version !== last || isOut(url, last))
      stopped('releases/changelog.ts · NEXT says nothing');
    pushed(url, last);
    return;
  }
  const version = versionOf(last, NEXT);
  await written(version, last);
  committed(version);
  pushed(url, version);
}

await main();
