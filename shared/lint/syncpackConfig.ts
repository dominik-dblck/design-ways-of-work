/**
 * - `SYNCPACK` · syncpack's config: one exact version per dependency
 */
import type { RcFile } from 'syncpack';

// every dependency of every package syncpack reads: the root's, and those its `workspaces` name
const EVERY = { dependencies: ['**'], packages: ['**'] };

const SYNCPACK: RcFile = {
  // a range lets two installs of one commit differ
  semverGroups: [
    {
      label: 'every dependency pinned to an exact version',
      range: '',
      ...EVERY,
    },
  ],
  // one name in two packages at two versions: the higher is the one both take
  versionGroups: [
    {
      label: 'one version per name, the highest',
      preferVersion: 'highestSemver',
      ...EVERY,
    },
  ],
};

export { SYNCPACK };
