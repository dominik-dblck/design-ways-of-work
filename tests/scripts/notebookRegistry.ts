/**
 * - `NOTEBOOK_REGISTRY` · a product's registry of where its notebooks stand
 */

const NOTEBOOK_REGISTRY = {
  file: 'roadmaps/notes/frozenNotebooks.ts',
  text: `${String.raw`export const A_NOTEBOOK = /^roadmaps\/(E\d{2})\/(?:feature-\1\.md|\1Notes\.ts)$/;`}\n`,
} as const;

export { NOTEBOOK_REGISTRY };
