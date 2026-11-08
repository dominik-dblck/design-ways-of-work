/**
 * - `TEST_SHAPES` · what `no-restricted-syntax` refuses in a test, besides
 * - time waited out, a presence asserted another way, a deprecated matcher
 */
import type { Shape } from './shapes.ts';

// a promise its timer settles: the executor hands `setTimeout` its settle, or a call of it; a deadline rejects
const SETTLED_BY_A_TIMER =
  "CallExpression[callee.name='setTimeout']:matches([arguments.0.type='Identifier'][arguments.0.name!=/^reject/], [arguments.0.body.type='CallExpression'][arguments.0.body.callee.name!=/^reject/])";
const A_SLEEP = [
  `NewExpression[callee.name='Promise'] > :function > ${SETTLED_BY_A_TIMER}`,
  `NewExpression[callee.name='Promise'] > :function > BlockStatement > ExpressionStatement > ${SETTLED_BY_A_TIMER}`,
];

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
    selector: [
      ...A_SLEEP,
      "CallExpression[callee.property.name='waitForTimeout']",
      'ImportDeclaration[source.value=/^(?:node:)?timers\\/promises$/]',
    ].join(', '),
    message:
      'A test moves time with fake timers (`vi.useFakeTimers`, `page.clock`), never waits it out (docs/rules/tests.md).',
  },
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
