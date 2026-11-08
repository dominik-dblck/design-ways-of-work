/**
 * - `config` · knip over this repository's own code: a file, an export or a type nobody reads
 * - design/, dev/ and shared/ run inside a product, so knip reads them there (verify), not here
 */
import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['scripts/*.ts', 'shared/hooks/*.ts'],
  project: ['scripts/**/*.ts', 'shared/hooks/**/*.ts', 'design-system/**/*.ts'],
  // the product's code runs on this repository's packages through the rehearsal's link
  exclude: ['dependencies', 'devDependencies'],
  // the tests under design/ are the product's, run by its own vitest
  vitest: false,
};

export default config;
