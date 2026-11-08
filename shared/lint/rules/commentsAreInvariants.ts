/**
 * - `commentsAreInvariants` · past the header, one-line comments, ten at most
 * - no chronicle in any; own-line comments one after another are one block
 */
import type { TSESTree } from '@typescript-eslint/utils';
import { PROLOGUE } from '../header.ts';
import { AN_EPIC, epicOfFile, TRACES } from '../traces.ts';
import { createRule } from './ruleKit.ts';

const ASIDES = 10;
const A_DIRECTIVE = /^\s*\/\/\s*(eslint-|@ts-|prettier-ignore)/;

type MessageId = 'jsdoc' | 'oneLine' | 'asides' | 'trace';

interface Block {
  readonly start: number;
  readonly end: number;
}

// lines are 1-based, as ESLint counts them · a comment after code is an aside to it, never a block
function blocksOf(comments: readonly TSESTree.Comment[]): readonly Block[] {
  const blocks: Block[] = [];
  for (const { loc } of comments) {
    const last = blocks.at(-1);
    if (last !== undefined && loc.start.line - last.end <= 1)
      blocks[blocks.length - 1] = { start: last.start, end: loc.end.line };
    else blocks.push({ start: loc.start.line, end: loc.end.line });
  }
  return blocks;
}

const counted = (lines: readonly string[]): number =>
  lines.filter((line) => !A_DIRECTIVE.test(line)).length;

function shapeOf(
  block: Block,
  lines: readonly string[],
): Extract<MessageId, 'jsdoc' | 'oneLine'> | null {
  const own = lines.slice(block.start - 1, block.end);
  if (/^\s*\/\*/.test(own[0] ?? '')) {
    const next = lines.slice(block.end).find((line) => line.trim() !== '');
    return own.length === 1 && /^\s*export\b/.test(next ?? '') ? null : 'jsdoc';
  }
  return counted(own) > 1 ? 'oneLine' : null;
}

interface Finding {
  readonly block: Block;
  readonly messageId: MessageId;
  readonly data?: Readonly<Record<string, string | number>>;
}

function tracesIn(text: string, own: string | null): readonly string[] {
  const traces = TRACES.filter(([, shape]) => shape.test(text));
  const hasAnEpic = [...text.matchAll(AN_EPIC)].some(([one]) => one !== own);
  return [...traces.map(([trace]) => trace), ...(hasAnEpic ? ['an epic'] : [])];
}

const isTheHeader = (
  blocks: readonly Block[],
  { lines, text }: { readonly lines: readonly string[]; readonly text: string },
): boolean => {
  const at = (PROLOGUE.exec(text)?.[0] ?? '').split('\n').length;
  return (
    blocks[0]?.start === at &&
    /^\/\*\*\s*$/.test(lines[at - 1] ?? '') &&
    /^\s*\* - /.test(lines[at] ?? '')
  );
};

// past the header: the count, then each block's shape
function asideFindings(
  asides: readonly Block[],
  lines: readonly string[],
): readonly Finding[] {
  const total = asides.reduce(
    (sum, block) => sum + counted(lines.slice(block.start - 1, block.end)),
    0,
  );
  const last = asides.at(-1);
  const tooMany: readonly Finding[] =
    total > ASIDES && last !== undefined
      ? [{ block: last, messageId: 'asides', data: { count: total } }]
      : [];
  return [
    ...tooMany,
    ...asides.flatMap((block): readonly Finding[] => {
      const shape = shapeOf(block, lines);
      return shape === null ? [] : [{ block, messageId: shape }];
    }),
  ];
}

interface Read {
  readonly lines: readonly string[];
  readonly text: string;
  readonly own: string | null;
}

const isOnItsOwnLine = (
  comment: TSESTree.Comment,
  lines: readonly string[],
): boolean =>
  (lines[comment.loc.start.line - 1] ?? '')
    .slice(0, comment.loc.start.column)
    .trim() === '';

function findingsIn(
  comments: readonly TSESTree.Comment[],
  read: Read,
): readonly Finding[] {
  const { lines, own } = read;
  // a shebang is the runner's line, never a comment
  const written = comments.filter(
    (one) => one.range[0] !== 0 || !read.text.startsWith('#!'),
  );
  const blocks = blocksOf(written.filter((one) => isOnItsOwnLine(one, lines)));
  const asides = isTheHeader(blocks, read) ? blocks.slice(1) : blocks;
  const trailing = written.filter((one) => !isOnItsOwnLine(one, lines));
  return [
    ...asideFindings(asides, lines),
    ...blocks.flatMap((block) =>
      tracesIn(lines.slice(block.start - 1, block.end).join('\n'), own).map(
        (trace): Finding => ({ block, messageId: 'trace', data: { trace } }),
      ),
    ),
    ...trailing.flatMap((one) =>
      tracesIn(one.value, own).map((trace): Finding => ({
        block: { start: one.loc.start.line, end: one.loc.end.line },
        messageId: 'trace',
        data: { trace },
      })),
    ),
  ];
}

const commentsAreInvariants = createRule({
  name: 'comments-are-invariants',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Past the header a comment is one line, and none is a chronicle',
    },
    messages: {
      jsdoc:
        'A JSDoc past the header is one line, directly above an export (docs/rules/comments.md).',
      oneLine: 'A `//` comment is one line (docs/rules/comments.md).',
      asides:
        '{{count}} comment lines outside the header; at most 10 (docs/rules/comments.md).',
      trace:
        'A comment names {{trace}}: no chronicle in a comment (docs/rules/comments.md).',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { lines } = context.sourceCode;
    const own = epicOfFile(context.filename);
    return {
      Program() {
        const comments = context.sourceCode.getAllComments();
        for (const { block, ...found } of findingsIn(comments, {
          lines,
          text: context.sourceCode.text,
          own,
        }))
          context.report({
            ...found,
            loc: {
              start: { line: block.start, column: 0 },
              end: {
                line: block.end,
                column: lines[block.end - 1]?.length ?? 0,
              },
            },
          });
      },
    };
  },
});

export { commentsAreInvariants };
