import { describe, expect, it } from 'vitest';
import {
  copiedFrom,
  reviewRefusal,
  specified,
} from '../../scripts/syncFiles.ts';
import type { CopySet } from '../../scripts/syncFiles.ts';

const SOURCES: Readonly<Record<string, string>> = {
  'app/styles/theme.ts':
    "import { tones } from './theme/tones';\nimport type { Mode } from './tokens';\n",
  'app/styles/theme/tones.ts': "import { sx } from '@/app/utils/sx';\n",
  'app/styles/tokens.ts': 'export const tokens = {};\n',
  'app/utils/sx.ts': "import { styled } from '@mui/material/styles';\n",
  'app/components/atoms/Button/index.ts':
    "export { Button } from './Button';\n",
  'app/components/atoms/Button/Button.tsx':
    "import { tones } from '@/app/styles/theme/tones';\n",
  'app/components/atoms/Button/__tests__/aButton.test.tsx':
    "import { appTheme } from '@/app/styles/appTheme';\n",
  'app/components/atoms/Mark/index.ts': 'export const MARK = 1;\n',
  'app/styles/appTheme.ts': 'export default {};\n',
};
const files = new Set(Object.keys(SOURCES));
const read = (file: string): string => SOURCES[file] ?? '';
const SET: CopySet = {
  into: 'design',
  seeds: ['app/styles/theme.ts', 'app/components/atoms/'],
  provided: ['app/styles/tokens.ts'],
  left: [
    /\/__tests__\//,
    /^app\/components\/atoms\/Mark\//,
    /^app\/styles\/appTheme\.ts$/,
  ],
  reviewed: 'moves/review-{sha}.md',
};

describe('the copy is its seeds and what they import', () => {
  it('a seed, its local imports and theirs; no test, no left file, no provided one', () => {
    expect(copiedFrom({ set: SET, read, files })).toStrictEqual([
      'app/components/atoms/Button/Button.tsx',
      'app/components/atoms/Button/index.ts',
      'app/styles/theme.ts',
      'app/styles/theme/tones.ts',
      'app/utils/sx.ts',
    ]);
  });

  it('a seed that imports a file left there stops the copy, naming both', () => {
    const reads = (file: string): string =>
      file === 'app/styles/theme.ts'
        ? "import appTheme from './appTheme';\n"
        : read(file);
    expect(() => copiedFrom({ set: SET, read: reads, files })).toThrow(
      'sync · app/styles/theme.ts imports app/styles/appTheme.ts, which stays there',
    );
  });

  it('an import that resolves to no file stops the copy', () => {
    const reads = (file: string): string =>
      file === 'app/utils/sx.ts'
        ? "import { gone } from './gone';\n"
        : read(file);
    expect(() => copiedFrom({ set: SET, read: reads, files })).toThrow(
      'sync · app/utils/sx.ts · ./gone resolves to no file',
    );
  });
});

describe('an import is written as this side reads it', () => {
  it.each([
    ['app/styles/theme.ts', "from './theme/tones'", "from './theme/tones.ts'"],
    ['app/styles/theme.ts', "from './tokens'", "from './tokens.ts'"],
    [
      'app/components/atoms/Button/Button.tsx',
      "from '@/app/styles/theme/tones'",
      "from '../../../styles/theme/tones.ts'",
    ],
    [
      'app/components/atoms/Button/index.ts',
      "from './Button'",
      "from './Button.tsx'",
    ],
  ])('%s · %s', (file, before, after) => {
    const text = `import { one } ${before};\n`;
    expect(specified({ file, text, files })).toBe(`import { one } ${after};\n`);
  });

  it('a package keeps its name', () => {
    const text = "import { styled } from '@mui/material/styles';\n";
    expect(specified({ file: 'app/utils/sx.ts', text, files })).toBe(text);
  });
});

describe('a sha comes only with its architecture review passed', () => {
  const SHA = 'eed29307104349896b424a72f12e5230e1570c06';
  const recordOf = (head: string, verdict: string): string =>
    `# Architecture review\n\nbase: 3407b251\nhead: ${head}\nverdict: ${verdict}\n\n- Reviewed: one file.\n`;

  it('a record naming the sha as its head, passed: the copy goes', () => {
    expect(
      reviewRefusal({ record: recordOf(SHA, 'pass'), sha: SHA }),
    ).toBeNull();
  });

  it.each([
    ['no record', null, 'no architecture review record'],
    [
      'a record of another head',
      recordOf('782e7b77', 'pass'),
      "its review record's head is 782e7b77",
    ],
    [
      'a record that does not pass',
      recordOf(SHA, 'findings'),
      "its review's verdict is findings",
    ],
  ])('%s: refused, saying why', (_, record, said) => {
    expect(reviewRefusal({ record, sha: SHA })).toBe(said);
  });
});
