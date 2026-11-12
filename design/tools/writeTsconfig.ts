/**
 * - `node tools/writeTsconfig.ts --out <folder>` · tsc's config, from the scope
 * - the design layout's folders, the homes taken, the scope's `extraRoots`
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import * as prettier from 'prettier';
import { scope } from '../scope.ts';

// the design layout's folders of TypeScript, then the homes a product takes beside them
const LAYOUT = ['sheet', 'roadmaps', 'docs', 'guards', 'app', 'tools', 'tests'];
const TAKEN = ['dev', 'shared', 'design-system'];
const WITH_TSX = new Set(['app', 'tests']);

const filesOf = (folder: string): readonly string[] => [
  `${folder}/**/*.ts`,
  ...(WITH_TSX.has(folder) ? [`${folder}/**/*.tsx`] : []),
];

const CONFIG = {
  extends: './shared/tsconfig.base.json',
  compilerOptions: {
    target: 'ES2022',
    lib: ['ES2022', 'DOM'],
    module: 'esnext',
    moduleResolution: 'bundler',
    resolveJsonModule: true,
    types: ['node', 'vitest/globals'],
    jsx: 'react-jsx',
    noUncheckedIndexedAccess: true,
    exactOptionalPropertyTypes: true,
  },
  include: [
    ...LAYOUT.flatMap(filesOf),
    '*.config.ts',
    '*.config.mts',
    ...TAKEN.flatMap(filesOf),
    ...scope.extraRoots.flatMap(filesOf),
  ],
  exclude: ['node_modules', 'dist', '.artifact'],
};

const { out } = parseArgs({ options: { out: { type: 'string' } } }).values;
if (out === undefined)
  throw new Error('writeTsconfig · `--out <folder>` names where it writes');
fs.writeFileSync(
  path.join(out, 'tsconfig.json'),
  await prettier.format(JSON.stringify(CONFIG, null, 2), { parser: 'json' }),
);
