/**
 * - a JSON file is one a tool opens by its name, or one a script writes (the scope's `generated`)
 * - any other is data a person or an agent wrote, which is TypeScript, typed and linted
 */
import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { isNamedBy } from './globs.ts';

// a name a tool opens by convention: the package, a compiler's config, an agent's settings, ESLint's suppressions
const OPENED_BY_NAME: readonly RegExp[] = [
  /(^|\/)package\.json$/,
  /(^|\/)tsconfig(\.[\w-]+)?\.json$/,
  /(^|\/)\.claude\/settings(\.local)?\.json$/,
  /^eslint-suppressions\.json$/,
];

// a JSON file nothing opens by name and no listed script writes
const isHandWritten = (file: string, written: readonly string[]): boolean =>
  !OPENED_BY_NAME.some((name) => name.test(file)) && !isNamedBy(file, written);

// a folder the scope sets aside holds its dotfiles too: `legacy/**` names `legacy/.prettierrc.json`
const isSetAside = (file: string): boolean =>
  scope.ignores.some((glob) =>
    glob.endsWith('/**')
      ? file.startsWith(glob.slice(0, -2))
      : isNamedBy(file, [glob]),
  );

// the repository's JSON as git holds it: tracked, or new and not ignored
const jsonFiles = (): readonly string[] =>
  execFileSync(
    'git',
    ['ls-files', '-z', '--cached', '--others', '--exclude-standard', '*.json'],
    { cwd: scope.root, encoding: 'utf8' },
  )
    .split('\0')
    .filter((file) => file !== '');

describe('data is written as TypeScript', () => {
  it('tells a file a tool opens by name or a script writes from data written by hand', () => {
    expect(isHandWritten('package.json', [])).toBe(false);
    expect(isHandWritten('shared/tsconfig.base.json', [])).toBe(false);
    expect(isHandWritten('.claude/settings.local.json', [])).toBe(false);
    expect(
      isHandWritten('fixtures/data/modes.json', ['fixtures/data/modes.json']),
    ).toBe(false);
    expect(isHandWritten('fixtures/data/modes.json', [])).toBe(true);
    expect(isHandWritten('notes/eslint-suppressions.json', [])).toBe(true);
  });

  it('every JSON file is opened by a tool by its name or written by a script', () => {
    expect(
      jsonFiles().filter(
        (file) => !isSetAside(file) && isHandWritten(file, scope.generated),
      ),
      'write each as a TypeScript module, or name the script that writes it in the scope’s `generated` (docs/rules/checks.md)',
    ).toEqual([]);
  });
});
