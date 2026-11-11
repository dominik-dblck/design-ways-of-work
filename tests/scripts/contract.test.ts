import { describe, expect, it } from 'vitest';
import { CONTRACT } from '../../ports/contract.ts';
import { productReads } from '../../scripts/productReadsOf.ts';
import { HERE } from '../../scripts/repos.ts';

const read = [...new Set(productReads(HERE).map(({ file }) => file))].sort();

describe('the contract names each file of a product the homes read', () => {
  it('a file read has its row, and no row names a file nothing reads', () => {
    expect(CONTRACT.map(({ file }) => file)).toEqual(read);
  });

  it('each row says what the file is', () => {
    expect(CONTRACT.filter(({ what }) => what === '')).toEqual([]);
  });
});
