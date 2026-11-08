/**
 * - vitest for the way of working: its rule tests, and the shared tests on its own scope
 * - the rehearsal's linked copies are the product's run, never this one's
 */
import { defineConfig } from 'vitest/config';
import { SHARED_TESTS } from './shared/repoScope.ts';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts', `${SHARED_TESTS}/**/*.test.ts`],
    exclude: ['.rehearsal/**', 'node_modules/**'],
  },
});
