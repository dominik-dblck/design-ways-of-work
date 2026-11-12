import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { contractOf, portsOf, scratchWow } from './scratchWow.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-tried-'));
// two clones installed from nothing, and their scripts run: seconds, not a unit test's
const A_TRIAL = 120_000;
const TAKEN = 'shared/take/takeWow.ts';

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('the gate tries the commit in hand on a repository that takes it', () => {
  const scratch = scratchWow({ base, name: 'gate' });
  const { wow, product } = scratch;
  const attributes = fs.readFileSync(
    path.join(wow.root, '.gitattributes'),
    'utf8',
  );
  // the product's lockfile pins the package as its install resolves it
  execFileSync('yarn', ['install'], {
    cwd: product.root,
    env: scratch.env,
    stdio: 'pipe',
  });
  product.git(['add', '--', 'yarn.lock']);
  product.git(['commit', '-q', '-m', 'the lockfile']);
  const tried = (
    args: readonly string[] = [],
  ): ReturnType<typeof scratch.ran> =>
    scratch.ran({ script: 'consumers.ts', args, isReal: true });

  it(
    'a commit that moves no home reads no difference',
    () => {
      const said = tried();
      expect(said.stdout).toContain('ran · yarn says · exit 0');
      expect(said.stdout).toContain(
        'NO DIFFERENCE · product on the commit in hand, against its pinned tag',
      );
      expect(said.status).toBe(0);
    },
    A_TRIAL,
  );

  it(
    'a difference no row expects is red; so is a rule off in a taken file, a package past its homes, a registry named in another case',
    () => {
      wow.committed('design/says.txt', 'next\n');
      wow.committed('.gitattributes', `${attributes}/scripts -export-ignore\n`);
      product.committed('eslint-suppressions.json', `{ "${TAKEN}": {} }\n`);
      // a disk that folds case still answers for `registry.txt`: git's own names do not
      product.git(['mv', 'registry.txt', 'Registry.txt']);
      product.git(['commit', '-q', '-m', 'a registry takes a capital']);
      const said = tried();
      expect(said.stdout).toContain('DIFF · output · yarn says');
      expect(said.stdout).toContain(
        `BROKEN · eslint-suppressions.json · ${TAKEN} is a taken file`,
      );
      expect(said.stdout).toContain(
        'BROKEN · the package holds scripts: the homes and the manifest alone',
      );
      expect(said.stdout).toContain(
        'BROKEN · the contract · registry.txt is not there: every product holds it',
      );
      expect(said.stdout).toContain(
        'product · 1 unexplained, 0 stale, 3 broken',
      );
      expect(said.status).toBe(1);
    },
    A_TRIAL,
  );

  it(
    'the same difference, a row of the release in hand, is green',
    () => {
      wow.committed('.gitattributes', attributes);
      product.git(['rm', '-q', 'eslint-suppressions.json']);
      product.git(['mv', 'Registry.txt', 'registry.txt']);
      product.git(['commit', '-q', '-m', 'no rule is off']);
      scratch.inHand({
        what: 'the word a product says moves',
        outputs: { product: { 'output · yarn says': 'the word moved' } },
      });
      const said = tried(['product']);
      expect(said.stdout).toContain(
        'EXPECTED · output · yarn says · the word moved',
      );
      expect(said.stdout).toContain(
        '1 differences, each expected · product on the commit in hand',
      );
      expect(said.status).toBe(0);
    },
    A_TRIAL,
  );

  it(
    'once that release is put out, its row still explains the difference to a repository on an older tag',
    () => {
      const out = {
        version: '9.9.9',
        outputs: { product: { 'output · yarn says': 'the word moved' } },
      };
      wow.committed(
        'releases/changelog.ts',
        `const NEXT = { what: '', outputs: {} };\n\nconst RELEASES = [${JSON.stringify(out)}];\n\nexport { NEXT, RELEASES };\n`,
      );
      const said = tried(['product']);
      expect(said.stdout).toContain(
        'EXPECTED · output · yarn says · v9.9.9 · the word moved',
      );
      expect(said.stdout).toContain(
        '1 differences, each expected · product on the commit in hand',
      );
      expect(said.status).toBe(0);
    },
    A_TRIAL,
  );

  it(
    'a release that asks a repository for more is red, then tried after the migration that gives it',
    () => {
      wow.committed(
        'ports/contract.ts',
        contractOf(['held/registry.txt', 'asked.txt']),
      );
      const asked = tried(['product']);
      expect(asked.stdout).toContain(
        'BROKEN · the contract · held/registry.txt is not there: every product holds it',
      );
      expect(asked.stdout).toContain(
        'BROKEN · the contract · asked.txt is not there: every product holds it',
      );
      expect(asked.status).toBe(1);
      wow.committed('ports/product/tree/asked.txt', 'no row yet\n');
      wow.committed(
        'ports/consumers.ts',
        portsOf({
          release: '0.1.11',
          removes: ['package-lock.json'],
          moves: [['registry.txt', 'held/registry.txt']],
          tree: 'ports/product/tree',
        }),
      );
      const given = tried(['product']);
      expect(given.stdout).toContain(
        'migrated · 1 removed, 1 moved, 0 following, 0 edited, 1 written',
      );
      expect(given.stdout).toContain(
        '1 differences, each expected · product on the commit in hand',
      );
      expect(given.status).toBe(0);
    },
    2 * A_TRIAL,
  );

  it('a repository runs that migration on its own checkout by one command, on the branch that takes it alone', () => {
    const run = (root: string): ReturnType<typeof scratch.ran> =>
      scratch.ran({ script: 'migrate.ts', args: ['product', root] });
    const own = run(product.root);
    expect(own.stdout).toContain(
      'migrated · 1 removed, 1 moved, 0 following, 0 edited, 1 written',
    );
    expect(own.status).toBe(0);
    const held = (file: string): boolean =>
      fs.existsSync(path.join(product.root, file));
    expect(
      ['held/registry.txt', 'asked.txt', 'registry.txt'].map(held),
    ).toEqual([true, true, false]);
    product.git(['checkout', '-q', '-b', 'aside']);
    const aside = run(product.root);
    expect(aside.stdout).toContain('does not stand on main');
    expect(aside.status).toBe(2);
  });

  it('a repository ports/ does not name is refused', () => {
    const said = tried(['another']);
    expect(said.status).toBe(2);
    expect(said.stdout).toContain(
      'ports/consumers.ts names no repository another',
    );
  });
});
