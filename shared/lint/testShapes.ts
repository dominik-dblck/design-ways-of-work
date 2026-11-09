/**
 * - `TEST_SHAPES` · what a test refuses beyond every file's shapes:
 * - a presence asserted another way, a deprecated matcher
 */
import type { Shape } from './shapes.ts';

// a query that throws when nothing is drawn, so only `toBeTruthy()` reads it
const A_QUERY = '/^(?:getBy|getAllBy|findBy|findAllBy)/';
const QUERIED = `CallExpression:matches([callee.name=${A_QUERY}], [callee.property.name=${A_QUERY}])`;
const ASSERTED_ANOTHER_WAY = [
  "MemberExpression.callee[property.name=/^(?:toBeDefined|toBeInTheDocument)$/] > CallExpression.object[callee.name='expect']",
  "MemberExpression.callee[property.name=/^(?:toBeNull|toBeUndefined)$/] > MemberExpression.object[property.name='not'] > CallExpression.object[callee.name='expect']",
].flatMap((asserted) => [
  `CallExpression[arguments.length=0] > ${asserted} > ${QUERIED}`,
  `CallExpression[arguments.length=0] > ${asserted} > AwaitExpression > ${QUERIED}`,
]);

const TEST_SHAPES: readonly Shape[] = [
  {
    selector: ASSERTED_ANOTHER_WAY.join(', '),
    message:
      'A drawn element is asserted present one way, `expect(getBy…(…)).toBeTruthy()` (docs/rules/tests.md).',
  },
  {
    selector: "MemberExpression[property.name='toMatchTypeOf']",
    message:
      'A type test never reads the deprecated `toMatchTypeOf`: `toExtend` is its name (`.not.toExtend` proves a swap refused), `toEqualTypeOf` where two brands share a primitive (docs/rules/tests.md).',
  },
];

export { TEST_SHAPES };
