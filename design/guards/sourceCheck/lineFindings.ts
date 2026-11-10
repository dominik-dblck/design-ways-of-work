/**
 * - `copiesInLine` · a status map or function, a typed list or colour, in one line
 * - `sentencesIn` · a sentence typed in code, or a messages.js line typed again
 */
import { exampleRow } from './sourceLayers.ts';
import { homesOfRow, LOGIC_PAGE } from './sourceScope.ts';
import { stringKeyOf, kindOf, STATUS_KEYS, TEXT } from './textKinds.ts';
import type { SourceFinding, LineAt } from './sourceCheckTypes.ts';

const FACTS = 'facts of a document, the API’s shape';
const SENTENCES = 'sentences a person sees';
const LANGUAGE = 'a language: its status and what an act does to it';
const STATUS_HOMES: readonly string[] = [
  'translationFlow.js',
  'gateRules.js',
  'gateStates.js',
  'sourceCheck.js',
];

const finding = (
  at: LineAt,
  {
    kind,
    row,
    text,
  }: { readonly kind: string; readonly row: string; readonly text: unknown },
): SourceFinding => ({
  kind,
  row,
  file: at.file,
  line: at.index + 1,
  text: String(text).slice(0, 140),
});

function statusMap(at: LineAt): readonly SourceFinding[] {
  const homes = [
    ...homesOfRow(LANGUAGE),
    ...homesOfRow('colours'),
    ...homesOfRow('who may act, a gate’s state'),
  ];
  if (homes.includes(at.file)) return [];
  const pairs =
    (at.line.match(new RegExp(`\\b(${STATUS_KEYS})\\s*:\\s*['"]`, 'g')) ?? [])
      .length +
    (
      at.line.match(
        /'[-a-z]'\s*:\s*'(none|agent|warn|ok|proxy|stale|missing|locked|pool|waiting)'/g,
      ) ?? []
    ).length;
  return pairs >= 3
    ? [finding(at, { kind: 'status map', row: LANGUAGE, text: at.line.trim() })]
    : [];
}

// a function that works out a status; a flag decides none
function statusFunction(at: LineAt): readonly SourceFinding[] {
  const found =
    /\b(?:function\s+(\w*(?:Status|status)\w*)\s*\(|(?:const|var|let)\s+(\w*(?:Status|status)\w*)\s*=\s*(?:function\b|\([^)]*\)\s*=>|\w+\s*=>))/.exec(
      at.line,
    );
  if (!found || STATUS_HOMES.includes(at.file)) return [];
  return [
    finding(at, {
      kind: 'status function',
      row: LANGUAGE,
      text: found[1] || found[2],
    }),
  ];
}

// the languages or the gates typed by hand, two or more, outside their homes
function typedList(at: LineAt): readonly SourceFinding[] {
  if (
    homesOfRow(FACTS).includes(at.file) ||
    ['directory.js', 'contentModules.js'].includes(at.file) ||
    exampleRow(at.file, at.line) ||
    !/\[\s*'(EN|FR|PT|ES|DE|IT|PRD|LGL)'\s*(,\s*'(FR|PT|ES|DE|IT|PRD|LGL|EN|cm)'\s*){1,}\]/.test(
      at.line,
    )
  )
    return [];
  return [
    finding(at, { kind: 'typed list', row: FACTS, text: at.line.trim() }),
  ];
}

function typedColour(at: LineAt): readonly SourceFinding[] {
  if (
    homesOfRow('colours').includes(at.file) ||
    !/#[0-9a-f]{6}\b/i.test(at.line)
  )
    return [];
  return [
    finding(at, { kind: 'typed colour', row: 'colours', text: at.line.trim() }),
  ];
}

function copiesInLine(at: LineAt): readonly SourceFinding[] {
  return [
    ...statusMap(at),
    ...statusFunction(at),
    ...typedList(at),
    ...typedColour(at),
  ];
}

// each string's words and its key; a file's name on dc-import and an object's key are none
function literalsOf(at: LineAt): readonly (readonly [string, string])[] {
  const found: (readonly [string, string])[] = [];
  for (const match of at.line.matchAll(
    /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g,
  )) {
    const before = at.line.slice(0, match.index);
    const after = at.line.slice(match.index + match[0].length);
    const isKey = /(^|[{,])\s*$/.test(before) && /^\s*:/.test(after);
    if (!/name=$/.test(before) && !isKey)
      found.push([String(match[1] ?? match[2]), stringKeyOf(before)]);
  }
  if (at.isPage)
    for (const text of at.line.match(/>([^<>{}]{12,})</g) ?? [])
      found.push([text.slice(1, -1), '<text>']);
  return found;
}

function sentencesInCode(
  at: LineAt,
  banned: readonly RegExp[],
): readonly SourceFinding[] {
  if (
    homesOfRow(SENTENCES).includes(at.file) ||
    LOGIC_PAGE.test(at.file) ||
    /throw new Error|console\./.test(at.line)
  )
    return [];
  return literalsOf(at).flatMap(([words, key]) => {
    const text = words.trim();
    const kind = kindOf(at.file, { key, decl: at.decl });
    if (
      text.length < 12 ||
      !/(?<![A-Za-z])[A-Za-z]+ [A-Za-z]+ [A-Za-z]+/.test(text) ||
      /\.(js|ts)\b|:\/\/|var\(|\{\{|^[a-z-]+\.[a-z_.]+$|[;=]|\bfunction\b/.test(
        text,
      )
    )
      return [];
    if (kind === 'typed')
      return [finding(at, { kind: 'typed by hand', row: FACTS, text })];
    if (kind !== 'screen') return [];
    const said = banned.some((pattern) => pattern.test(text))
      ? 'sentence in code · banned word'
      : 'sentence in code';
    return [finding(at, { kind: said, row: SENTENCES, text })];
  });
}

// every string and page text but a dc-import's name and a sheet key's words
function quotedTexts(at: LineAt): readonly string[] {
  const texts: string[] = [];
  for (const match of at.line.matchAll(
    /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|>([^<>{}]+)</g,
  )) {
    const before = at.line.slice(0, match.index);
    const isSheet =
      match[3] == null &&
      kindOf(at.file, { key: stringKeyOf(before), decl: at.decl }) === 'sheet';
    if (!/name=$/.test(before) && !isSheet)
      texts.push(String(match[1] ?? match[2] ?? match[3]).trim());
  }
  return texts;
}

// a test's expected value is typed by hand and says so: its declaration is named in TEXT
function copiedLines(
  at: LineAt,
  lines: ReadonlySet<string>,
): readonly SourceFinding[] {
  if (
    homesOfRow(SENTENCES).includes(at.file) ||
    (TEXT[at.file]?.expectedIn ?? []).includes(at.decl)
  )
    return [];
  return quotedTexts(at)
    .filter((text) => lines.has(text))
    .map((text) =>
      finding(at, { kind: 'sentence copied', row: SENTENCES, text }),
    );
}

function sentencesIn(
  at: LineAt,
  {
    banned,
    lines,
  }: {
    readonly banned: readonly RegExp[];
    readonly lines: ReadonlySet<string>;
  },
): readonly SourceFinding[] {
  return [...sentencesInCode(at, banned), ...copiedLines(at, lines)];
}

export { copiesInLine, sentencesIn };
