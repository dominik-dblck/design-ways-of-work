/**
 * - a reviewed word has one home: the way of working's list or a scope's; a computed one is taken once
 * - a generator's file is spelled at its source; a `!` among its globs, a text misspelt on purpose
 */
import { describe, expect, it } from 'vitest';
import { cspellConfigOf } from '../../shared/lint/cspellConfig.ts';
import type { RepoScope } from '../../shared/repoScope.ts';
import { scopeAt } from './scopeAt.ts';

const spelling = (named: Partial<RepoScope['spelling']>) => ({
  spelling: {
    files: ['**/*.ts'],
    computed: [],
    reviewed: [],
    onPurpose: [],
    alsoIn: [],
    ...named,
  },
});

describe("cspell's config", () => {
  it('refuses a reviewed word the way of working holds already, in any case', () => {
    expect(() =>
      cspellConfigOf(scopeAt('/repo', spelling({ reviewed: ['Backticked'] }))),
    ).toThrow(/Backticked is the way of working's own word/);
  });

  it('takes a computed word the way of working holds once, and a new one beside it', () => {
    const { words } = cspellConfigOf(
      scopeAt('/repo', spelling({ computed: ['Wordmark', 'Dimitri'] })),
    );
    expect(words?.filter((word) => word.toLowerCase() === 'wordmark')).toEqual([
      'wordmark',
    ]);
    expect(words).toContain('Dimitri');
  });

  it("turns a generator's files off and a `!` among them back on, in its order", () => {
    const generators = [
      {
        script: 'tools/emit.ts',
        args: [],
        writes: ['docs/*.md', '!docs/README.md'],
      },
    ];
    expect(
      cspellConfigOf(scopeAt('/repo', { ...spelling({}), generators }))
        .overrides,
    ).toEqual([
      { filename: 'docs/*.md', enabled: false },
      { filename: 'docs/README.md', enabled: true },
    ]);
  });

  it('keeps a `!` of one generator over a broader glob of the next', () => {
    const generators = [
      {
        script: 'tools/a.ts',
        args: [],
        writes: ['docs/rules/*.md', '!docs/rules/README.md'],
      },
      { script: 'tools/b.ts', args: [], writes: ['docs/**/*.md'] },
    ];
    expect(
      cspellConfigOf(scopeAt('/repo', { ...spelling({}), generators }))
        .overrides,
    ).toEqual([
      { filename: 'docs/rules/*.md', enabled: false },
      { filename: 'docs/**/*.md', enabled: false },
      { filename: 'docs/rules/README.md', enabled: true },
    ]);
  });

  it('leaves a text misspelt on purpose out where it stands, and nowhere else', () => {
    expect(
      cspellConfigOf(
        scopeAt('/repo', spelling({ onPurpose: [/typing page as Pagee/g] })),
      ).ignoreRegExpList,
    ).toContain('/typing page as Pagee/g');
  });

  it("speaks another language's words only in its files", () => {
    const alsoIn = [
      { language: 'pl' as const, files: ['docs/**'], words: ['Skille'] },
    ];
    const config = cspellConfigOf(scopeAt('/repo', spelling({ alsoIn })));
    expect(config.words).not.toContain('Skille');
    expect(config.overrides).toEqual([
      { filename: ['docs/**'], language: 'en,en-GB,pl', words: ['Skille'] },
    ]);
  });
});
