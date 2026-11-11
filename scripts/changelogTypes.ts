/**
 * - `Unreleased` · the release in hand, as its changelog row is written
 */

interface Unreleased {
  // patch: nothing a repository sees; minor: more, nothing to do; major: an action
  readonly kind: 'patch' | 'minor' | 'major';
  readonly what: string;
  // what a repository does to take it, beside moving its pin
  readonly action: string;
  // by repository: each difference the gate finds there that this release means, and why
  readonly outputs: Readonly<Record<string, Readonly<Record<string, string>>>>;
}

export type { Unreleased };
