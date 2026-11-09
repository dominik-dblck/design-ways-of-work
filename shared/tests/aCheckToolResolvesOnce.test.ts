/**
 * - a tool the checks load through another: one version in the lockfile
 * - a family released together, one version across every package of its scope
 * - a lockfile this test cannot read fails it, never passes it
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { PEERS } from '../lint/checkTools.ts';
import type { Peer } from '../lint/checkTools.ts';

const YARN_V1 = '# yarn lockfile v1';

// a specifier's package name: `typescript@^6` is `typescript`, `@types/node@*` is `@types/node`
// an alias names the package it installs: `old@npm:typescript@5` is `typescript`; one with no range is whole
function nameOf(specifier: string): string {
  const installs = specifier.split('@npm:').at(-1) ?? specifier;
  const range = installs.lastIndexOf('@');
  return range > 0 ? installs.slice(0, range) : installs;
}

// each name a yarn v1 lockfile holds, with its versions: an entry is its specifiers, then `version "…"`
function versionsByName(
  lockfile: string,
): ReadonlyMap<string, ReadonlySet<string>> {
  const byName = new Map<string, Set<string>>();
  for (const entry of lockfile.split('\n\n')) {
    const [head = '', ...lines] = entry.trim().split('\n');
    const version = lines
      .map((line) => /^ {2}version "([^"]+)"$/.exec(line)?.[1])
      .find((one) => one !== undefined);
    if (version === undefined) continue;
    for (const specifier of head.replace(/:$/, '').split(', ')) {
      const name = nameOf(specifier.replaceAll('"', ''));
      byName.set(name, (byName.get(name) ?? new Set()).add(version));
    }
  }
  return byName;
}

const lockfile = fs.readFileSync(path.join(scope.root, 'yarn.lock'), 'utf8');
const held = versionsByName(lockfile);

// a peer's versions: its own package's, and each of its family's
const versionsOf = ({ name, family }: Peer): readonly string[] => [
  ...new Set(
    [...held]
      .filter(
        ([one]) =>
          one === name || (family !== undefined && one.startsWith(family)),
      )
      .flatMap(([, versions]) => [...versions]),
  ),
];

describe('a check tool resolves once', () => {
  it('the lockfile is yarn v1, the one format this test reads', () => {
    expect(lockfile.split('\n').slice(0, 3)).toContain(YARN_V1);
  });

  it('each peer the checks load resolves to one version (`yarn deps:dedupe` merges a second)', () => {
    expect(
      PEERS.map((peer) => ({
        name: peer.name,
        versions: versionsOf(peer),
      })).filter(({ versions }) => versions.length !== 1),
    ).toEqual([]);
  });
});
