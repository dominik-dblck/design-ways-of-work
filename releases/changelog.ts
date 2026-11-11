/**
 * - `NEXT` · the release in hand: what it is, what it asks, each output it moves
 * - `RELEASES` · each release put out, the newest first, as the release wrote it
 */
import type { Release, Unreleased } from '../scripts/changelogTypes.ts';

const NEXT: Unreleased = {
  kind: 'minor',
  what: 'a release is tried on a clone of each repository that takes it, and put out by one command; an install unpacks the four homes alone',
  action: 'none: move the pin to the tag',
  rules: [],
  outputs: {},
};

const RELEASES: readonly Release[] = [];

export { NEXT, RELEASES };
