/**
 * - `checkReach`, `refusalReach`, `needsJourney`, `omitted` · how far a case reaches
 */
import { REFUSAL_REACH } from './caseReachRows.ts';
import type { ReadEndpoint } from './testCasesTypes.ts';

function refusalReach(key: string): string {
  if (REFUSAL_REACH.api.includes(key)) return 'api';
  if (REFUSAL_REACH.shown.includes(key)) return 'shown';
  return 'guarded';
}

// a check is guarded when a 409 it names is one the editor meets greyed · one whose only 409s are keys a client mints is api
function checkReach(text: unknown): string {
  const keys = String(text).match(/409 ([a-z_]+\.[a-z_]+)/g) ?? [];
  return keys.some((found) => refusalReach(found.slice(4)) !== 'api')
    ? 'guarded'
    : 'api';
}

// a row's omits: the refusal keys and shared cases whose control the UI leaves out rather than greys
function omitted(endpoint: ReadEndpoint, key: string): boolean {
  return (endpoint.omits ?? []).includes(key);
}

function needsJourney(testCase: { readonly reach: string | null }): boolean {
  return testCase.reach === 'shown' || testCase.reach === 'guarded';
}

export { checkReach, needsJourney, omitted, refusalReach };
