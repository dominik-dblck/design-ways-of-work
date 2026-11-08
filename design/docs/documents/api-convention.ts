/**
 * - `apiConvention` · api-convention.md as data, printed at its path byte for byte
 */
import type { DocumentFile } from './documentTypes.ts';
import { CONVENTION_ONE } from './api-convention/apiConventionOne.ts';
import { CONVENTION_TWO } from './api-convention/apiConventionTwo.ts';

const apiConvention: DocumentFile = {
  path: 'sheet/contract/api-convention.md',
  sections: [...CONVENTION_ONE, ...CONVENTION_TWO],
};

export { apiConvention };
