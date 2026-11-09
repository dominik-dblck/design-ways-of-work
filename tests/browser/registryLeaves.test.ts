import { describe, expect, it } from 'vitest';
import {
  helpersIn,
  leavesOf,
  spelledIn,
  unreadOf,
} from '../../shared/tests/registryLeaves.ts';

const ROOTS = new Set(['rowTestIds']);
const REGISTRY = {
  file: 'e2e/testingIds/rowTestIds.ts',
  text: "export const rowTestIds = { cell: { name: 'testid-name', size: 'testid-size' }, title: 'testid-title' };\nexport const sizeOf = (id: string) => `${rowTestIds.cell.size}-${id}`;",
};
const SPELLING = { roots: ROOTS, helpers: helpersIn([REGISTRY], ROOTS) };
const LEAVES = leavesOf('rowTestIds', {
  cell: { name: 'testid-name', size: 'testid-size' },
  title: 'testid-title',
});
const spelled = (text: string) =>
  spelledIn({ file: 'app/Row.tsx', text }, SPELLING);

describe('registry ids, on sources never put on disk', () => {
  it('a registry export as its ids, each a path', () => {
    expect(LEAVES).toEqual([
      'rowTestIds.cell.name',
      'rowTestIds.cell.size',
      'rowTestIds.title',
    ]);
  });

  it('red · a leaf spelled covers itself, never its siblings', () => {
    expect(unreadOf(LEAVES, spelled('use(rowTestIds.cell.name);'))).toEqual([
      'rowTestIds.cell.size',
      'rowTestIds.title',
    ]);
  });

  it('green · a group used whole covers its leaves; an alias and a helper reach theirs', () => {
    expect(
      unreadOf(
        LEAVES,
        new Set([
          ...spelled('use(rowTestIds.cell);'),
          ...spelled('const ids = rowTestIds;\nuse(ids.title);'),
        ]),
      ),
    ).toEqual([]);
    expect(
      unreadOf(
        LEAVES,
        spelled('const cell = rowTestIds.cell;\nuse(cell.name, sizeOf(id));'),
      ),
    ).toEqual(['rowTestIds.title']);
  });

  it('red · an alias named alone uses nothing: its group is not passed', () => {
    expect(unreadOf(LEAVES, spelled('const cell = rowTestIds.cell;'))).toEqual(
      LEAVES,
    );
  });
});
