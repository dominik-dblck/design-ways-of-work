import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { hookRepo } from './hookRepo.ts';

// the folder as the hook's own process names it: a temp folder is a link on some machines
const base = fs.realpathSync(
  fs.mkdtempSync(path.join(os.tmpdir(), 'wow-real-')),
);
const CONFIG = `export default [
  { files: ['**/*.ts'], rules: { 'no-debugger': 'error' } },
];
`;
const NO_SUCH_FLAG = 'a_flag_no_eslint_knows';
// the flag a product sets for the config it writes in TypeScript
const A_PRODUCT_FLAG = 'unstable_native_nodejs_ts_config';
const STAGED = ['commit', '--staged'];
// prettier, cspell and ESLint run for real: seconds on a busy machine, not a unit test's
const A_TOOLS_RUN = { timeout: 30_000 };

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe(
  'the commit tier hands a change to the tools as they are installed',
  A_TOOLS_RUN,
  () => {
    const repo = hookRepo({ base, name: 'tier', isReal: true });
    repo.committed('eslint.config.mjs', CONFIG);
    const staged = (file: string, text: string): void => {
      fs.writeFileSync(path.join(repo.root, file), text);
      repo.git(['add', '--', file]);
    };

    it('a file with nothing wrong is green by prettier, cspell and ESLint', () => {
      staged('right.ts', 'export const right = 1;\n');
      const said = repo.ran({ hook: 'checkTier.ts', args: STAGED });
      expect(said.stdout).toMatch(/^✓ format:check · /m);
      expect(said.stdout).toMatch(/^✓ lint:words · /m);
      expect(said.stdout).toMatch(/^✓ lint · /m);
      expect(said.status).toBe(0);
    });

    it("the hook's environment reaches ESLint: a flag it does not know stops it, by name", () => {
      const said = repo.ran({
        hook: 'checkTier.ts',
        args: STAGED,
        env: { ESLINT_FLAGS: NO_SUCH_FLAG },
      });
      expect(said.stdout).toMatch(/^✗ lint · /m);
      expect(said.stdout).toContain(`Unknown flag '${NO_SUCH_FLAG}'`);
    });

    it('a file wrong three ways is red by each tool, in its own words', () => {
      staged('wrong.ts', "debugger\nexport const wrod = 'x'\n");
      const said = repo.ran({ hook: 'checkTier.ts', args: STAGED });
      expect(said.stdout).toMatch(/^✗ format:check · /m);
      expect(said.stdout).toContain('[warn] wrong.ts');
      expect(said.stdout).toMatch(/^✗ lint:words · /m);
      expect(said.stdout).toContain('Unknown word (wrod)');
      expect(said.stdout).toMatch(/^✗ lint · /m);
      expect(said.stdout).toContain("Unexpected 'debugger' statement");
      expect(said.status).toBe(1);
    });
  },
);

describe("the edit hook's environment reaches ESLint too", A_TOOLS_RUN, () => {
  const repo = hookRepo({ base, name: 'edit' });
  const file = path.join(repo.root, 'edited.ts');
  fs.writeFileSync(path.join(repo.root, 'eslint.config.mjs'), CONFIG);
  fs.writeFileSync(file, 'debugger;\n');
  const told = (flag: string): ReturnType<typeof repo.ran> =>
    repo.ran({
      hook: 'editCheck.ts',
      input: JSON.stringify({ tool_input: { file_path: file } }),
      env: { ESLINT_FLAGS: flag },
    });

  it('a flag ESLint does not know stops the hook, by name', () => {
    const said = told(NO_SUCH_FLAG);
    expect(said.stdout).toContain(`Unknown flag '${NO_SUCH_FLAG}'`);
    expect(said.status).not.toBe(0);
  });

  it('the flag a product sets is taken, and the file is linted', () => {
    const said = told(A_PRODUCT_FLAG);
    expect(said.stdout).toContain(
      "edited.ts:1 Unexpected 'debugger' statement.",
    );
    expect(said.status).toBe(0);
  });
});
