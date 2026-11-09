import { describe, expect, it } from 'vitest';
import {
  barrelOf,
  importsMoved,
  landingOf,
  mentioned,
} from '../../scripts/movePaths.ts';

const ROOT = 'app/components/atoms/Chip/Chip.tsx';

describe("a moved file's imports and paths follow it", () => {
  it('an import of a moved file is written from the importer to where it now stands', () => {
    const moves = new Map([['app/a/one.ts', 'app/b/one.ts']]);
    expect(
      importsMoved("import { one } from './one.ts';", {
        file: 'app/a/two.ts',
        moves,
      }),
    ).toBe("import { one } from '../b/one.ts';");
  });

  it("a moved file's own imports are written from where it now stands", () => {
    const moves = new Map([['app/a/two.ts', 'app/c/d/two.ts']]);
    expect(
      importsMoved("export * from './one.ts';", {
        file: 'app/a/two.ts',
        moves,
      }),
    ).toBe("export * from '../../a/one.ts';");
  });

  it('an import neither side of which moved stands as written', () => {
    const text = "import { one } from './one.ts';";
    expect(importsMoved(text, { file: 'app/a/two.ts', moves: new Map() })).toBe(
      text,
    );
  });

  it('a component root is imported by its barrel, but from inside its folder', () => {
    expect(landingOf(ROOT, 'app/pages/home.tsx')).toBe(
      'app/components/atoms/Chip/index.ts',
    );
    expect(landingOf(ROOT, 'app/components/atoms/Chip/ChipParts.tsx')).toBe(
      ROOT,
    );
    expect(landingOf('app/a/one.ts', 'app/pages/home.tsx')).toBe(
      'app/a/one.ts',
    );
  });

  it('an exact path follows its move, under design/ too, never a longer name holding it', () => {
    expect(
      mentioned('tools/a.ts, design/tools/a.ts, mytools/a.ts, tools/a.tsx', [
        { from: 'tools/a.ts', to: 'tools/b.ts' },
      ]),
    ).toBe('tools/b.ts, design/tools/b.ts, mytools/a.ts, tools/a.tsx');
  });

  it("a root's barrel names its component", () => {
    expect(barrelOf(ROOT)).toContain("export { Chip } from './Chip.tsx';");
  });
});
