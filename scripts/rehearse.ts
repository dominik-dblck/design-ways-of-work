/**
 * - `node scripts/rehearse.ts [product] [copy]` · a port rehearsal on a copy, never the product
 * - copies the product's tracked files but the wow set; links each wow file back in place
 * - its node runs keep the link's path (NODE_OPTIONS), so `..` still reaches the product
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.resolve(import.meta.dirname, '..');
const SOURCE = path.resolve(process.argv[2] ?? path.join(HERE, '..', 'eagle-design'));
const COPY = path.resolve(process.argv[3] ?? path.join(HERE, '.rehearsal', path.basename(SOURCE)));
const WOW_CATEGORY = /^(wow, |mixed check)/;
const KEEP_LINKS = "NODE_OPTIONS='--preserve-symlinks --preserve-symlinks-main'";

const inventory = fs
  .readFileSync(path.join(HERE, 'plan', 'inventory.tsv'), 'utf8')
  .split('\n')
  .slice(1)
  .filter(Boolean)
  .map((line) => line.split('\t'));
const WOW = new Set(inventory.filter(([, category]) => WOW_CATEGORY.test(category ?? '')).map(([file]) => file ?? ''));

function edit(file: string, change: (text: string) => string): void {
  const at = path.join(COPY, file);
  fs.writeFileSync(at, change(fs.readFileSync(at, 'utf8')));
}

function configs(): void {
  edit('package.json', (text) => {
    const json = JSON.parse(text) as { scripts: Record<string, string> };
    for (const [name, script] of Object.entries(json.scripts))
      json.scripts[name] = script.replaceAll('node tools/', `${KEEP_LINKS} node tools/`);
    return `${JSON.stringify(json, null, 2)}\n`;
  });
  edit('tsconfig.json', (text) => {
    const json = JSON.parse(text) as { compilerOptions: Record<string, unknown> };
    json.compilerOptions.preserveSymlinks = true;
    return `${JSON.stringify(json, null, 2)}\n`;
  });
  edit('vitest.config.mts', (text) =>
    text.replace('export default defineConfig({\n', 'export default defineConfig({\n  resolve: { preserveSymlinks: true },\n'),
  );
}

function main(): void {
  fs.rmSync(COPY, { recursive: true, force: true });
  const tracked = execFileSync('git', ['ls-files'], { cwd: SOURCE, encoding: 'utf8' }).split('\n').filter(Boolean);
  let copied = 0;
  let linked = 0;
  for (const file of tracked) {
    const target = path.join(COPY, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    if (WOW.has(file)) {
      fs.symlinkSync(path.join(HERE, 'design', file), target);
      linked += 1;
    } else {
      fs.copyFileSync(path.join(SOURCE, file), target);
      copied += 1;
    }
  }
  fs.symlinkSync(path.join(SOURCE, 'node_modules'), path.join(COPY, 'node_modules'));
  configs();
  execFileSync('git', ['init', '-q'], { cwd: COPY });
  execFileSync('git', ['add', '-A'], { cwd: COPY });
  execFileSync('git', ['-c', 'user.name=rehearsal', '-c', 'user.email=rehearsal@local', 'commit', '-qm', 'rehearsal', '--no-verify'], { cwd: COPY });
  console.log(`${path.relative(HERE, COPY) || COPY} · ${copied} product files copied, ${linked} wow files linked in place`);
}

main();
