/**
 * - `apiConvention` · api-convention.md as data, printed at its path byte for byte
 */
import type { DocumentFile } from '../../docs/documents/documentTypes.ts';
import { ENDPOINT_CHECKS } from './apiConvention/endpointChecks.ts';
import { ENDPOINT_SHAPE } from './apiConvention/endpointShape.ts';

const apiConvention: DocumentFile = {
  path: 'sheet/contract/api-convention.md',
  sections: [...ENDPOINT_SHAPE, ...ENDPOINT_CHECKS],
};

export { apiConvention };
