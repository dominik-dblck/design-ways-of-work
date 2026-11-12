import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { HERE } from '../../scripts/repos.ts';
import { STACKS } from '../../shared/stack/stacks.ts';

const stacks = Object.entries(STACKS);

describe('each stack a product is built on', () => {
  it.each(stacks)(
    '%s draws its look from a home of this repository',
    (_, stack) => {
      expect(fs.existsSync(path.join(HERE, stack.designSystem))).toBe(true);
    },
  );

  it.each(stacks)(
    '%s names each part and the packages that bring it',
    (_, stack) => {
      const parts = Object.values(stack).filter(
        (part) => typeof part !== 'string',
      );
      expect(
        parts.filter(
          ({ name, packages }) => name === '' || packages.length === 0,
        ),
      ).toEqual([]);
    },
  );
});
