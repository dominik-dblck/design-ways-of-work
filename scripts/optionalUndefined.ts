/**
 * - `node scripts/optionalUndefined.ts <repo>` · the exact optionals' errors
 * - each optional property a value may leave undefined, found by the types, takes it
 * - its declaration written `?: T | undefined`, in place; each listed for its review
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { serviceOf } from './languageService.ts';
import { repoAt } from './repos.ts';

const ROOT = repoAt('', 0);
// assignability, an argument, and the flag's own three
const CODES = new Set([2322, 2345, 2375, 2379, 2412]);
const DEPTH = 4;

const program = serviceOf(ROOT, {
  exactOptionalPropertyTypes: true,
}).getProgram();
if (program === undefined) throw new Error(`no program in ${ROOT}`);
const checker = program.getTypeChecker();

// the smallest node the error spans
function nodeAt(
  file: ts.SourceFile,
  { start, end }: { readonly start: number; readonly end: number },
): ts.Node {
  const inside = (node: ts.Node): ts.Node | undefined =>
    node.getStart(file) <= start && node.getEnd() >= end
      ? (ts.forEachChild(node, inside) ?? node)
      : undefined;
  return inside(file) ?? file;
}

// [what is given, what it is given to]: a property's value, a variable's, an argument or a return
function sidesOf(at: ts.Node): readonly [ts.Type, ts.Type] | null {
  // an error on `return` is its value's
  const node =
    ts.isReturnStatement(at) && at.expression !== undefined
      ? at.expression
      : at;
  const { parent } = node;
  const given =
    (ts.isPropertyAssignment(parent) || ts.isVariableDeclaration(parent)) &&
    parent.name === node &&
    parent.initializer !== undefined
      ? parent.initializer
      : node;
  const declared =
    ts.isVariableDeclaration(parent) && parent.type !== undefined
      ? checker.getTypeFromTypeNode(parent.type)
      : undefined;
  const target =
    declared ??
    (ts.isExpression(given) ? checker.getContextualType(given) : undefined);
  return target === undefined
    ? null
    : [checker.getTypeAtLocation(given), target];
}

const hasUndefined = (type: ts.Type): boolean =>
  (type.isUnion() ? type.types : [type]).some(
    (one) => (one.flags & ts.TypeFlags.Undefined) !== 0,
  );
const membersOf = (type: ts.Type): readonly ts.Type[] =>
  (type.isUnion() ? type.types : [type]).filter(
    (one) => (one.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)) === 0,
  );
// the type a property's declaration writes: the checker's own adds `undefined` to any optional one
const declaredHasUndefined = (symbol: ts.Symbol): boolean =>
  (symbol.declarations ?? []).some(
    (one) =>
      (ts.isPropertySignature(one) || ts.isPropertyDeclaration(one)) &&
      one.type !== undefined &&
      hasUndefined(checker.getTypeFromTypeNode(one.type)),
  );
const isOptional = (symbol: ts.Symbol): boolean =>
  (symbol.flags & ts.SymbolFlags.Optional) !== 0;
// a value that may be written undefined: a required one whose type holds it, an optional one written so
const mayBeUndefined = (symbol: ts.Symbol): boolean =>
  isOptional(symbol)
    ? declaredHasUndefined(symbol)
    : hasUndefined(checker.getTypeOfSymbol(symbol));
const elementOf = (type: ts.Type): ts.Type | undefined =>
  checker.isArrayType(type) || checker.isTupleType(type)
    ? checker.getIndexTypeOfType(type, ts.IndexKind.Number)
    : undefined;

// each optional property of the target a source property may make undefined, at any depth
function optionalsLeft(
  [source, target]: readonly [ts.Type, ts.Type],
  depth: number,
): readonly ts.PropertySignature[] {
  if (depth > DEPTH) return [];
  return membersOf(target).flatMap((wanted) => {
    const [givenElement, wantedElement] = [
      elementOf(source),
      elementOf(wanted),
    ];
    if (givenElement !== undefined && wantedElement !== undefined)
      return optionalsLeft([givenElement, wantedElement], depth + 1);
    return checker.getPropertiesOfType(wanted).flatMap((one) => {
      const given = membersOf(source)
        .map((member) => member.getProperty(one.name))
        .find((found) => found !== undefined);
      if (given === undefined) return [];
      if (
        isOptional(one) &&
        mayBeUndefined(given) &&
        !declaredHasUndefined(one)
      )
        return (one.declarations ?? []).filter(ts.isPropertySignature);
      return optionalsLeft(
        [checker.getTypeOfSymbol(given), checker.getTypeOfSymbol(one)],
        depth + 1,
      );
    });
  });
}

// `?: T` written `?: T | undefined`; a function's or a conditional's type in parentheses
function widened(declaration: ts.PropertySignature): ts.TextChange | null {
  const typed = declaration.type;
  if (typed === undefined) return null;
  const file = declaration.getSourceFile();
  const text = typed.getText(file);
  const isBare =
    ts.isFunctionTypeNode(typed) || ts.isConditionalTypeNode(typed);
  return {
    span: { start: typed.getStart(file), length: text.length },
    newText: `${isBare ? `(${text})` : text} | undefined`,
  };
}

const errors = program
  .getSemanticDiagnostics()
  .filter((one) => CODES.has(one.code) && one.file !== undefined);
const found = new Map<ts.PropertySignature, ts.TextChange>();
for (const one of errors) {
  const file = one.file;
  if (file === undefined) continue;
  const start = one.start ?? 0;
  const sides = sidesOf(
    nodeAt(file, { start, end: start + (one.length ?? 0) }),
  );
  for (const declaration of sides === null ? [] : optionalsLeft(sides, 0)) {
    const change = widened(declaration);
    if (change !== null && !declaration.getSourceFile().isDeclarationFile)
      found.set(declaration, change);
  }
}

// each file's declarations written from its end, so an earlier offset holds; in place, a link kept
const byFile = new Map<string, ts.TextChange[]>();
for (const [one, change] of found) {
  const file = one.getSourceFile().fileName;
  byFile.set(file, [...(byFile.get(file) ?? []), change]);
}
for (const [file, changes] of byFile) {
  const text = [...changes]
    .sort((one, other) => other.span.start - one.span.start)
    .reduce(
      (now, change) =>
        now.slice(0, change.span.start) +
        change.newText +
        now.slice(change.span.start + change.span.length),
      fs.readFileSync(file, 'utf8'),
    );
  fs.writeFileSync(file, text);
}
console.log(`${errors.length} errors · ${found.size} declarations widened`);
for (const [declaration] of found) {
  const file = declaration.getSourceFile();
  const { line } = file.getLineAndCharacterOfPosition(
    declaration.getStart(file),
  );
  console.log(
    `  WIDENED · ${path.relative(ROOT, file.fileName)}:${line + 1} ${declaration.name.getText(file)}`,
  );
}
