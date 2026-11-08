import { SHAPES } from '../../shared/lint/shapes.ts';
import { TEST_SHAPES } from '../../shared/lint/testShapes.ts';
import { refusal, restrictedSyntax, shapeTester } from './shapeTester.ts';

const OPTIONS = [...SHAPES, ...TEST_SHAPES];
const AT = 'app/__tests__/planted.test.ts';
const valid = (name: string, code: string) => ({
  name,
  code,
  filename: AT,
  options: OPTIONS,
});
const invalid = (
  name: string,
  { code, words }: { readonly code: string; readonly words: readonly string[] },
) => ({
  ...valid(name, code),
  errors: words.map((word) => refusal(TEST_SHAPES, word)),
});

shapeTester.run('the shapes a test refuses', restrictedSyntax, {
  valid: [
    valid(
      'time moved, and a deadline that rejects',
      "vi.useFakeTimers();\nawait vi.advanceTimersByTimeAsync(10);\nconst late = new Promise((_, reject) => setTimeout(() => reject(new Error('late')), 10));",
    ),
    valid(
      'a presence read one way, and a type test read exactly',
      "expect(screen.getByText('a')).toBeTruthy();\nexpect(queryByText('a')).toBeNull();\nexpectTypeOf<Left>().toEqualTypeOf<Right>();",
    ),
  ],
  invalid: [
    invalid('a sleep, handed its settle or calling it', {
      code: 'await new Promise((resolve) => setTimeout(resolve, 10));\nawait new Promise((done) => { setTimeout(() => done(), 10); });\nawait new Promise((done) => setTimeout(() => done(1), 9));',
      words: ['fake timers', 'fake timers', 'fake timers'],
    }),
    invalid('a page waited out, and timers as promises', {
      code: "import { setTimeout as sleep } from 'node:timers/promises';\nawait page.waitForTimeout(100);",
      words: ['fake timers', 'fake timers'],
    }),
    invalid('a presence asserted another way', {
      code: "expect(screen.getByText('a')).toBeInTheDocument();\nexpect(await screen.findByRole('row')).not.toBeNull();\nexpect(getAllByRole('cell')).toBeDefined();",
      words: ['one way', 'one way', 'one way'],
    }),
    invalid('the deprecated matcher', {
      code: 'expectTypeOf<Left>().toMatchTypeOf<Right>();',
      words: ['toMatchTypeOf'],
    }),
  ],
});
