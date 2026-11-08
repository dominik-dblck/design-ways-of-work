/**
 * - `apiConvention` · api-convention.md as data, printed at its path byte for byte
 */
import type { DocumentFile } from './documentTypes.ts';
import { ENDPOINT_CHECKS } from './api-convention/endpointChecks.ts';
import { ENDPOINT_SHAPE } from './api-convention/endpointShape.ts';

const apiConvention: DocumentFile = {
  path: 'sheet/contract/api-convention.md',
  sections: [...ENDPOINT_SHAPE, ...ENDPOINT_CHECKS],
};

export { apiConvention };
