// knip.config.ts · knip over the design project, from its scope
import { scope } from './scope.ts';
import { knipConfig } from './shared/lint/knipConfig.ts';

export default knipConfig(scope);
