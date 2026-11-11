import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { DECISIONS } from '../../decisions/register.ts';
import { HERE } from '../../scripts/repos.ts';

const REPLACED = /replaces (W\d+)/;

describe("the register holds the PM's decisions as data", () => {
  it('each has its number, in the order they were taken', () => {
    expect(DECISIONS.map(({ id }) => id)).toEqual(
      DECISIONS.map((_, at) => `W${String(at + 1)}`),
    );
  });

  it('each names a note that is there, where his words stand', () => {
    expect(
      DECISIONS.filter(({ from }) => !fs.existsSync(path.join(HERE, from))).map(
        ({ id, from }) => `${id} · ${from}`,
      ),
    ).toEqual([]);
  });

  it('a decision that replaces another names one taken before it', () => {
    const lost = DECISIONS.flatMap(({ id, held }, at) => {
      const replaced = REPLACED.exec(held)?.[1];
      const before = DECISIONS.slice(0, at).map((one) => one.id);
      return replaced === undefined || before.includes(replaced)
        ? []
        : [`${id} replaces ${replaced}`];
    });
    expect(lost).toEqual([]);
  });

  it('none is left without what it says or the day it was held', () => {
    expect(
      DECISIONS.filter(
        ({ title, held, says }) => title === '' || held === '' || says === '',
      ),
    ).toEqual([]);
  });
});
