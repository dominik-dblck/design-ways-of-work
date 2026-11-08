/**
 * - `Renderer`, `RENDERERS`, `ladderOf` · an app inside an app; its ladder
 * - `isUnder`, `moleculeOf`, `moleculeNameOf` · a path in a folder; a molecule
 */
import type { JSONSchema } from '@typescript-eslint/utils';

// a renderer: its folder, and the app it is drawn inside
interface Renderer {
  readonly folder: string;
  readonly app: string;
}

// the renderers as a rule's option
const RENDERERS: JSONSchema.JSONSchema4 = {
  type: 'array',
  items: {
    type: 'object',
    properties: { folder: { type: 'string' }, app: { type: 'string' } },
    required: ['folder', 'app'],
    additionalProperties: false,
  },
};

const isUnder = (file: string, folder: string): boolean =>
  file === folder || file.startsWith(`${folder}/`);

// a renderer is an app inside the app: its components climb a ladder of their own
const ladderOf = (file: string, renderers: readonly Renderer[]): string =>
  renderers.find(({ folder }) => isUnder(file, folder))?.folder ?? '';

// a molecule by its root and folder: two roots' molecules of one name are two
function moleculeOf(
  file: string | null,
  components: readonly string[],
): string | null {
  const root = components.find(
    (one) => file?.startsWith(`${one}/molecules/`) === true,
  );
  if (file === null || root === undefined) return null;
  const [folder = ''] = file.slice(`${root}/molecules/`.length).split('/');
  return folder === '' || folder.includes('.')
    ? null
    : `${root}/molecules/${folder}`;
}

const moleculeNameOf = (molecule: string): string =>
  molecule.slice(molecule.lastIndexOf('/') + 1);

export { isUnder, ladderOf, moleculeNameOf, moleculeOf, RENDERERS };
export type { Renderer };
