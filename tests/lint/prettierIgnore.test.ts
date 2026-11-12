import { describe, expect, it } from 'vitest';
import { scopeAt } from './scopeAt.ts';
import { prettierIgnoreOf } from '../../shared/lint/prettierConfig.ts';

describe("prettier's ignore file, from the scope", () => {
  const written = prettierIgnoreOf(
    scopeAt('/repo', {
      ignores: ['legacy/**', 'dist/**'],
      generated: ['app/tokens.ts'],
      generators: [
        {
          script: 'tools/emit.ts',
          args: [],
          writes: ['app/tokens.ts', 'docs/*.md', '!docs/README.md'],
        },
      ],
      unformatted: { 'legacy/**': 'kept as it was' },
    }),
  );
  const lines = written.split('\n').filter(Boolean);

  it('names each line once, in the first group that names it', () => {
    expect(lines.filter((line) => line === 'app/tokens.ts')).toHaveLength(1);
    expect(lines.filter((line) => line === 'legacy/')).toHaveLength(1);
  });

  it('leaves out a group all of whose lines stand above', () => {
    expect(lines).not.toContain('# kept as it was');
  });

  it('keeps every glob a generator writes, never one it excepts', () => {
    expect(lines).toContain('docs/*.md');
    expect(lines).not.toContain('!docs/README.md');
  });
});
