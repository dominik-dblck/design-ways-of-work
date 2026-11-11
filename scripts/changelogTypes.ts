/**
 * - `Unreleased` · the release in hand, as its changelog row is written
 * - `Release` · a release put out: that row, and what the release script adds
 */

interface RuleKeys {
  readonly added: readonly string[];
  readonly changed: readonly string[];
  // a key that left: a sheet row still naming it points at no rule
  readonly removed: readonly string[];
}

interface Unreleased {
  // patch: nothing a repository sees; minor: more, nothing to do; major: an action
  readonly kind: 'patch' | 'minor' | 'major';
  readonly what: string;
  // what a repository does to take it, beside moving its pin
  readonly action: string;
  // the keys of the rules it adds, changes or removes
  readonly rules: RuleKeys;
  // by repository: each difference the gate finds there that this release means, and why
  readonly outputs: Readonly<Record<string, Readonly<Record<string, string>>>>;
}

interface Release extends Unreleased {
  readonly version: string;
  readonly date: string;
  // by home: each path that moved or left since the release before, as git names it
  readonly moved: Readonly<Record<string, readonly string[]>>;
  // by repository: the commit of its branch the release was written against
  readonly tried: Readonly<Record<string, string>>;
}

export type { Release, Unreleased };
