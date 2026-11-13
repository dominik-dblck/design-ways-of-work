import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { HERE } from '../../scripts/repos.ts';
import {
  namesRefused,
  packageSource,
  spawnedTexts,
  TAKE_SCRIPTS,
} from '../../scripts/spawnTexts.ts';

const SAMPLE = path.join(HERE, 'examples', 'sample-product');
const NAMES = {
  repository: 'kestrel-design',
  product: 'Kestrel',
  company: 'Ledger Co',
};
const PIN = 'git+ssh://git@host/owner/wow.git#v9.9.9';
const read = (file: string): string =>
  fs.readFileSync(path.join(SAMPLE, file), 'utf8');
const texts = spawnedTexts({ read, names: NAMES, pin: PIN });

describe('a spawn rewrites the sample as it stands', () => {
  it.each([...texts.keys()].filter((file) => file !== 'package.json'))(
    '%s keeps none of the sample’s names',
    (file) => {
      expect(texts.get(file)).not.toMatch(/acme|the sample|a sample/i);
    },
  );

  it('the project sheet takes the product, its sessions and its company', () => {
    const sheet = String(texts.get('sheet/project.ts'));
    expect(sheet).toContain("const product = 'Kestrel';");
    expect(sheet).toContain("const company = 'Ledger Co';");
    expect(sheet).toContain("const designSession = 'kestrel-design';");
  });

  it('its manifest is named, pinned and takes the way of working', () => {
    const manifest = Object(JSON.parse(String(texts.get('package.json'))));
    expect(manifest.name).toBe('kestrel-design');
    expect(manifest.scripts).toMatchObject(TAKE_SCRIPTS);
    expect(manifest.devDependencies['design-ways-of-work']).toBe(PIN);
    const names = Object.keys(manifest.devDependencies);
    expect(names).toStrictEqual(
      [...names].sort((one, other) => one.localeCompare(other)),
    );
  });

  it('a sample that lost a text it rewrites stops the spawn', () => {
    const lost = (file: string): string =>
      file === 'scope.ts' ? 'nothing' : read(file);
    expect(() => spawnedTexts({ read: lost, names: NAMES, pin: PIN })).toThrow(
      'spawn · scope.ts holds no',
    );
  });
});

describe('the names a spawn is handed', () => {
  it('names of their shapes pass', () => {
    expect(namesRefused(NAMES)).toStrictEqual([]);
  });

  it.each([
    ['repository', { ...NAMES, repository: 'Kestrel Design' }],
    ['product', { ...NAMES, product: "Kes'trel" }],
    ['company', { ...NAMES, company: "Ledger's" }],
  ])('a %s out of its shape is refused', (key, names) => {
    expect(namesRefused(names)).toStrictEqual([
      expect.stringMatching(new RegExp(`^${key} · `)),
    ]);
  });
});

describe('a remote as a package manager fetches it', () => {
  it.each([
    ['git@github.com:owner/wow.git', 'git+ssh://git@github.com/owner/wow.git'],
    [
      'ssh://git@github.com/owner/wow.git',
      'git+ssh://git@github.com/owner/wow.git',
    ],
    [
      'https://github.com/owner/wow.git',
      'git+https://github.com/owner/wow.git',
    ],
  ])('%s · %s', (remote, source) => {
    expect(packageSource(remote)).toBe(source);
  });

  it('an address of no kind it knows is refused', () => {
    expect(() => packageSource('/a/folder')).toThrow('no address');
  });
});
