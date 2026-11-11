/**
 * - `bumped` · the version a release of a kind takes after another
 * - `leftSince` · by home, each path that moved or left since a tag
 * - `changelogText` · the changelog's file, its releases written, none in hand
 */
import { execFileSync } from 'node:child_process';
import type { Release, Unreleased } from './changelogTypes.ts';
import { childEnv } from './scratch.ts';

const PLACE = { major: 0, minor: 1, patch: 2 } as const;

// the number of its kind goes up by one, each after it back to zero
function bumped(version: string, kind: Unreleased['kind']): string {
  const numbers = version.split('.').map(Number);
  if (numbers.length !== 3 || numbers.some((one) => !Number.isInteger(one)))
    throw new Error(`${version} is no version of three numbers`);
  // below 1.0 an action raises the minor, as semver reads 0.x: 1.0.0 is named, never counted
  const isBelowOne = numbers[0] === 0;
  const at = isBelowOne && kind === 'major' ? PLACE.minor : PLACE[kind];
  return numbers
    .map((one, place) => {
      if (place < at) return one;
      return place === at ? one + 1 : 0;
    })
    .join('.');
}

// git's own names: R for a path that moved, D for one that left; a file only changed is no move
function leftSince({
  root,
  tag,
  homes,
}: {
  readonly root: string;
  readonly tag: string;
  readonly homes: readonly string[];
}): Readonly<Record<string, readonly string[]>> {
  const leftIn = (home: string): readonly string[] =>
    execFileSync(
      'git',
      [
        'diff',
        '--name-status',
        '-M',
        '--diff-filter=RD',
        tag,
        'HEAD',
        '--',
        home,
      ],
      { cwd: root, encoding: 'utf8', env: childEnv() },
    )
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [, from = '', to = 'gone'] = line.split('\t');
        return `${from} → ${to}`;
      });
  return Object.fromEntries(
    homes
      .map((home) => [home, leftIn(home)] as const)
      .filter(([, left]) => left.length > 0),
  );
}

const NOTHING_IN_HAND: Unreleased = {
  kind: 'patch',
  what: '',
  action: 'none: move the pin to the tag',
  rules: { added: [], changed: [], removed: [] },
  outputs: {},
};

// the file as data, laid out by prettier after: a hand's edit and the script's read alike
const changelogText = (releases: readonly Release[]): string =>
  [
    '/**',
    ' * - `NEXT` · the release in hand: what it is, what it asks, each output it moves',
    ' * - `RELEASES` · each release put out, the newest first, as the release wrote it',
    ' */',
    "import type { Release, Unreleased } from '../scripts/changelogTypes.ts';",
    '',
    `const NEXT: Unreleased = ${JSON.stringify(NOTHING_IN_HAND)};`,
    '',
    `const RELEASES: readonly Release[] = ${JSON.stringify(releases)};`,
    '',
    'export { NEXT, RELEASES };',
    '',
  ].join('\n');

export { bumped, changelogText, leftSince };
