/**
 * - `wordsLiveInAWordsFile` · a word a person reads lives in its words file
 * - never a key the code compares, looks up or types closed, nor a style
 */
import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';
import ts from 'typescript';
import { createRule } from './ruleKit.ts';

type Text = TSESTree.Literal | TSESTree.TemplateLiteral;
type Node = TSESTree.Node;

// a person's text reads as a sentence: its first word capitalised, the rest apart (`Preview settings`, `A template`)
const A_WORD = String.raw`[A-Za-z0-9]+(?:['’][a-z]+|-[a-z]{2,})*`;
const APART = String.raw`(?:[ ,.:;!?·…()/]+${A_WORD})`;
const FIRST = String.raw`[A-Z][a-z]+(?:['’][a-z]+|-[a-z]{2,})*`;
const PERSON_TEXT = new RegExp(
  String.raw`^(?:${FIRST}${APART}*|[A-Z]${APART}+)[ .!?…:]*$`,
);

const COMPARED = new Set(['==', '===', '!=', '!==']);
const LOOKUPS =
  /^(?:includes|has|get|indexOf|lastIndexOf|startsWith|endsWith)$/;
const KEYED = /^(?:Map|WeakMap)$/;
const MEMBERS = /^(?:Set|WeakSet)$/;
// an object a style names: `sx`, `style`, `PANEL_SX`, `rowStyles`
const STYLED = /(?:^|_)(?:sx|styles?)$|(?:Sx|Styles?)$/i;
const ELSEWHERE = new Set([
  'ImportDeclaration',
  'ExportNamedDeclaration',
  'ExportAllDeclaration',
  'ImportExpression',
  'TSLiteralType',
  'TSEnumMember',
  'TSExternalModuleReference',
  'SwitchCase',
  // markup's own (`wow/markup-syntax`): an attribute, a child
  'JSXAttribute',
  'JSXExpressionContainer',
]);

// a literal's own text; a template's with each hole a word, counted only when it reads as words apart
function textOf(node: Text): string | null {
  if (node.type === 'Literal')
    return typeof node.value === 'string' ? node.value : null;
  const text = node.quasis.map((one) => one.value.cooked ?? '').join('x');
  return node.expressions.length === 0 || text.includes(' ') ? text : null;
}

const nameOf = (node: Node | null | undefined): string =>
  node?.type === 'Identifier' ? node.name : '';

const isLookup = (node: Node): boolean =>
  node.type === 'MemberExpression' && LOOKUPS.test(nameOf(node.property));

// a key the code reads, never shows: compared, looked up, a map's key, a set's member, a property's own name
function isKey(node: Text): boolean {
  const { parent } = node;
  const grand = parent.parent;
  const isArrayIn = (type: string): boolean =>
    parent.type === 'ArrayExpression' && grand?.type === type;
  return [
    ELSEWHERE.has(parent.type),
    parent.type === 'ExpressionStatement',
    parent.type === 'BinaryExpression' && COMPARED.has(parent.operator),
    parent.type === 'Property' && parent.key === node,
    parent.type === 'MemberExpression' && parent.property === node,
    parent.type === 'CallExpression' && isLookup(parent.callee),
    isArrayIn('MemberExpression') && grand !== undefined && isLookup(grand),
    isArrayIn('NewExpression') &&
      grand?.type === 'NewExpression' &&
      MEMBERS.test(nameOf(grand.callee)),
    parent.type === 'ArrayExpression' &&
      parent.elements[0] === node &&
      grand?.parent?.type === 'NewExpression' &&
      KEYED.test(nameOf(grand.parent.callee)),
    parent.type === 'ConditionalExpression' &&
      grand?.type === 'JSXExpressionContainer',
  ].some(Boolean);
}

const namesAStyle = (at: Node): boolean =>
  (at.type === 'Property' && STYLED.test(nameOf(at.key))) ||
  (at.type === 'VariableDeclarator' && STYLED.test(nameOf(at.id)));

// a value inside an object a style names, at any depth (the program's parent is null)
const isStyled = (at: Node | null | undefined): boolean =>
  at !== undefined && at !== null && (namesAStyle(at) || isStyled(at.parent));

const isNullish = (type: ts.Type): boolean =>
  (type.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)) !== 0;

// a place its type closes to named strings (a command's name, a variant) holds a key; a style's type, a style
function isTypedAside(checker: ts.TypeChecker, at: ts.Node): boolean {
  const isText = ts.isStringLiteralLike(at) || ts.isTemplateExpression(at);
  const type = isText ? checker.getContextualType(at) : undefined;
  if (type === undefined) return false;
  const named = (type.aliasSymbol ?? type.getSymbol())?.declarations?.[0];
  if (named?.getSourceFile().fileName.includes('/csstype/') === true)
    return true;
  const parts = (type.isUnion() ? type.types : [type]).filter(
    (one) => !isNullish(one),
  );
  return parts.length > 0 && parts.every((one) => one.isStringLiteral());
}

const wordsLiveInAWordsFile = createRule({
  name: 'words-live-in-a-words-file',
  meta: {
    type: 'problem',
    docs: {
      description:
        "A word a person reads, in a component's file, is a words file's",
    },
    messages: {
      word: "`{{text}}` is a word a person reads: it lives in a words file (`{name}Words.ts`), never in a component's other files (docs/rules/constants.md).",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context, true);
    const checker = services.program?.getTypeChecker();
    const check = (node: Text): void => {
      const text = textOf(node);
      if (text === null || !PERSON_TEXT.test(text)) return;
      if (isKey(node) || isStyled(node.parent)) return;
      if (
        checker !== undefined &&
        isTypedAside(checker, services.esTreeNodeToTSNodeMap.get(node))
      )
        return;
      // a template shown as written, its holes kept
      const shown = context.sourceCode.getText(node).slice(1, -1);
      context.report({ node, messageId: 'word', data: { text: shown } });
    };
    return { Literal: check, TemplateLiteral: check };
  },
});

export { wordsLiveInAWordsFile };
