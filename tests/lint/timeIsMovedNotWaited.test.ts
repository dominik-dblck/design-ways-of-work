import { timeIsMovedNotWaited } from '../../shared/lint/rules/timeIsMovedNotWaited.ts';
import { ruleTester } from './ruleTester.ts';

const AT = 'app/__tests__/planted.test.ts';
const STORE = 'tests/store/store.test.ts';
const NAMED = [
  { file: STORE, name: 'holding', why: 'a race a real store runs' },
];
const HOLDING =
  'const holding = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));';

ruleTester.run('time-is-moved-not-waited', timeIsMovedNotWaited, {
  valid: [
    {
      name: 'time moved, and a deadline that rejects',
      filename: AT,
      code: "vi.useFakeTimers();\nawait vi.advanceTimersByTimeAsync(10);\nconst late = new Promise((_, reject) => setTimeout(() => reject(new Error('late')), 10));",
    },
    {
      name: 'a wait the scope names, kept in its file',
      filename: STORE,
      code: `${HOLDING}\nawait holding(5);`,
      options: [{ named: NAMED }],
    },
  ],
  invalid: [
    {
      name: 'a sleep, handed its settle or calling it',
      filename: AT,
      code: 'await new Promise((resolve) => setTimeout(resolve, 10));\nawait new Promise((done) => { setTimeout(() => done(), 10); });\nawait new Promise((done) => setTimeout(() => done(1), 9));',
      errors: [
        { messageId: 'waited', line: 1 },
        { messageId: 'waited', line: 2 },
        { messageId: 'waited', line: 3 },
      ],
    },
    {
      name: 'a page waited out, and timers as promises',
      filename: AT,
      code: "import { setTimeout as sleep } from 'node:timers/promises';\nawait page.waitForTimeout(100);",
      errors: [{ messageId: 'timers' }, { messageId: 'waited' }],
    },
    {
      name: 'a named wait handed out, by its declaration or a list',
      filename: STORE,
      code: `export ${HOLDING}\nconst aWhile = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 9));\nexport { aWhile };`,
      options: [
        { named: [...NAMED, { file: STORE, name: 'aWhile', why: 'a race' }] },
      ],
      errors: [
        { messageId: 'waited', line: 1 },
        { messageId: 'waited', line: 2 },
      ],
    },
    {
      name: 'a named wait in another file, or another name in its file',
      filename: AT,
      code: HOLDING,
      options: [{ named: NAMED }],
      errors: [{ messageId: 'waited' }],
    },
  ],
});
