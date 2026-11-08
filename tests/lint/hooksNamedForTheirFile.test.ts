import { hooksNamedForTheirFile } from '../../shared/lint/rules/hooksNamedForTheirFile.ts';
import { ruleTester } from './ruleTester.ts';

ruleTester.run('hooks-named-for-their-file', hooksNamedForTheirFile, {
  valid: [
    {
      name: 'a query hook named for its file',
      filename: 'app/clients/usePlantedQuery.ts',
      code: 'export function usePlantedQuery() { return useQuery({}); }',
    },
    {
      name: "a provider's context hooks",
      filename: 'app/PlantedProvider.tsx',
      code: 'export function usePlantedContext() {}\nexport function PlantedProvider() {}',
    },
    {
      name: "a barrel passing a provider's hook on",
      filename: 'app/providers/AuthProvider/index.ts',
      code: "export { AuthProvider, useAuth } from './AuthProvider';",
    },
  ],
  invalid: [
    {
      name: 'a second hook',
      filename: 'app/clients/usePlanted.ts',
      code: 'export function usePlanted() {}\nexport function useOther() {}',
      errors: [{ messageId: 'stray', data: { hook: 'useOther' } }],
    },
    {
      name: 'a query and a mutation under other names',
      filename: 'app/clients/usePlantedQueries.tsx',
      code: 'export function usePlantedQueries() { useMutation({}); return useQueries({ queries: [] }); }',
      errors: [{ messageId: 'query' }, { messageId: 'mutation' }],
    },
    {
      name: 'a use file with no hook',
      filename: 'app/clients/usePlanted.ts',
      code: 'export const PLANTED = 1;',
      errors: [{ messageId: 'empty' }],
    },
  ],
});
