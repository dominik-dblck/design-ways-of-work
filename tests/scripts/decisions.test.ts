import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { DECISIONS } from '../../decisions/register.ts';
import { HERE } from '../../scripts/repos.ts';

const REPLACED = /replaces (W\d+)/;

describe("the register holds the PM's decisions as data", () => {
  it('each has its number, in the order it was written down', () => {
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

  it('a decision that replaces another names one of the register, never itself', () => {
    const ids = new Set(DECISIONS.map(({ id }) => id));
    const lost = DECISIONS.flatMap(({ id, held }) => {
      const replaced = REPLACED.exec(held)?.[1];
      return replaced === undefined || (replaced !== id && ids.has(replaced))
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
