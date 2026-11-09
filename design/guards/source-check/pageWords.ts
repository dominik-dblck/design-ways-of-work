/**
 * - `pageWordsCheck` · a glossary word or a messages.js line typed on a product page
 * - a document's state chip is catalog.js' STATE label, never a line like it
 */
import { leavesOf, normalized, wordFinding } from './messageLeaves.ts';
import { bansHit, wordBans } from './screenWords.ts';
import { isCode, SHEET_PAGE } from './sourceScope.ts';
import { TEXT } from './textKinds.ts';
import type {
  SourceFinding,
  Leaf,
  Texts,
  WordBan,
} from './sourceCheckTypes.ts';
import * as MESSAGES from '../../sheet/words/messages.ts';

interface Sayings {
  readonly chips: ReadonlyMap<string, string>;
  readonly whole: ReadonlyMap<string, string>;
  readonly starts: ReadonlyMap<string, string>;
  readonly segments: ReadonlyMap<string, string>;
  readonly bans: readonly WordBan[];
}

function chipsOf(catalog: unknown): ReadonlyMap<string, string> {
  const chips = new Map<string, string>();
  for (const match of String(catalog || '').matchAll(
    /\b(\w+): \{ label: '([^']+)'/g,
  ))
    chips.set(String(match[2]), String(match[1]));
  return chips;
}

// a line with its fills as {}: the first path that holds it, and a head of three words or more
function sayingsOf(
  leaves: readonly Leaf[],
): Pick<Sayings, 'whole' | 'starts' | 'segments'> {
  const whole = new Map<string, string>();
  const starts = new Map<string, string>();
  const segments = new Map<string, string>();
  for (const { path, text } of leaves) {
    const key = normalized(text.replace(/\{\w+\}/g, '{}'));
    if (!whole.get(key)) whole.set(key, path);
    const head = (key.split('{}')[0] ?? '').trim();
    if (/\{\}/.test(key) && head.split(' ').length >= 3) starts.set(head, path);
    if (!/\{\w+\}/.test(text)) continue;
    for (const part of text.split(/\{\w+\}/)) {
      const bare = part.replace(/^[\s·—:,]+|(?<![\s·—:,])[\s·—:,]+$/g, '');
      if (/^[A-Za-z]+( [A-Za-z’]+)+$/.test(bare)) segments.set(bare, path);
    }
  }
  return { whole, starts, segments };
}

// a text, a title, an alt, a placeholder or an aria-label, however short
function shownTexts(line: string): readonly string[] {
  return [
    ...(line.match(/>([^<>{}A-Za-z]*[A-Za-z][^<>{}]*)</g) ?? []).map((text) =>
      text.slice(1, -1),
    ),
    ...[
      ...line.matchAll(/\b(title|alt|placeholder|aria-label)="([^"{}]+)"/g),
    ].map((match) => String(match[2])),
  ];
}

function copiedLiteral(literal: string, sayings: Sayings): string | null {
  const segment = sayings.segments.get(literal);
  if (segment) return `${literal} · the words of ${segment}`;
  const chip = sayings.chips.get(literal);
  if (chip) return `${literal} · catalog.js STATE.${chip}.label`;
  const whole = / /.test(literal)
    ? sayings.whole.get(normalized(literal))
    : undefined;
  return whole ? `${literal} · ${whole}` : null;
}

// a template text with holes that is a line's words, or starts like one
function copiedTemplate(text: string, sayings: Sayings): readonly string[] {
  const key = normalized(text.replace(/(?<!\{)\{\{[^}]*\}\}/g, '{}'));
  const whole = sayings.whole.get(key);
  if (/(?<![a-z])[a-z]{2,} [a-z]/.test(key) && whole)
    return [`${text.trim()} · ${whole}`];
  return [...sayings.starts]
    .filter(
      ([start]) =>
        key.indexOf(start) === 0 && /(?<![a-z])[a-z]{3,} [a-z]{3,}/.test(start),
    )
    .map(([, path]) => `${text.trim()} · starts like ${path}`);
}

// an element's text that holds a {{…}} fill
function holdsATemplate(text: string): boolean {
  const opens = text.indexOf('{{');
  return opens >= 0 && text.includes('}}', opens + 2);
}

function lineCopies(
  line: string,
  sayings: Sayings,
): readonly (readonly [string, string])[] {
  const banned = shownTexts(line).flatMap((text) =>
    bansHit(sayings.bans, text).map((ban): readonly [string, string] => [
      'banned word in code',
      `“${ban.word}” (${ban.term}) · ${text.trim()}`,
    ]),
  );
  const literals = [...line.matchAll(/'((?:[^'\\]|\\.)*)'/g)].flatMap(
    (match) => {
      const said = copiedLiteral(String(match[1]).trim(), sayings);
      return said ? [['sentence copied', said] as const] : [];
    },
  );
  const templates = (line.match(/>[^<>]*</g) ?? [])
    .filter(holdsATemplate)
    .flatMap((text) =>
      copiedTemplate(text.slice(1, -1), sayings).map(
        (said) => ['sentence copied', said] as const,
      ),
    );
  return [...banned, ...literals, ...templates];
}

function pageWordsCheck(files: Texts): readonly SourceFinding[] {
  const sayings: Sayings = {
    chips: chipsOf(files['catalog.js']),
    ...sayingsOf(leavesOf(MESSAGES)),
    bans: wordBans(),
  };
  const pages = Object.keys(files).filter(
    (file) =>
      /\.dc\.html$/.test(file) &&
      TEXT[file]?.is !== 'sheet' &&
      !SHEET_PAGE.test(file),
  );
  return pages.flatMap((file) =>
    String(files[file] ?? '')
      .split('\n')
      .flatMap((line, index) =>
        isCode(line)
          ? lineCopies(line, sayings).map(([kind, text]) =>
              wordFinding(kind, { file, index, text }),
            )
          : [],
      ),
  );
}

export { pageWordsCheck };
