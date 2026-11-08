/**
 * - `messageWordsCheck` · messages.js: a sentence or key twice, a word, a count
 * - a key no drawing reads, a list for the components, off the ratchet
 */
import { leavesOf, normalized, wordFinding } from './messageLeaves.ts';
import { bansHit, wordBans } from './screenWords.ts';
import type { SourceFinding, Leaf, Texts } from './sourceCheckTypes.ts';
import * as MESSAGES from '../../sheet/words/messages.ts';

const FILE = 'messages.js';
const DRAWN: readonly string[] = [
  'screen',
  'labels',
  'hovers',
  'outcome',
  'fillText',
  'hint',
];

// a sentence typed twice in messages.js: it lives once and the rest read it
function typedTwice(src: string): readonly SourceFinding[] {
  const first = new Map<string, number>();
  return src.split('\n').flatMap((line, index) => {
    if (/^\s*\/\//.test(line)) return [];
    return [...line.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"/g)]
      .map((match) => String(match[1] ?? match[2]))
      .filter((text) => /[A-Za-z]{2,} [A-Za-z]/.test(text))
      .flatMap((text) => {
        const key = normalized(text);
        const at = first.get(key);
        if (at == null) first.set(key, index);
        return at == null
          ? []
          : [
              wordFinding('sentence typed twice', {
                file: FILE,
                index,
                text: `${text} · first on line ${at + 1}`,
              }),
            ];
      });
  });
}

function quoted(src: string, start: number): { token: string; end: number } {
  const quote = src.charAt(start);
  let token = '';
  let at = start + 1;
  while (at < src.length && src.charAt(at) !== quote) {
    const escaped = src.charAt(at) === '\\';
    token += escaped ? `\\${String(src[at + 1])}` : src.charAt(at);
    at += escaped ? 2 : 1;
  }
  return { token, end: at };
}

interface KeyToken {
  readonly token: string;
  readonly end: number;
  readonly scope: number;
}

// past a line comment, -1 when it never ends; null when the text is no comment
function commentEnd(src: string, at: number): number | null {
  if (src.charAt(at) !== '/' || src.charAt(at + 1) !== '/') return null;
  const end = src.indexOf('\n', at);
  return end < 0 ? -1 : end + 1;
}

// each quoted key inside an object, with the object it sits in
function keyTokens(src: string): readonly KeyToken[] {
  const tokens: KeyToken[] = [];
  const stack = [0];
  let opened = 0;
  let depth = 0;
  const brace = (char: string): void => {
    if (char === '{') {
      depth += 1;
      stack.push((opened += 1));
    }
    if (char !== '}') return;
    depth -= 1;
    stack.pop();
    if (!stack.length) stack.push((opened += 1));
  };
  let at = 0;
  while (at < src.length) {
    const skipped = commentEnd(src, at);
    if (skipped !== null && skipped < 0) break;
    const char = src.charAt(at);
    if (skipped !== null) at = skipped;
    else if (char === '"' || char === "'") {
      const { token, end } = quoted(src, at);
      if (/^\s*:/.test(src.slice(end + 1, end + 6)) && depth > 0)
        tokens.push({ token, end, scope: stack.at(-1) ?? 0 });
      at = end + 1;
    } else {
      brace(char);
      at += 1;
    }
  }
  return tokens;
}

// a key written twice in one object: the second wins in silence
function keysTwice(src: string): readonly SourceFinding[] {
  const scopes = new Map<number, Map<string, number>>();
  return keyTokens(src).flatMap(({ token, end, scope }) => {
    const keys = scopes.get(scope) ?? new Map<string, number>();
    scopes.set(scope, keys);
    const index = src.slice(0, end).split('\n').length - 1;
    const first = keys.get(token);
    if (first == null) keys.set(token, index);
    return first == null
      ? []
      : [
          wordFinding('key written twice', {
            file: FILE,
            index,
            text: `${token} · first on line ${first + 1}`,
          }),
        ];
  });
}

// a count with a plural word reads wrong at 1 unless its key has its One beside it
function countWithoutOne({ text, key, siblings }: Leaf): boolean {
  const match = /\{(count|days)\}\s+(?:\w+\s+){0,2}?(\w+s)\b/.exec(text);
  if (!match || /^(is|was|this|its|has)$/.test(String(match[2]))) return false;
  const paired = (siblings ?? []).some(
    (other) =>
      other !== key &&
      /One$/.test(other) &&
      String(key).indexOf(other.replace(/One$/, '')) === 0,
  );
  return !paired;
}

// a key no file reads: the build reads messages.js too, so a component to draw, not a copy
function undrawn(messages: object, files: Texts): readonly SourceFinding[] {
  const hay = Object.keys(files)
    .filter((file) => file !== FILE)
    .map((file) => files[file] ?? '')
    .join('\n');
  return DRAWN.flatMap((section) =>
    Object.keys(Reflect.get(messages, section) || {})
      .filter((key) => !new RegExp(`\\b${key}\\b`).test(hay))
      .map((key) =>
        wordFinding('message without a drawing', {
          file: FILE,
          index: -1,
          text: `${section}.${key}`,
        }),
      ),
  );
}

function messageWordsCheck(files: Texts): readonly SourceFinding[] {
  const src = files[FILE] || '';
  const typed = src ? [...typedTwice(src), ...keysTwice(src)] : [];
  const leaves = leavesOf(MESSAGES);
  const bans = wordBans();
  const banned = leaves.flatMap((leaf) =>
    bansHit(bans, leaf.text).map((ban) =>
      wordFinding('banned word in messages', {
        file: FILE,
        index: -1,
        text: `${leaf.path} · “${ban.word}” (${ban.term}) · ${leaf.text}`,
      }),
    ),
  );
  const counts = leaves.filter(countWithoutOne).map((leaf) =>
    wordFinding('count without one', {
      file: FILE,
      index: -1,
      text: `${leaf.path} · ${leaf.text}`,
    }),
  );
  return [...typed, ...banned, ...counts, ...undrawn(MESSAGES, files)];
}

export { messageWordsCheck };
