// vitest.config.mts · one project: the design project's own tests, and the way of working's shared ones
import { defineConfig } from 'vitest/config';
import { SHARED_TESTS } from './shared/repoScope.ts';

export default defineConfig({
  test: {
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}', `${SHARED_TESTS}/**/*.test.ts`],
    passWithNoTests: true,
    // a scan reads the whole tree, which takes seconds on a loaded machine
    testTimeout: 30_000,
  },
});
