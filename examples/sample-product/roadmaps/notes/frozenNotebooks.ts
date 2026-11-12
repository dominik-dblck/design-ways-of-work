/**
 * - `FROZEN_NOTEBOOKS` · each closed epic's notebook, the sha256 of its text then
 * - `A_NOTEBOOK` · where a notebook stands: markdown once closed, data while open
 */
interface FrozenNotebook {
  readonly epic: string;
  readonly digest: string;
}

const FROZEN_NOTEBOOKS: readonly FrozenNotebook[] = [];

const A_NOTEBOOK = /^roadmaps\/(E\d{2})\/(?:feature-\1\.md|\1Notes\.ts)$/;

export { A_NOTEBOOK, FROZEN_NOTEBOOKS };
