/**
 * - `node scripts/takeDevClaude.ts [build repo]` · its skills, patterns, commands
 * - copied byte for byte into dev/claude/, the ticket skills and the retired aside
 * - prints each file's sha256, and the files that name its product
 */
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { BUILD_REPO, HERE, repoAt } from './repos.ts';
import { isRetired } from './retired.ts';
import { emptied } from '../shared/emptied.ts';

const SOURCE = repoAt(BUILD_REPO);
const TO = path.join(HERE, 'dev', 'claude');
const TAKEN = /^\.claude\/(skills|evaluations|patterns|commands)\//;
const WRITTEN_FROM_THE_PIPELINE = /^\.claude\/skills\/ticket(-[a-z-]+)?\//;
const A_PRODUCT_WORD = /\beagle\b|\bT-E\d{2}/i;

const files = execFileSync('git', ['ls-files', '.claude'], {
  cwd: SOURCE,
  encoding: 'utf8',
})
  .split('\n')
  .filter(
    (file) =>
      TAKEN.test(file) &&
      !WRITTEN_FROM_THE_PIPELINE.test(file) &&
      !isRetired(file),
  );
emptied({ within: HERE, folder: TO });
const naming: string[] = [];
for (const file of files) {
  const bytes = fs.readFileSync(path.join(SOURCE, file));
  const target = path.join(TO, file.replace(/^\.claude\//, ''));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, bytes);
  if (A_PRODUCT_WORD.test(bytes.toString('utf8'))) naming.push(file);
  console.log(
    `${crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12)}  ${file}`,
  );
}
console.log(
  `dev/claude · ${files.length} files taken; ${naming.length} still name the product: ${naming.join(', ')}`,
);
