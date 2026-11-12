/**
 * - `STACKS` · each stack a product is built on, by the key its project names
 */
import type { Stack, StackKey } from './stackTypes.ts';

const STACKS: Readonly<Record<StackKey, Stack>> = {
  web: {
    framework: { name: 'Next', packages: ['next'] },
    view: { name: 'React', packages: ['react', 'react-dom'] },
    components: { name: 'MUI', packages: ['@mui/material'] },
    queries: { name: 'TanStack Query', packages: ['@tanstack/react-query'] },
    schemas: { name: 'Zod', packages: ['zod'] },
    unitTests: { name: 'Vitest', packages: ['vitest'] },
    browserTests: { name: 'Playwright', packages: ['@playwright/test'] },
    mutationTests: { name: 'Stryker', packages: ['@stryker-mutator/core'] },
    database: { name: 'Postgres', packages: ['pg'] },
    icons: { name: 'Lucide', packages: ['lucide-react', 'lucide-static'] },
    charts: { name: 'Recharts', packages: ['recharts'] },
    designSystem: 'design-system/',
  },
};

export { STACKS };
