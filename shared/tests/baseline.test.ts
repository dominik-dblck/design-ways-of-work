/**
 * - `docs/rules/tests.md`: a scan's list starts once, only shrinks, and goes when it empties
 * - each step on a fresh folder, never the tree's lists
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { driftFrom, heldIn } from './baseline.ts';

const made: string[] = [];
afterAll(() => {
  for (const folder of made)
    fs.rmSync(folder, { recursive: true, force: true });
});

const aFolder = (): string => {
  const folder = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), 'wow-baselines-')),
    'baselines',
  );
  made.push(path.dirname(folder));
  return folder;
};
const LIST = (folder: string): string => path.join(folder, 'aScan.json');
const held = ({
  folder,
  offenders,
  asked,
}: {
  readonly folder: string;
  readonly offenders: readonly string[];
  readonly asked?: string;
}) => heldIn({ folder, scan: 'aScan', offenders, asked });

describe('a baseline starts once, only shrinks, and goes when it empties', () => {
  it('a new offender and a fixed one still listed are both drift; the same list is none', () => {
    expect(driftFrom(['a', 'b'], ['b', 'c'])).toEqual({
      added: ['c'],
      fixed: ['a'],
    });
    expect(driftFrom(['a'], ['a'])).toEqual({ added: [], fixed: [] });
  });

  it('a list starts by its own act, its folder made, and never twice', () => {
    const folder = aFolder();
    expect(
      held({ folder, offenders: ['b', 'a'], asked: 'start:aScan' }),
    ).toEqual({
      added: [],
      fixed: [],
    });
    expect(JSON.parse(fs.readFileSync(LIST(folder), 'utf8'))).toEqual([
      'a',
      'b',
    ]);
    expect(() =>
      held({ folder, offenders: ['a'], asked: 'start:aScan' }),
    ).toThrow('starts once');
    expect(() =>
      held({ folder: aFolder(), offenders: [], asked: 'start:aScan' }),
    ).toThrow('no offender');
  });

  it('a write never starts a list: a scan with none holds every offender red', () => {
    const folder = aFolder();
    expect(held({ folder, offenders: ['a'], asked: 'write' })).toEqual({
      added: ['a'],
      fixed: [],
    });
    expect(fs.existsSync(LIST(folder))).toBe(false);
  });

  it('a write shrinks a list, refuses to grow it, and removes it emptied; refilled, it stays red', () => {
    const folder = aFolder();
    held({ folder, offenders: ['a', 'b'], asked: 'start:aScan' });
    held({ folder, offenders: ['a'], asked: 'write' });
    expect(JSON.parse(fs.readFileSync(LIST(folder), 'utf8'))).toEqual(['a']);
    expect(() =>
      held({ folder, offenders: ['a', 'c'], asked: 'write' }),
    ).toThrow('never grows');
    held({ folder, offenders: [], asked: 'write' });
    expect(fs.existsSync(LIST(folder))).toBe(false);
    expect(held({ folder, offenders: ['b'], asked: 'write' })).toEqual({
      added: ['b'],
      fixed: [],
    });
    expect(fs.existsSync(LIST(folder))).toBe(false);
  });

  it('a list that holds anything but strings is refused, never coerced', () => {
    const folder = aFolder();
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(LIST(folder), '["a", 1]\n');
    expect(() => held({ folder, offenders: ['a'] })).toThrow('not 1');
    fs.writeFileSync(LIST(folder), '{"a": 1}\n');
    expect(() => held({ folder, offenders: ['a'] })).toThrow(
      'a list of strings',
    );
    fs.writeFileSync(LIST(folder), '["a",');
    expect(() => held({ folder, offenders: ['a'] })).toThrow(
      'aScan: its baseline is no JSON',
    );
  });
});
