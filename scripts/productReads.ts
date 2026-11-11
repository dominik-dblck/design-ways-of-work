/**
 * - `node scripts/productReads.ts [--rows]` · what the homes read from a product
 * - by product file: how many files read it, the values and the types they read
 * - `--rows` · each read on its own line, by reader
 */
import { productReads } from './productReadsOf.ts';
import type { Read } from './productReadsOf.ts';
import { HERE } from './repos.ts';

const reads = productReads(HERE);
const files = [...new Set(reads.map(({ file }) => file))].sort();
const readers = new Set(reads.map(({ reader }) => reader));

const lineOf = ({ reader, file, values, types }: Read): string =>
  [reader, file, values.join(' '), types.join(' ')].join('\t');

function summaryOf(file: string): string {
  const its = reads.filter((one) => one.file === file);
  const union = (names: readonly (readonly string[])[]): string =>
    [...new Set(names.flat())].sort().join(' ');
  return [
    file,
    String(new Set(its.map(({ reader }) => reader)).size),
    union(its.map(({ values }) => values)),
    union(its.map(({ types }) => types)),
  ].join('\t');
}

console.log(
  (process.argv.includes('--rows')
    ? reads.map(lineOf)
    : files.map(summaryOf)
  ).join('\n'),
);
console.log(
  `${String(reads.length)} reads of ${String(files.length)} product files, from ${String(readers.size)} files of the homes`,
);
