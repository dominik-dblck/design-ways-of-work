/**
 * - `docs/rules/functions.md`: past two parameters a function takes one object
 */
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { heldToItsBaseline } from './baseline.ts';
import { syntaxOf } from './fileSyntax.ts';
import { productionSources } from './tree.ts';
import type { Source } from './tree.ts';

const isCallback = (node: ts.SignatureDeclaration): boolean => {
  if (!ts.isArrowFunction(node) && !ts.isFunctionExpression(node)) return false;
  const { parent } = node;
  return (
    (ts.isCallExpression(parent) || ts.isNewExpression(parent)) &&
    (parent.arguments ?? []).some((argument) => argument === node)
  );
};

const nameOf = (node: ts.SignatureDeclaration): string => {
  if (node.name !== undefined) return node.name.getText();
  const { parent } = node;
  if (ts.isVariableDeclaration(parent) || ts.isPropertyAssignment(parent))
    return parent.name.getText();
  return '(anonymous)';
};

function pastTwoIn(source: Source): readonly string[] {
  const tree = syntaxOf(source);
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionLike(node) && !isCallback(node)) {
      const count = node.parameters.filter(
        (parameter) =>
          !(ts.isIdentifier(parameter.name) && parameter.name.text === 'this'),
      ).length;
      if (count > 2) {
        const { line } = tree.getLineAndCharacterOfPosition(node.getStart());
        found.push(`${source.path}:${line + 1} · ${nameOf(node)} (${count})`);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return found;
}

describe('arguments past two are one object', () => {
  it('a declaration, an arrow and a signature are found; a callback and an object are not', () => {
    expect(
      pastTwoIn({
        path: 'planted.ts',
        text: [
          'function three(a: A, b: B, c: C) {}',
          'const arrow = (a: A, b: B, c: C) => a;',
          'type Port = { exclusive(lock: L, run: R, at: T): void };',
          'const sum = list.reduce((total, item, index) => total, 0);',
          'const two = ({ a, b, c }: ABC, d: D) => a;',
        ].join('\n'),
      }),
    ).toEqual([
      'planted.ts:1 · three (3)',
      'planted.ts:2 · arrow (3)',
      'planted.ts:3 · exclusive (3)',
    ]);
  });

  it('no function beyond the baseline takes more than two positional arguments', () => {
    expect(
      heldToItsBaseline(
        'argumentsPastTwoAreOneObject',
        productionSources().flatMap(pastTwoIn),
      ),
    ).toEqual({ added: [], fixed: [] });
  });
});
