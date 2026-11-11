import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { laidBeside } from '../../scripts/portBeside.ts';

const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-beside-'));

afterAll(() => {
  fs.rmSync(folder, { recursive: true, force: true });
});

interface Texts {
  readonly base: string;
  readonly ours: string;
  readonly theirs: string;
}

let trials = 0;
function laidOf({ base, ours, theirs }: Texts): string | undefined {
  trials += 1;
  const at = (name: string, text: string): string => {
    const file = path.join(folder, `${String(trials)}-${name}`);
    fs.writeFileSync(file, text);
    return file;
  };
  return laidBeside({
    base: at('base', base),
    ours: at('ours', ours),
    theirs: at('theirs', theirs),
  });
}

const BASE = 'head\nfirst\nsecond\ntail\n';

describe('two changes of one text that share no line are both kept', () => {
  it('lines added right after the lines the port replaced follow them', () => {
    expect(
      laidOf({
        base: BASE,
        ours: 'head\nthe port’s\ntail\n',
        theirs: 'head\nfirst\nsecond\nthe trunk’s\ntail\n',
      }),
    ).toBe('head\nthe port’s\nthe trunk’s\ntail\n');
  });

  it('lines added right before them come first', () => {
    expect(
      laidOf({
        base: BASE,
        ours: 'head\nthe port’s\ntail\n',
        theirs: 'head\nthe trunk’s\nfirst\nsecond\ntail\n',
      }),
    ).toBe('head\nthe trunk’s\nthe port’s\ntail\n');
  });

  it('two lines changed one under the other, one by each side, are both kept', () => {
    expect(
      laidOf({
        base: BASE,
        ours: 'head\nthe port’s first\nsecond\ntail\n',
        theirs: 'head\nfirst\nthe trunk’s second\ntail\n',
      }),
    ).toBe('head\nthe port’s first\nthe trunk’s second\ntail\n');
  });

  it('one change both sides made alike is kept once, beside two that touch', () => {
    expect(
      laidOf({
        base: `top\nrow\n${BASE}`,
        ours: 'a new top\nrow\nhead\nthe port’s first\nsecond\ntail\n',
        theirs: 'a new top\nrow\nhead\nfirst\nthe trunk’s second\ntail\n',
      }),
    ).toBe(
      'a new top\nrow\nhead\nthe port’s first\nthe trunk’s second\ntail\n',
    );
  });

  it('a last line with no end keeps none', () => {
    expect(
      laidOf({
        base: 'head\nfirst\ntail',
        ours: 'the port’s head\nfirst\ntail',
        theirs: 'head\nthe trunk’s first\ntail',
      }),
    ).toBe('the port’s head\nthe trunk’s first\ntail');
  });
});

describe('two changes that meet are no one’s to settle by script', () => {
  it.each([
    [
      'one line changed by both',
      'head\nthe port’s\nsecond\ntail\n',
      'head\nthe trunk’s\nsecond\ntail\n',
    ],
    [
      'a line added inside the lines the port replaced',
      'head\nthe port’s\ntail\n',
      'head\nfirst\nthe trunk’s\nsecond\ntail\n',
    ],
    [
      'lines added by both at one place',
      'head\nthe port’s\nfirst\nsecond\ntail\n',
      'head\nthe trunk’s\nfirst\nsecond\ntail\n',
    ],
    [
      'lines replaced by both that share one',
      'head\nthe port’s\ntail\n',
      'head\nfirst\nthe trunk’s\n',
    ],
  ])('%s', (_what, ours, theirs) => {
    expect(laidOf({ base: BASE, ours, theirs })).toBeUndefined();
  });
});
