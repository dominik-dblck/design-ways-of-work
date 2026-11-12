/**
 * - `TONES` · an endpoint's state as a chip's palette role
 */

// typed reads as done, a draft as waiting on a confirm, the rest as missing
const TONES = { typed: 'success', draft: 'warning', todo: 'error' } as const;

export { TONES };
