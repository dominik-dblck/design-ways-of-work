/**
 * - a take writes the tag’s files at the product’s paths, git blind to them
 * - run again, it changes nothing; an edited or product file stops it whole
 * - a file the tag dropped goes, unless someone edited it since
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { planTake } from '../take/takePlan.ts';

const made: string[] = [];
afterAll(() => {
  for (const folder of made)
    fs.rmSync(folder, { recursive: true, force: true });
});

const TAKE = path.resolve(import.meta.dirname, '..', 'take');
// a hook's git hands its children its own index and folder: each product here is a repository of its own
const ENV = Object.fromEntries(
  Object.entries(process.env).filter(([name]) => !name.startsWith('GIT_')),
);

const digests = (rows: readonly (readonly [string, string])[]) => new Map(rows);
const plan = ({
  wanted = [],
  recorded = [],
  onDisk = [],
  tracked = [],
}: {
  readonly wanted?: readonly (readonly [string, string])[];
  readonly recorded?: readonly (readonly [string, string])[];
  readonly onDisk?: readonly (readonly [string, string])[];
  readonly tracked?: readonly string[];
}) =>
  planTake({
    wanted: digests(wanted),
    recorded: digests(recorded),
    onDisk: digests(onDisk),
    tracked: new Set(tracked),
  });

describe('a take plans from the tag, the record and the disk', () => {
  it('writes a file the disk lacks and keeps one already the tag’s', () => {
    expect(
      plan({
        wanted: [
          ['a.ts', 'new'],
          ['b.ts', 'same'],
        ],
        onDisk: [['b.ts', 'same']],
      }),
    ).toEqual({ writes: ['a.ts'], removes: [], refusals: [] });
  });

  it('overwrites a file the last take wrote and nobody edited', () => {
    expect(
      plan({
        wanted: [['a.ts', 'v2']],
        recorded: [['a.ts', 'v1']],
        onDisk: [['a.ts', 'v1']],
      }),
    ).toEqual({ writes: ['a.ts'], removes: [], refusals: [] });
  });

  it('refuses a file edited since the take, and one the product holds in its place', () => {
    const { writes, refusals } = plan({
      wanted: [
        ['a.ts', 'v2'],
        ['b.ts', 'tag'],
      ],
      recorded: [['a.ts', 'v1']],
      onDisk: [
        ['a.ts', 'edited'],
        ['b.ts', 'product'],
      ],
    });
    expect(writes).toEqual([]);
    expect(refusals.map(({ file }) => file)).toEqual(['a.ts', 'b.ts']);
  });

  it('refuses a file the product tracks, whatever its bytes', () => {
    expect(
      plan({
        wanted: [['a.ts', 'same']],
        onDisk: [['a.ts', 'same']],
        tracked: ['a.ts'],
      }).refusals,
    ).toHaveLength(1);
  });

  it('removes a file the tag dropped, and refuses one edited since', () => {
    const { removes, refusals } = plan({
      recorded: [
        ['a.ts', 'v1'],
        ['b.ts', 'v1'],
      ],
      onDisk: [
        ['a.ts', 'v1'],
        ['b.ts', 'edited'],
      ],
    });
    expect(removes).toEqual(['a.ts']);
    expect(refusals.map(({ file }) => file)).toEqual(['b.ts']);
  });
});

// a product with one home to take, and a tag holding one file in it
function aProduct(): { readonly root: string; readonly source: string } {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'take-product-'));
  const source = fs.mkdtempSync(path.join(os.tmpdir(), 'take-source-'));
  made.push(root, source);
  execFileSync('git', ['init', '-q'], { cwd: root, env: ENV });
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify({ name: 'product', wow: { takes: ['shared'] } }),
  );
  fs.writeFileSync(
    path.join(source, 'package.json'),
    JSON.stringify({ name: 'design-ways-of-work', version: '1.0.0' }),
  );
  fs.mkdirSync(path.join(source, 'shared', 'lint'), { recursive: true });
  fs.writeFileSync(path.join(source, 'shared', 'lint', 'rule.ts'), 'tag\n');
  return { root, source };
}

// the take as a product runs it: its folder copied out first, node strips no type under node_modules
function take({
  root,
  source,
  isCheck = false,
}: {
  readonly root: string;
  readonly source: string;
  readonly isCheck?: boolean;
}): { readonly status: number | null; readonly out: string } {
  const copy = fs.mkdtempSync(path.join(os.tmpdir(), 'take-copy-'));
  made.push(copy);
  fs.cpSync(TAKE, copy, { recursive: true });
  const ran = spawnSync(
    'node',
    [
      path.join(copy, 'takeWow.ts'),
      '--from',
      source,
      ...(isCheck ? ['--check'] : []),
    ],
    { cwd: root, encoding: 'utf8', env: ENV },
  );
  return { status: ran.status, out: ran.stdout + ran.stderr };
}

const RULE = path.join('shared', 'lint', 'rule.ts');

describe('a take run in a product', () => {
  it('writes the file, records it and hides it from git', () => {
    const product = aProduct();
    expect(take(product).status).toBe(0);
    expect(fs.readFileSync(path.join(product.root, RULE), 'utf8')).toBe(
      'tag\n',
    );
    const untracked = execFileSync('git', ['status', '--porcelain', '-uall'], {
      cwd: product.root,
      encoding: 'utf8',
      env: ENV,
    });
    expect(untracked).toBe('?? package.json\n');
    expect(take({ ...product, isCheck: true }).status).toBe(0);
  });

  it('stops on a home the way of working does not have, writing nothing', () => {
    const product = aProduct();
    fs.writeFileSync(
      path.join(product.root, 'package.json'),
      JSON.stringify({ name: 'product', wow: { takes: ['nowhere'] } }),
    );
    const ran = take(product);
    expect(ran.status).not.toBe(0);
    expect(ran.out).toContain('nowhere is no home of the way of working');
    expect(fs.existsSync(path.join(product.root, 'shared'))).toBe(false);
  });

  it('keeps one record and one exclude block per worktree', () => {
    const product = aProduct();
    execFileSync(
      'git',
      [
        '-c',
        'user.name=take',
        '-c',
        'user.email=take@local',
        'commit',
        '-q',
        '--allow-empty',
        '-m',
        'start',
      ],
      { cwd: product.root, env: ENV },
    );
    const trees = fs.mkdtempSync(path.join(os.tmpdir(), 'take-trees-'));
    made.push(trees);
    const other = path.join(trees, 'other');
    execFileSync('git', ['worktree', 'add', '-q', other], {
      cwd: product.root,
      env: ENV,
    });
    fs.copyFileSync(
      path.join(product.root, 'package.json'),
      path.join(other, 'package.json'),
    );
    expect(take(product).status).toBe(0);
    expect(take({ ...product, root: other }).status).toBe(0);
    const git = path.join(product.root, '.git');
    const exclude = fs.readFileSync(path.join(git, 'info', 'exclude'), 'utf8');
    expect(exclude.match(/ · end$/gm)).toHaveLength(2);
    expect(fs.existsSync(path.join(git, 'wow-taken'))).toBe(true);
    expect(
      fs.existsSync(path.join(git, 'worktrees', 'other', 'wow-taken')),
    ).toBe(true);
    expect(take(product).out).toContain('0 written, 0 removed');
  });

  it('changes nothing when run again', () => {
    const product = aProduct();
    take(product);
    expect(take(product).out).toContain('0 written, 0 removed');
  });

  it('stops whole on an edited file and leaves it as edited', () => {
    const product = aProduct();
    take(product);
    fs.writeFileSync(path.join(product.root, RULE), 'edited\n');
    const ran = take(product);
    expect(ran.status).toBe(1);
    expect(ran.out).toContain(`REFUSED · ${RULE}`);
    expect(fs.readFileSync(path.join(product.root, RULE), 'utf8')).toBe(
      'edited\n',
    );
    expect(take({ ...product, isCheck: true }).status).toBe(1);
  });
});
