/**
 * - `docs/rules/styling.md`: React code reads a colour through the theme, as a palette role
 * - never a token variable, a typed value, a palette path on `color`, nor the light palette's value
 */
import { describe, expect, it } from 'vitest';
import { reactSources } from './components.ts';
import type { Source } from './tree.ts';

const A_VARIABLE = /var\(\s*(--[\w-]+)/g;
const A_VALUE = /['"`][^'"`\n]*?(#[\da-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\()/g;
// MUI 9 reads `textSecondary` on a Typography's `color` and drops `text.secondary` without a word
const A_PATH_COLOUR = /\bcolor=(?:"text\.\w+"|\{[^}]*'text\.\w+'[^}]*\})/g;
// with `cssVariables` on, `theme.palette.x` is the light scheme's value; `theme.vars.palette.x` follows
const A_LIGHT_VALUE = /\btheme\.palette\.\w+/g;

const A_COMMENT = /^\s*(\/\/|\*|\/\*)/;

// each finding of one pattern in a text, as `line · what`, comment lines passed
function found(text: string, pattern: RegExp): readonly string[] {
  return text
    .split('\n')
    .flatMap((line, at) =>
      A_COMMENT.test(line)
        ? []
        : [...line.matchAll(pattern)].map(
            (match) => `${at + 1} · ${match[1] ?? match[0]}`,
          ),
    );
}

const inSources = (
  sources: readonly Source[],
  pattern: RegExp,
): readonly string[] =>
  sources.flatMap((source) =>
    found(source.text, pattern).map((one) => `${source.path}:${one}`),
  );

describe('a colour is a palette role', () => {
  it('the scans see a variable, a typed value, a path and a light value; a role passes', () => {
    const text = [
      "sx={{ color: 'var(--fg-primary)', bgcolor: 'background.paper' }}",
      "sx={{ borderColor: '#e5e7eb', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}",
      '<Typography color="text.secondary" />',
      'outline: `2px solid ${theme.palette.info.main}`,',
      'outline: `2px solid ${theme.vars.palette.info.main}`,',
      '// `theme.palette.x` is the light value',
    ].join('\n');
    expect(found(text, A_VARIABLE)).toEqual(['1 · --fg-primary']);
    expect(found(text, A_VALUE)).toEqual(['2 · #e5e7eb', '2 · rgba(']);
    expect(found(text, A_PATH_COLOUR)).toEqual(['3 · color="text.secondary"']);
    expect(found(text, A_LIGHT_VALUE)).toEqual(['4 · theme.palette.info']);
  });

  it('no React code reads a token variable · the theme holds the tokens', () => {
    expect(inSources(reactSources(), A_VARIABLE)).toEqual([]);
  });

  it('no React code types a colour · a role follows the mode', () => {
    expect(inSources(reactSources(), A_VALUE)).toEqual([]);
  });

  it('a Typography colour is MUI’s key, and a colour read in code is the scheme’s variable', () => {
    expect([
      ...inSources(reactSources(), A_PATH_COLOUR),
      ...inSources(reactSources(), A_LIGHT_VALUE),
    ]).toEqual([]);
  });
});
