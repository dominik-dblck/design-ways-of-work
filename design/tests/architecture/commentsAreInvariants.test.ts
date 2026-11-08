/**
 * - `docs/rules/comments.md`: past the header, one-line comments, ten at most, no chronicle
 */
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { heldToItsBaseline } from './baseline.ts';
import { syntaxOf } from './fileSyntax.ts';
import { AN_EPIC, TRACES } from './traces.ts';
import { epicOfFile, productionSources } from './tree.ts';
import type { Source } from './tree.ts';

const ASIDES = 10;
const A_DIRECTIVE = /^\s*\/\/\s*(eslint-|@ts-|prettier-ignore)/;

type Block = { readonly line: number; readonly lines: readonly string[] };

function ownLineComments(
  source: Source,
  file: ts.SourceFile,
): ts.CommentRange[] {
  const ranges = new Map<number, ts.CommentRange>();
  const visit = (node: ts.Node): void => {
    for (const range of [
      ...(ts.getLeadingCommentRanges(source.text, node.pos) ?? []),
      ...(ts.getTrailingCommentRanges(source.text, node.end) ?? []),
    ])
      ranges.set(range.pos, range);
    node.getChildren(file).forEach(visit);
  };
  visit(file);
  return [...ranges.values()].sort((one, other) => one.pos - other.pos);
}

function blocksIn(source: Source): Block[] {
  const file = syntaxOf(source);
  const spans: { start: number; end: number }[] = [];
  for (const range of ownLineComments(source, file)) {
    const start = file.getLineAndCharacterOfPosition(range.pos).line;
    const end = file.getLineAndCharacterOfPosition(range.end).line;
    const last = spans.at(-1);
    if (last !== undefined && last.end === start - 1) last.end = end;
    else spans.push({ start, end });
  }
  const lines = source.text.split('\n');
  return spans.map(({ start, end }) => ({
    line: start + 1,
    lines: lines.slice(start, end + 1),
  }));
}

const isTheHeader = (block: Block | undefined): boolean =>
  block?.line === 1 &&
  /^\/\*\*\s*$/.test(block.lines[0] ?? '') &&
  /^\s*\* - /.test(block.lines[1] ?? '');

function shapeOf(block: Block, lines: readonly string[]): string | null {
  if (/^\s*\/\*/.test(block.lines[0] ?? '')) {
    const next = lines
      .slice(block.line - 1 + block.lines.length)
      .find((line) => line.trim() !== '');
    return block.lines.length === 1 && /^\s*export\b/.test(next ?? '')
      ? null
      : 'a JSDoc past the header is one line above an export';
  }
  return block.lines.filter((line) => !A_DIRECTIVE.test(line)).length > 1
    ? 'a // comment is one line'
    : null;
}

/** Where a file's comments break the rule · each finding once. */
function findingsIn(source: Source): readonly string[] {
  const blocks = blocksIn(source);
  const lines = source.text.split('\n');
  const asides = isTheHeader(blocks[0]) ? blocks.slice(1) : blocks;
  const found = new Set<string>();
  const counted = asides.reduce(
    (total, block) =>
      total + block.lines.filter((line) => !A_DIRECTIVE.test(line)).length,
    0,
  );
  if (counted > ASIDES)
    found.add(`${counted} comment lines outside the header`);
  for (const block of asides) {
    const shape = shapeOf(block, lines);
    if (shape !== null) found.add(shape);
  }
  const own = epicOfFile(source.path);
  for (const block of blocks) {
    const text = block.lines.join('\n');
    for (const [trace, shape] of TRACES)
      if (shape.test(text)) found.add(`names ${trace}`);
    if ([...text.matchAll(AN_EPIC)].some(([epic]) => epic !== own))
      found.add('names an epic');
  }
  return [...found];
}

describe('comments are invariants', () => {
  const header = "/**\n * - `a` · the planted file\n */\nimport x from 'x';\n";
  const file = (text: string): Source => ({
    path: 'sheet/words/planted.ts',
    text,
  });

  it('a two-line JSDoc, one above no export, a two-line // and eleven asides are found', () => {
    expect(
      findingsIn(
        file(`${header}/**\n * Two lines.\n */\nexport const b = 2;\n`),
      ),
    ).toEqual(['a JSDoc past the header is one line above an export']);
    expect(
      findingsIn(file(`${header}/** Above no export. */\nconst b = 2;\n`)),
    ).toEqual(['a JSDoc past the header is one line above an export']);
    expect(findingsIn(file(`${header}// one\n// two\nconst b = 2;\n`))).toEqual(
      ['a // comment is one line'],
    );
    expect(
      findingsIn(file(`${header}${'// one\nconst b = 2;\n'.repeat(11)}`)),
    ).toEqual(['11 comment lines outside the header']);
  });

  it('a date, a ticket, an epic, a criterion, a decision and a stage are found, in the header too', () => {
    for (const [trace, text] of [
      ['a date', 'moved 18 Sep'],
      ['a ticket', ['T', 'E01', '07'].join('-')],
      ['an epic', `built in ${'E'}04`],
      ['a criterion', 'criterion 3 asks it'],
      ['a decision', '(PM, 1 Oct)'.replace(', 1 Oct', '')],
      ['a stage', 'a stub until GREEN'],
    ])
      expect(
        findingsIn(file(`/**\n * - \`a\` · ${text}\n */\nconst a = 1;\n`)),
        trace,
      ).toContain(`names ${trace}`);
  });

  it('a part named for its epic names that epic, and no other', () => {
    const part = (text: string): Source => ({
      path: 'roadmaps/receipts/E04Run.ts',
      text: `/**\n * - \`E04_RUN_RECEIPTS\` · ${text}\n */\nconst a = 1;\n`,
    });
    expect(findingsIn(part('what the E04 run reported'))).toEqual([]);
    expect(findingsIn(part('read by E05'))).toEqual(['names an epic']);
  });

  it('a one-line JSDoc above an export, a one-line // and a directive pass; a string is no comment', () => {
    expect(
      findingsIn(
        file(
          [
            header,
            '/** Null when nobody has signed. */',
            'export const b = 2;',
            '// the queue keeps the order the reader typed in',
            '// eslint-disable-next-line id-length -- a colour channel',
            "const c = 'built in E04 on 18 Sep // not a comment';",
          ].join('\n'),
        ),
      ),
    ).toEqual([]);
  });

  it('no production file beyond the baseline breaks the rule', () => {
    expect(
      heldToItsBaseline(
        'commentsAreInvariants',
        productionSources()
          .filter((source) => findingsIn(source).length > 0)
          .map((source) => source.path),
      ),
    ).toEqual({ added: [], fixed: [] });
  });
});
