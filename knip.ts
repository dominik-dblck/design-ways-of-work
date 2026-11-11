/**
 * - `config` · knip over this repository's own code, from its scope
 * - design/, dev/ and shared/ run inside a product, so knip reads them there (the gate), not here
 */
import type { KnipConfig } from 'knip';
import { scope } from './scope.ts';
import { knipConfig } from './shared/lint/knipConfig.ts';

const config: KnipConfig = {
  ...knipConfig(scope),
  // design/ runs in a product: the packages it reads are listed here, and read there
  exclude: ['dependencies', 'devDependencies'],
};

export default config;
