/**
 * - `guideText` · the guide written out, each token it names with its value
 * - `{--x:dark}` its dark value; `{why:--a,--b}` those tokens and their use
 */
import { designSystem, isToken } from './designSystem.ts';
import type { Guide, Token } from './designTypes.ts';

const TOKENS: ReadonlyMap<string, Token> = new Map(
  designSystem
    .flatMap((group) => group.entries.filter(isToken))
    .map((token) => [token.name, token]),
);

const REF = /\{(--[\w-]+)(?::(dark))?\}/g;
const WHY = /^\{why:([^}]+)\}$/;
const VAR = /var\((--[\w-]+)\)/g;
const HEAD =
  '<!-- Written by `node design-system/writeGuide.ts` from `design-system/guide.ts`: edit the data, never this file. -->';

function tokenOf(name: string): Token {
  const found = TOKENS.get(name);
  if (found === undefined) throw new Error(`guide · no token ${name}`);
  return found;
}

// a token's value in its mode, each `var()` in it written out, a composite's too (`2px 2px 0 var(--x)`)
function valueOf(name: string, isDark: boolean): string {
  const token = tokenOf(name);
  const written = isDark ? (token.dark ?? token.light) : token.light;
  return written.replace(VAR, (_match: string, named: string) =>
    valueOf(named, isDark),
  );
}

const refsIn = (line: string): string =>
  line.replace(REF, (_match: string, name: string, mode?: string) =>
    mode === 'dark'
      ? `\`${name}\` (${valueOf(name, true)} dark)`
      : `\`${name}\` (${valueOf(name, false)})`,
  );

// a line as written, or the list it names: each token, its value and its use
function linesOf(line: string): readonly string[] {
  const listed = WHY.exec(line)?.[1];
  if (listed === undefined) return [refsIn(line)];
  return listed.split(',').map((name) => {
    const { why } = tokenOf(name);
    if (why === undefined) throw new Error(`guide · ${name} has no use`);
    return `- \`${name}\` (${valueOf(name, false)}) · ${why}`;
  });
}

function guideText(guide: Guide): string {
  const parts = guide.sections.filter((section) => section.level === 2);
  return [
    HEAD,
    '',
    `# ${guide.title}`,
    '',
    ...guide.intro.flatMap(linesOf),
    '',
    '## Contents',
    '',
    ...parts.map((section) => `- ${section.heading}`),
    '',
    ...guide.sections.flatMap((section) => [
      `${'#'.repeat(section.level)} ${section.heading}`,
      '',
      ...section.lines.flatMap(linesOf),
      '',
    ]),
  ].join('\n');
}

export { guideText };
