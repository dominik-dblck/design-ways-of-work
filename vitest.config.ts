/**
 * - vitest for the way of working: its rule tests, and the shared tests on its own scope
 * - a repository's clone in the gate's scratch is its own run, never this one's
 */
import { defineConfig } from 'vitest/config';
import { SHARED_TESTS } from './shared/repoScope.ts';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts', `${SHARED_TESTS}/**/*.test.ts`],
    exclude: ['.consumers/**', '.rehearsal/**', 'node_modules/**'],
  },
});
