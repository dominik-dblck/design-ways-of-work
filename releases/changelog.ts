/**
 * - `NEXT` · the release in hand: what it is, what it asks, each output it moves
 */
import type { Unreleased } from '../scripts/changelogTypes.ts';

const NEXT: Unreleased = {
  kind: 'minor',
  what: 'a release is tried on a clone of each repository that takes it, and put out by one command',
  action: 'none: move the pin to the tag',
  outputs: {},
};

export { NEXT };
