import { noMockOfItsSubject } from '../../shared/lint/rules/noMockOfItsSubject.ts';
import { ruleTester } from './ruleTester.ts';

ruleTester.run('no-mock-of-its-subject', noMockOfItsSubject, {
  valid: [
    {
      name: 'a mock of what the subject calls',
      filename: 'app/utils/__tests__/plantedUtils.test.ts',
      code: "vi.mock('@/app/services/requestService');",
    },
    {
      name: 'a file that is no test',
      filename: 'app/utils/plantedUtils.ts',
      code: "vi.mock('./plantedUtils');",
    },
  ],
  invalid: [
    {
      name: 'a mock of the file the test is named for',
      filename: 'app/utils/__tests__/plantedUtils.test.ts',
      code: "vi.mock('../plantedUtils');\nvi.mock('@/app/services/requestService');",
      errors: [{ messageId: 'subject', line: 1 }],
    },
    {
      name: 'a mock of its folder, a test named with a case',
      filename: 'app/organisms/Planted/__tests__/Planted.switchOff.test.tsx',
      code: "vi.doMock('@/app/organisms/Planted');\nvi.mock('../Planted/index.ts');",
      errors: [{ messageId: 'subject' }, { messageId: 'subject' }],
    },
  ],
});
