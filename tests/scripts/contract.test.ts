import { describe, expect, it } from 'vitest';
import { CONTRACT } from '../../ports/contract.ts';
import { homeReads, productReads } from '../../scripts/productReadsOf.ts';
import { HERE } from '../../scripts/repos.ts';

const reads = productReads(HERE);
const read = [...new Set(reads.map(({ file }) => file))].sort();

describe('the contract names each file of a product the homes read', () => {
  it('a file read has its row, and no row names a file nothing reads', () => {
    expect(CONTRACT.map(({ file }) => file)).toEqual(read);
  });

  it('each row says what the file is', () => {
    expect(CONTRACT.filter(({ what }) => what === '')).toEqual([]);
  });

  it('what a product plugs in is read by what it runs alone: no file of a home imports its reader', () => {
    const plugged = new Set(
      CONTRACT.filter(({ kind }) => kind === 'product').map(({ file }) => file),
    );
    const readers = reads
      .filter(({ file }) => plugged.has(file))
      .map(({ reader }) => reader);
    const imported = new Set(homeReads(HERE).map(({ file }) => file));
    expect(readers).not.toEqual([]);
    expect(readers.filter((reader) => imported.has(reader))).toEqual([]);
  });
});
