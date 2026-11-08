/**
 * - `twiceCheck` · a key list or a sentence in two files: the lowest layer is home
 * - a repeat in one file is that file's rows; messages.js' sentences have own checks
 */
import { exampleRow, layerOf, readable } from './sourceLayers.ts';
import { isCode } from './sourceScope.ts';
import type { SourceFinding, Texts } from './sourceCheckTypes.ts';

interface Held {
  readonly file: string;
  readonly line: number;
  readonly text: string;
}

const LIST =
  /\[\s*'[A-Za-z][\w.-]{1,30}'(?:\s*,\s*'[A-Za-z][\w.-]{1,30}')+\s*\]/g;
const STRING =
  /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`([^`\n]*)`|>([^<>{}\n]+)</g;
const NOT_PROSE =
  /[;={}]|=>|\bfunction\b|\bpx\b|:\/\/|\$\{|var\(--|^[^A-Za-z‘“]/;

// a list's key is its words sorted, a sentence's its words
function heldIn(
  file: string,
  line: string,
): readonly (readonly [string, string, string])[] {
  const lists = exampleRow(file, line)
    ? []
    : (line.match(LIST) ?? []).map(
        (list): readonly [string, string, string] => [
          'list held twice',
          (list.match(/'([^']+)'/g) ?? [])
            .map((one) => one.slice(1, -1))
            .sort()
            .join(','),
          list,
        ],
      );
  if (file === 'messages.js') return lists;
  const sentences = [...line.matchAll(STRING)]
    .map((match) => String(match[1] ?? match[2] ?? match[3] ?? match[4]).trim())
    .filter(
      (text) =>
        text.length >= 20 &&
        text.split(/\s+/).length >= 4 &&
        !NOT_PROSE.test(text),
    )
    .map((text): readonly [string, string, string] => [
      'sentence held twice',
      text,
      text,
    ]);
  return [...lists, ...sentences];
}

// a test's expected value is typed by hand and says so
function heldBy(texts: Texts): ReadonlyMap<string, ReadonlyMap<string, Held>> {
  const seen = new Map<string, Map<string, Held>>();
  for (const file of readable(texts))
    String(texts[file])
      .split('\n')
      .forEach((line, index) => {
        if (!isCode(line) || /\/\/ expected\b/.test(line)) return;
        for (const [kind, key, text] of heldIn(file, line)) {
          const id = `${kind}\u0001${key}`;
          const files = seen.get(id) ?? new Map<string, Held>();
          seen.set(id, files);
          if (!files.has(file))
            files.set(file, { file, line: index + 1, text });
        }
      });
  return seen;
}

function twiceCheck(texts: Texts): readonly SourceFinding[] {
  return [...heldBy(texts)].flatMap(([id, files]) => {
    const held = [...files.values()];
    if (held.length < 2) return [];
    const home = [...held].sort(
      (one, other) =>
        layerOf(one.file) - layerOf(other.file) ||
        (one.file < other.file ? -1 : 1),
    )[0];
    if (!home) return [];
    return held
      .filter((one) => one !== home)
      .map((one) => ({
        kind: String(id.split('\u0001')[0]),
        row: 'one source of truth (rule:one-source-of-truth)',
        file: one.file,
        line: one.line,
        home: home.file,
        text: `${one.text.slice(0, 100)} · held in ${home.file}:${home.line}`,
      }));
  });
}

export { twiceCheck };
