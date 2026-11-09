import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  rolesMissingOf,
  statusFaultsOf,
  unwalkedOf,
} from '../../shared/tests/browserGates.ts';
import {
  catalogOf,
  screensOf,
  statusOf,
} from '../../shared/tests/browserScreens.ts';
import type { tierAt } from '../../shared/tests/browserScreens.ts';

// where a tier sits, as the gates read it: the type `tierAt` answers
type Tier = NonNullable<ReturnType<typeof tierAt>>;

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const AT: Tier = {
  root: ROOT,
  tier: {
    screensRoot: 'tests/browser/fixtures/e2e',
    statusRoot: 'tests/browser/fixtures/roadmaps/e2e',
    registry: '',
    templates: '',
    componentRoots: [],
    roles: [],
    exemptions: [],
  },
};
const STATUS = statusOf(AT, 'aScreen') ?? '';

// the fixture's status file with one line written otherwise
const plantedIn = (line: string, planted: string): string => {
  expect(STATUS).toContain(line);
  return STATUS.replace(line, planted);
};

describe("a browser tier's gates, on a tree of one screen", () => {
  it('reads its screens off the folders and each catalogue off its file', async () => {
    expect(screensOf(AT)).toEqual(['aScreen']);
    expect(Object.keys(await catalogOf(AT, 'aScreen'))).toEqual([
      'A_FLOW',
      'B_FLOW',
    ]);
  });

  it('green · every kind walked or waived, every line answered, every flow red once or not yet', async () => {
    const catalog = await catalogOf(AT, 'aScreen');
    expect(unwalkedOf(catalog, STATUS)).toEqual([]);
    expect(statusFaultsOf({ catalog, status: STATUS, root: ROOT })).toEqual([]);
  });

  it('red · a kind no flow walks and no line waives, and a waiver of no kind', async () => {
    const catalog = await catalogOf(AT, 'aScreen');
    const unwaived = plantedIn('- edge · no edge', '- hover · no edge');
    expect(unwalkedOf(catalog, unwaived)).toEqual([
      'edge',
      'hover · a waiver of a kind FLOW_PATHS lacks',
    ]);
  });

  it('roles · green when each is taken or waived, red on a role untaken and on a waiver of none', async () => {
    const catalog = await catalogOf(AT, 'aScreen');
    const missing = (roles: readonly string[]) =>
      rolesMissingOf({ roles, catalog, status: STATUS });
    expect(missing(['CM', 'AP'])).toEqual([]);
    expect(missing(['CM', 'AP', 'LG'])).toEqual(['LG']);
    expect(missing(['CM'])).toEqual(['AP · a waiver of a role the tier lacks']);
  });

  it.each([
    ['a line naming no test', '› exports the screen', '· nobody'],
    ['a test file not there', 'coveringFlow.ts', 'goneFlow.ts'],
    ['a title the file lacks', '› exports the screen', '› renames the screen'],
    ['a flow red and not yet both', '| A_FLOW |', '| B_FLOW |'],
    [
      'done claimed before every flow was red',
      '- **done** · not yet',
      '- **done** · 9 Nov',
    ],
  ])('red · %s', async (_, line, planted) => {
    const catalog = await catalogOf(AT, 'aScreen');
    expect(
      statusFaultsOf({ catalog, status: plantedIn(line, planted), root: ROOT }),
    ).not.toEqual([]);
  });

  it('control · the file a line names exists, so a red above is the plant', () => {
    expect(
      fs.existsSync(path.join(ROOT, 'tests/browser/fixtures/coveringFlow.ts')),
    ).toBe(true);
  });
});
