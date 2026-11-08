/**
 * - `config` · knip over this repository's own code, from its scope
 * - design/, dev/ and shared/ run inside a product, so knip reads them there (verify), not here
 */
import type { KnipConfig } from 'knip';
import { scope } from './scope.ts';
import { knipConfig } from './shared/lint/knipConfig.ts';

const config: KnipConfig = {
  ...knipConfig(scope),
  // the product's code runs on this repository's packages through the rehearsal's link
  exclude: ['dependencies', 'devDependencies'],
};

export default config;
