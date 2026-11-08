/**
 * - `componentTiers` · the atomic tiers of `app/components/`, held by boundaries
 * - an atom composes none; a molecule no tier above nor context; an organism: barrel
 */
import loaded from 'eslint-plugin-boundaries';
import type { ESLint, Linter } from 'eslint';
import { resolutionOf } from './resolution.ts';

// a CommonJS package: Node hands over its exports whole, where its types expect `default`
const isAPlugin = (exported: unknown): exported is ESLint.Plugin =>
  typeof exported === 'object' && exported !== null && 'rules' in exported;
const boundaries: unknown = loaded;
if (!isAPlugin(boundaries)) throw new Error('boundaries is no ESLint plugin');

const COMPONENTS = 'app/components';
const TIERS = ['atom', 'molecule', 'organism', 'template'] as const;

// a component is a folder of its tier; icons one folder; any other folder is a component still
const ELEMENTS = [
  ...TIERS.map((type) => ({
    type,
    pattern: `${COMPONENTS}/${type}s/*`,
    partialMatch: false,
    capture: ['name'],
  })),
  { type: 'icon', pattern: `${COMPONENTS}/icons`, partialMatch: false },
  { type: 'untiered', pattern: `${COMPONENTS}/*`, partialMatch: false },
];

const A_COMPONENT = [...TIERS, 'icon', 'untiered'];
const RULES = 'docs/rules/components.md';
// React reads a context by `useContext`, and since React 19 by `use`
const CONTEXT = {
  to: { module: { source: 'react' } },
  dependency: { specifiers: ['useContext', 'use'] },
};

// read in order, the last policy that matches decides; a component's own files are not read
const POLICIES = [
  {
    from: { element: { type: 'atom' } },
    disallow: { to: { element: { types: A_COMPONENT } } },
    message: `An atom composes nothing: a component joined with another is a molecule (${RULES}).`,
  },
  {
    from: { element: { type: 'molecule' } },
    disallow: { to: { element: { types: ['organism', 'template'] } } },
    message: `A molecule composes atoms and one molecule, never a tier above it (${RULES}).`,
  },
  {
    disallow: {
      to: { element: { type: 'organism', fileInternalPath: '!index.ts' } },
    },
    message: `An organism is mounted through its barrel, its \`index.ts\` (${RULES}).`,
  },
  {
    from: { element: { type: 'molecule' } },
    disallow: CONTEXT,
    message: `A molecule is props in and callbacks out: it reads no context (${RULES}).`,
  },
  {
    from: {
      element: { type: 'organism', fileInternalPath: '!{providers,hooks}/**' },
    },
    disallow: CONTEXT,
    message: `An organism's root and parts draw: a context is read in its \`providers/\` or \`hooks/\` (${RULES}).`,
  },
];

// resolved by the repository's tsconfig; every file known, so a page and a package are read
const componentTiers = (root: string): Linter.Config => ({
  plugins: { boundaries },
  settings: {
    'boundaries/elements': ELEMENTS,
    'boundaries/files': [{ category: 'source', pattern: '**/*' }],
    'boundaries/root-path': root,
    'import/resolver': { typescript: resolutionOf(root) },
  },
  rules: {
    'boundaries/dependencies': [
      'error',
      { default: 'allow', checkAllOrigins: true, policies: POLICIES },
    ],
  },
});

export { componentTiers };
