/**
 * - `componentTiers` · the atomic tiers of each ladder, held by boundaries
 * - an atom composes none; a molecule no tier above nor context; an organism: barrel
 * - the app's roots climb one ladder, each renderer its own (`ladderOf`)
 */
import loaded from 'eslint-plugin-boundaries';
import type { ESLint, Linter } from 'eslint';
import type { RepoScope } from '../repoScope.ts';
import { ladderOf } from './componentLadders.ts';
import type { Renderer } from './componentLadders.ts';
import { resolutionOf } from './resolution.ts';

// a CommonJS package: Node hands over its exports whole, where its types expect `default`
const isAPlugin = (exported: unknown): exported is ESLint.Plugin =>
  typeof exported === 'object' && exported !== null && 'rules' in exported;
const boundaries: unknown = loaded;
if (!isAPlugin(boundaries)) throw new Error('boundaries is no ESLint plugin');

const TIERS = ['atom', 'molecule', 'organism', 'template'] as const;
const RULES = 'docs/rules/components.md';
// React reads a context by `useContext`, and since React 19 by `use`
const CONTEXT = {
  to: { module: { source: 'react' } },
  dependency: { specifiers: ['useContext', 'use'] },
};

type Roots = Pick<RepoScope, 'root' | 'components' | 'renderers'>;

// a ladder's own name for a kind: a renderer's tiers hold within it
const typeOf = (kind: string, at: number): string => `${kind}@${String(at)}`;

// the ladders: the app's own first, then each renderer's
const laddersOf = (renderers: readonly Renderer[]): readonly string[] => [
  '',
  ...renderers.map(({ folder }) => folder),
];

// a component is a folder of its tier; icons one folder; any other folder is a component still
const elementsOf = ({ components, renderers }: Roots): readonly object[] =>
  components.flatMap((root) => {
    const at = laddersOf(renderers).indexOf(ladderOf(root, renderers));
    return [
      ...TIERS.map((tier) => ({
        type: typeOf(tier, at),
        pattern: `${root}/${tier}s/*`,
        partialMatch: false,
        capture: ['name'],
      })),
      {
        type: typeOf('icon', at),
        pattern: `${root}/icons`,
        partialMatch: false,
      },
      {
        type: typeOf('untiered', at),
        pattern: `${root}/*`,
        partialMatch: false,
      },
    ];
  });

// one root's tiers: what each composes, its organisms through their barrels
const tierPolicies = (at: number): readonly object[] => [
  {
    from: { element: { type: typeOf('atom', at) } },
    disallow: {
      to: {
        element: {
          types: [...TIERS, 'icon', 'untiered'].map((kind) => typeOf(kind, at)),
        },
      },
    },
    message: `An atom composes nothing: a component joined with another is a molecule (${RULES}).`,
  },
  {
    from: { element: { type: typeOf('molecule', at) } },
    disallow: {
      to: {
        element: {
          types: [typeOf('organism', at), typeOf('template', at)],
        },
      },
    },
    message: `A molecule composes atoms and one molecule, never a tier above it (${RULES}).`,
  },
  {
    disallow: {
      to: {
        element: {
          type: typeOf('organism', at),
          fileInternalPath: '!index.ts',
        },
      },
    },
    message: `An organism is mounted through its barrel, its \`index.ts\` (${RULES}).`,
  },
];

// one root's contexts: a molecule reads none, an organism in its providers and hooks
const contextPolicies = (at: number): readonly object[] => [
  {
    from: { element: { type: typeOf('molecule', at) } },
    disallow: CONTEXT,
    message: `A molecule is props in and callbacks out: it reads no context (${RULES}).`,
  },
  {
    from: {
      element: {
        type: typeOf('organism', at),
        fileInternalPath: '!{providers,hooks}/**',
      },
    },
    disallow: CONTEXT,
    message: `An organism's root and parts draw: a context is read in its \`providers/\` or \`hooks/\` (${RULES}).`,
  },
];

// read in order, the last policy that matches decides; a component's own files are not read
const policiesOf = (renderers: readonly Renderer[]): readonly object[] =>
  laddersOf(renderers).flatMap((_ladder, at) => [
    ...tierPolicies(at),
    ...contextPolicies(at),
  ]);

// resolved by the repository's tsconfig; every file known, so a page and a package are read
const componentTiers = (roots: Roots): Linter.Config => ({
  plugins: { boundaries },
  settings: {
    'boundaries/elements': elementsOf(roots),
    'boundaries/files': [{ category: 'source', pattern: '**/*' }],
    'boundaries/root-path': roots.root,
    'import/resolver': { typescript: resolutionOf(roots.root) },
  },
  rules: {
    'boundaries/dependencies': [
      'error',
      {
        default: 'allow',
        checkAllOrigins: true,
        policies: policiesOf(roots.renderers),
      },
    ],
  },
});

export { componentTiers };
