/**
 * - `node scripts/rehearse.ts [product] [copy]` · a port rehearsal on a copy, never the product
 * - copies the product's tracked files but the wow set; links design/ in place, dev/ and shared/ by name
 * - then applies ports/<product>/port.patch: what the port changes in the product itself
 * - its node runs keep the link's path (NODE_OPTIONS), so `..` still reaches the product
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { HERE, PRODUCT_REPO, repoAt } from './repos.ts';

const SOURCE = repoAt(PRODUCT_REPO);
const COPY = repoAt(path.join(HERE, '.rehearsal', path.basename(SOURCE)), 1);
const DESIGN = path.join(HERE, 'design');
const DEV = path.join(HERE, 'dev');
const SHARED = path.join(HERE, 'shared');
const PATCH = path.join(HERE, 'ports', path.basename(SOURCE), 'port.patch');
const WOW_CATEGORY = /^(wow, |mixed check)/;
const KEEP_LINKS =
  "NODE_OPTIONS='--preserve-symlinks --preserve-symlinks-main'";

const inventory = fs
  .readFileSync(path.join(HERE, 'plan', 'inventory.tsv'), 'utf8')
  .split('\n')
  .slice(1)
  .filter(Boolean)
  .map((line) => line.split('\t'));
const WOW = new Set(
  inventory
    .filter(([, category]) => WOW_CATEGORY.test(category ?? ''))
    .map(([file]) => file ?? ''),
);

function filesUnder(folder: string): readonly string[] {
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== '.DS_Store')
    .map((entry) =>
      path.relative(folder, path.join(entry.parentPath, entry.name)),
    );
}

function commit(message: string): void {
  execFileSync('git', ['add', '-A'], { cwd: COPY });
  execFileSync(
    'git',
    [
      '-c',
      'user.name=rehearsal',
      '-c',
      'user.email=rehearsal@local',
      'commit',
      '-qm',
      message,
      '--no-verify',
    ],
    { cwd: COPY },
  );
}

function edit(file: string, change: (text: string) => string): void {
  const at = path.join(COPY, file);
  fs.writeFileSync(at, change(fs.readFileSync(at, 'utf8')));
}

function configs(): void {
  edit('package.json', (text) => {
    const json: Record<string, unknown> = Object(JSON.parse(text));
    const scripts: Record<string, unknown> = Object(json.scripts);
    for (const [name, script] of Object.entries(scripts))
      scripts[name] = String(script).replaceAll(
        'node tools/',
        `${KEEP_LINKS} node tools/`,
      );
    return `${JSON.stringify(json, null, 2)}\n`;
  });
  edit('tsconfig.json', (text) => {
    const json: Record<string, unknown> = Object(JSON.parse(text));
    Reflect.set(Object(json.compilerOptions), 'preserveSymlinks', true);
    return `${JSON.stringify(json, null, 2)}\n`;
  });
  edit('vitest.config.mts', (text) =>
    text.replace(
      'export default defineConfig({\n',
      'export default defineConfig({\n  resolve: { preserveSymlinks: true },\n',
    ),
  );
}

function main(): void {
  fs.rmSync(COPY, { recursive: true, force: true });
  const tracked = execFileSync('git', ['ls-files'], {
    cwd: SOURCE,
    encoding: 'utf8',
  })
    .split('\n')
    .filter(Boolean);
  let copied = 0;
  let linked = 0;
  for (const file of tracked.filter((one) => !WOW.has(one))) {
    const target = path.join(COPY, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(SOURCE, file), target);
    copied += 1;
  }
  for (const [from, at] of [
    [DESIGN, ''],
    [DEV, 'dev'],
    [SHARED, 'shared'],
  ] as const)
    for (const file of filesUnder(from)) {
      const target = path.join(COPY, at, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.symlinkSync(path.join(from, file), target);
      linked += 1;
    }
  fs.symlinkSync(
    path.join(HERE, 'node_modules'),
    path.join(COPY, 'node_modules'),
  );
  configs();
  execFileSync('git', ['init', '-q'], { cwd: COPY });
  commit('the product, design/ linked');
  execFileSync('git', ['tag', 'product'], { cwd: COPY });
  const patched = fs.existsSync(PATCH);
  if (patched) {
    execFileSync('git', ['apply', '--whitespace=nowarn', PATCH], {
      cwd: COPY,
      stdio: 'inherit',
    });
    commit('the port');
  }
  console.log(
    `${path.relative(HERE, COPY) || COPY} · ${copied} product files copied, ${linked} files of design/, dev/ and shared/ linked, ${patched ? 'the port applied' : 'no port'}`,
  );
}

main();
