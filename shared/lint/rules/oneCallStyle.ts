/**
 * - `oneCallStyle` · a file that takes one object anywhere takes it everywhere
 * - two or more positions beside one object are refused; one argument passes
 */
import ts from 'typescript';
import { createRule, syntaxOf } from './ruleKit.ts';

// the dev side's `operation(at: { … })`: a lone parameter named so is one object
const AN_OBJECT_NAME = 'at';

type Takes = 'object' | 'positions' | 'one';

interface Exported {
  readonly name: ts.Identifier;
  readonly takes: Takes;
}

const isExported = (statement: ts.Statement): boolean =>
  ts.canHaveModifiers(statement) &&
  (ts.getModifiers(statement) ?? []).some(
    (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
  );

// the function an exported statement declares, with its name · none for anything else
function exportedFunctionOf(statement: ts.Statement): {
  readonly name: ts.Identifier;
  readonly fn: ts.SignatureDeclaration;
} | null {
  if (!isExported(statement)) return null;
  if (ts.isFunctionDeclaration(statement) && statement.name !== undefined)
    return { name: statement.name, fn: statement };
  if (!ts.isVariableStatement(statement)) return null;
  const [declared] = statement.declarationList.declarations;
  return declared === undefined ? null : functionOf(declared);
}

// a variable holding a function, with its name
function functionOf(declared: ts.VariableDeclaration): {
  readonly name: ts.Identifier;
  readonly fn: ts.SignatureDeclaration;
} | null {
  const { initializer } = declared;
  if (
    !ts.isIdentifier(declared.name) ||
    initializer === undefined ||
    !(ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer))
  )
    return null;
  return { name: declared.name, fn: initializer };
}

// a lone parameter is one object when destructured, typed as a literal, or named `at`
function isOneObject(parameter: ts.ParameterDeclaration): boolean {
  const { type } = parameter;
  return (
    ts.isObjectBindingPattern(parameter.name) ||
    parameter.name.getText() === AN_OBJECT_NAME ||
    (type !== undefined &&
      (ts.isTypeLiteralNode(type) ||
        (ts.isIntersectionTypeNode(type) &&
          type.types.some(ts.isTypeLiteralNode))))
  );
}

function takesOf(parameters: readonly ts.ParameterDeclaration[]): Takes {
  if (parameters.length >= 2) return 'positions';
  const [only] = parameters;
  return only !== undefined && isOneObject(only) ? 'object' : 'one';
}

const exportsOf = (file: ts.SourceFile): readonly Exported[] =>
  file.statements.flatMap((statement) => {
    const found = exportedFunctionOf(statement);
    return found === null
      ? []
      : [{ name: found.name, takes: takesOf(found.fn.parameters) }];
  });

const oneCallStyle = createRule<[], 'positions'>({
  name: 'one-call-style',
  meta: {
    type: 'suggestion',
    docs: { description: 'A file takes one object everywhere or nowhere' },
    messages: {
      positions:
        '`{{name}}` takes its values by position beside `{{object}}`, which takes one object: a file takes one style (docs/rules/functions.md).',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Program() {
        const file = syntaxOf(context);
        const exported = exportsOf(file);
        const object = exported.find((one) => one.takes === 'object');
        if (object === undefined) return;
        for (const one of exported.filter((it) => it.takes === 'positions'))
          context.report({
            loc: context.sourceCode.getLocFromIndex(one.name.getStart(file)),
            messageId: 'positions',
            data: { name: one.name.text, object: object.name.text },
          });
      },
    };
  },
});

export { oneCallStyle };
