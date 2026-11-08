/**
 * - `rendererStandsAlone` · a renderer is an app inside the app, reached one way
 * - it imports nothing of its app; the app enters it at a component's barrel
 */
import type { TSESTree } from '@typescript-eslint/utils';
import { isUnder, ladderOf, RENDERERS } from '../componentLadders.ts';
import type { Renderer } from '../componentLadders.ts';
import { createRule, moduleOf, pathOf } from './ruleKit.ts';

interface Roots {
  readonly components: readonly string[];
  readonly renderers: readonly Renderer[];
}
type Options = readonly [Roots];
type Breach = 'back' | 'past';

const RULES = 'docs/rules/components.md';
// a component's barrel below its root, as resolved or as written
const A_BARREL =
  /^(?:atoms|molecules|organisms|templates)\/[^/]+(?:\/index(?:\.ts)?)?$/;

// a path the app may name in a renderer: a component's barrel under one of its roots
const isABarrel = (target: string, roots: readonly string[]): boolean =>
  roots.some(
    (root) =>
      target.startsWith(`${root}/`) &&
      A_BARREL.test(target.slice(root.length + 1)),
  );

// what one named module breaks: a renderer's way back into its app, or the app's past a barrel
function breachOf(
  target: string,
  { own, roots }: { readonly own: Renderer | undefined; readonly roots: Roots },
): Breach | null {
  const other = ladderOf(target, roots.renderers);
  // a package outside the app is a library, read as the app reads one
  if (own !== undefined)
    return other !== own.folder && isUnder(target, own.app) ? 'back' : null;
  const entered = roots.components.filter(
    (root) => ladderOf(root, roots.renderers) === other,
  );
  return other === '' || isABarrel(target, entered) ? null : 'past';
}

const rendererStandsAlone = createRule<Options, Breach>({
  name: 'renderer-stands-alone',
  meta: {
    type: 'problem',
    docs: {
      description:
        'A renderer imports nothing of the app, and the app enters it at a barrel',
    },
    messages: {
      back: `\`{{target}}\` lies outside this renderer: a renderer is an app inside the app, and the dependency runs one way, the app to the renderer, never back (${RULES}).`,
      past: `\`{{target}}\` reaches past a renderer's barrels: the app sees a renderer from outside, one embedded whole, entered at a component's \`index.ts\` (${RULES}).`,
    },
    schema: [
      {
        type: 'object',
        properties: {
          components: { type: 'array', items: { type: 'string' } },
          renderers: RENDERERS,
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ components: [], renderers: [] }],
  create(context, [roots]) {
    if (roots.renderers.length === 0) return {};
    const file = pathOf(context);
    const own = roots.renderers.find(({ folder }) => isUnder(file, folder));
    const check = (source: TSESTree.Node | null): void => {
      if (source?.type !== 'Literal' || typeof source.value !== 'string')
        return;
      const target = moduleOf(context, source.value);
      const breach = target === null ? null : breachOf(target, { own, roots });
      if (breach !== null)
        context.report({
          node: source,
          messageId: breach,
          data: { target: source.value },
        });
    };
    return {
      ImportDeclaration: (node) => check(node.source),
      ExportNamedDeclaration: (node) => check(node.source),
      ExportAllDeclaration: (node) => check(node.source),
      ImportExpression: (node) => check(node.source),
    };
  },
});

export { rendererStandsAlone };
