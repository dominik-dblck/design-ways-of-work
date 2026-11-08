/**
 * - `node scripts/take-dev-claude.ts [build repo]` · its own skills, evaluations, patterns and commands
 * - copied byte for byte into dev/claude/ at their paths; the ticket skills are not: ticket-pipeline.md writes them
 * - prints each file's sha256, and the files that still name the build repository's product
 */
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.resolve(import.meta.dirname, '..');
const SOURCE = path.resolve(
  process.argv[2] ?? path.join(HERE, '..', 'mailing-automation'),
);
const TO = path.join(HERE, 'dev', 'claude');
const TAKEN = /^\.claude\/(skills|evaluations|patterns|commands)\//;
const WRITTEN_FROM_THE_PIPELINE = /^\.claude\/skills\/ticket(-[a-z-]+)?\//;
const A_PRODUCT_WORD = /\beagle\b|\bT-E\d{2}/i;

const files = execFileSync('git', ['ls-files', '.claude'], {
  cwd: SOURCE,
  encoding: 'utf8',
})
  .split('\n')
  .filter((file) => TAKEN.test(file) && !WRITTEN_FROM_THE_PIPELINE.test(file));
fs.rmSync(TO, { recursive: true, force: true });
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
