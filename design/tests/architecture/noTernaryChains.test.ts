/**
 * - `docs/rules/functions.md`: no ternary chain three deep, read off the syntax tree
 */
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { heldToItsBaseline } from './baseline.ts';
import { syntaxOf } from './fileSyntax.ts';
import { productionSources } from './tree.ts';
import type { Source } from './tree.ts';

const DEEPEST = 2;

function depthOf(node: ts.Node): number {
  if (ts.isParenthesizedExpression(node)) return depthOf(node.expression);
  if (!ts.isConditionalExpression(node)) return 0;
  return 1 + Math.max(depthOf(node.whenTrue), depthOf(node.whenFalse));
}

function chainsIn(source: Source): readonly number[] {
  const file = syntaxOf(source);
  const found: number[] = [];
  const visit = (node: ts.Node, inChain: boolean): void => {
    const deep = ts.isConditionalExpression(node) && depthOf(node) > DEEPEST;
    if (deep && !inChain)
      found.push(file.getLineAndCharacterOfPosition(node.getStart()).line + 1);
    node.forEachChild((child) =>
      visit(child, deep || (inChain && ts.isConditionalExpression(node))),
    );
  };
  visit(file, false);
  return found;
}

describe('no ternary chain three deep', () => {
  it('a chain three deep is found once, two deep and a conditional type are not', () => {
    expect(
      chainsIn({
        path: 'planted.ts',
        text: [
          'type Picked<T> = T extends string ? 1 : T extends number ? 2 : T extends boolean ? 3 : 4;',
          'const two = a ? x : b ? y : z;',
          'const three = a ? x : b ? y : c ? z : w;',
        ].join('\n'),
      }),
    ).toEqual([3]);
  });

  it('no file beyond the baseline holds a chain three deep', () => {
    expect(
      heldToItsBaseline(
        'noTernaryChains',
        productionSources()
          .filter((source) => chainsIn(source).length > 0)
          .map((source) => source.path),
      ),
    ).toEqual({ added: [], fixed: [] });
  });
});
