/**
 * - `NEXT` · the release in hand: what it is, what it asks, each output it moves
 * - `RELEASES` · each release put out, the newest first, as the release wrote it
 */
import type { Release, Unreleased } from '../scripts/changelogTypes.ts';

const NEXT: Unreleased = {
  kind: 'patch',
  what: '',
  action: 'none: move the pin to the tag',
  rules: { added: [], changed: [], removed: [] },
  outputs: {},
};

const RELEASES: readonly Release[] = [
  {
    version: '0.2.0',
    date: '2026-11-11',
    kind: 'minor',
    what: 'an install unpacks the four homes and the manifest alone and runs no second install; the homes are byte for byte those of v0.1.10',
    action: 'none: move the pin to the tag',
    rules: { added: [], changed: [], removed: [] },
    outputs: {},
    moved: {},
    tried: { 'eagle-design': '590a2b0' },
  },
];

export { NEXT, RELEASES };
