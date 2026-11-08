/**
 * - `node scripts/extract.ts [../eagle-design]` · copies the way of working into design/
 * - reads plan/inventory.tsv: every file of a wow category, from the product's tree
 * - every file keeps its path: a product links them back in place (rehearse.ts)
 * - once design/ is committed it is the source: a second run refuses, `--again` overrides
 */
import fs from 'node:fs';
import path from 'node:path';
import { HERE, PRODUCT_REPO, repoAt } from './repos.ts';

const SOURCE = repoAt(PRODUCT_REPO);
const OUT = path.join(HERE, 'design');
const WOW_CATEGORY = /^(wow, |mixed check)/;

function wowFiles(): ReadonlySet<string> {
  const rows = fs
    .readFileSync(path.join(HERE, 'plan', 'inventory.tsv'), 'utf8')
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map((line) => line.split('\t'));
  return new Set(
    rows
      .filter(([, category]) => WOW_CATEGORY.test(category ?? ''))
      .map(([file]) => file ?? ''),
  );
}

function main(): void {
  if (fs.existsSync(OUT) && !process.argv.includes('--again')) {
    console.error(
      'design/ exists and is the source now: edit it, or run with --again to overwrite it',
    );
    process.exit(1);
  }
  const wow = wowFiles();
  fs.rmSync(OUT, { recursive: true, force: true });
  let copied = 0;
  for (const file of wow) {
    const source = path.join(SOURCE, file);
    if (!fs.existsSync(source)) {
      console.error(`missing in the product: ${file}`);
      continue;
    }
    const target = path.join(OUT, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
    copied += 1;
  }
  console.log(`design/ · ${copied} files from ${path.relative(HERE, SOURCE)}`);
}

main();
