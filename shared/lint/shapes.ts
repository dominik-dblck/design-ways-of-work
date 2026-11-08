/**
 * - `SHAPES` · what `no-restricted-syntax` refuses in every TypeScript file
 * - `ENTRY_SHAPES`, `PART_SHAPES` · a name an entry or a part exports, wrong case
 * - `UPPER`, `Shape` · an UPPER_SNAKE name, and one refused shape with its message
 */
interface Shape {
  readonly selector: string;
  readonly message: string;
}

const DECLARED = [
  'VariableDeclarator > Identifier.id',
  'FunctionDeclaration > Identifier.id',
  'ClassDeclaration > Identifier.id',
  'TSTypeAliasDeclaration > Identifier.id',
  'TSInterfaceDeclaration > Identifier.id',
  'TSEnumDeclaration > Identifier.id',
].join(', ');
const BOUND = [
  'VariableDeclarator > Identifier.id',
  'FunctionDeclaration > Identifier.id',
  ':function > Identifier.params',
  ':function > AssignmentPattern > Identifier.left',
  'ArrayPattern > Identifier',
  'RestElement > Identifier.argument',
  // a shorthand `{ data }` keeps its source's name: only a rename `{ rows: data }` names it here
  'ObjectPattern > Property[shorthand=false] > Identifier.value',
].join(', ');
const A_COUNT_ALONE =
  '/^(?:THE_)?(?:ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE|TEN|ELEVEN|TWELVE|THIRTEEN|FOURTEEN|FIFTEEN|SIXTEEN|SEVENTEEN|EIGHTEEN|NINETEEN|TWENTY|THIRTY|FORTY|FIFTY|SIXTY|SEVENTY|EIGHTY|NINETY|HUNDRED|THOUSAND)$/';
// `bar` is no placeholder here: the approval's bar is a thing of the model
const A_PLACEHOLDER =
  '/^(?:data|info|obj|tmp|temp|val|foo|baz|stuff|things?|res|ret|items?|results?|values?|arr|list|str|num|el|elem)$/';

const SHAPES: readonly Shape[] = [
  {
    selector: `:matches(${DECLARED})[name=${A_COUNT_ALONE}]`,
    message:
      'A name says what it holds, never only how many: `DOCUMENT_STATES`, not `THE_SEVEN` (docs/rules/names.md).',
  },
  {
    selector: `:matches(${BOUND})[name=${A_PLACEHOLDER}]`,
    message:
      'A name says what it holds or does, never a placeholder: `rates`, not `list` (docs/rules/names.md).',
  },
  {
    selector:
      ':function[params.length>2]:not(CallExpression > :function, NewExpression > :function)',
    message:
      'Past two parameters a function takes one object (docs/rules/functions.md); a callback keeps its caller’s shape.',
  },
  {
    selector:
      'ConditionalExpression > ConditionalExpression > ConditionalExpression',
    message:
      'No ternary chain three deep (docs/rules/functions.md): name the branches, or a lookup.',
  },
  {
    selector: 'ExportNamedDeclaration[source][specifiers.length=0]',
    message:
      'An export names what it takes, never an empty clause (docs/rules/names.md).',
  },
  {
    selector: "TSPropertySignature[key.name='__brand']",
    message:
      'A brand is a zod brand declared in its home, never `string & { __brand }` (docs/rules/types.md).',
  },
];

const CAMEL = '/^[a-z][A-Za-z0-9]*$/';
const UPPER = '/^[A-Z][A-Z0-9_]*$/';
const A_FUNCTION = '/^(?:ArrowFunctionExpression|FunctionExpression)$/';
const EXPORTED =
  "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.type='Identifier']";

// the name outside reads is the exported one: `TERMS as terms` is an entry's `terms`
const ENTRY_SHAPES: readonly Shape[] = [
  {
    selector: [
      `ExportNamedDeclaration[exportKind='value'] > ExportSpecifier[exportKind='value'][exported.name!=${CAMEL}]`,
      `${EXPORTED}[id.name!=${CAMEL}]`,
      `ExportNamedDeclaration > :matches(FunctionDeclaration, ClassDeclaration)[id.name!=${CAMEL}]`,
    ].join(', '),
    message: "An entry's API names are camelCase (docs/rules/names.md).",
  },
];

const PART_SHAPES: readonly Shape[] = [
  {
    selector: `${EXPORTED}[init.type!=${A_FUNCTION}][id.name!=${UPPER}]`,
    message: 'A value a part exports is UPPER_SNAKE (docs/rules/names.md).',
  },
  {
    selector: [
      `${EXPORTED}[init.type=${A_FUNCTION}][id.name!=${CAMEL}]`,
      `ExportNamedDeclaration > FunctionDeclaration[id.name!=${CAMEL}]`,
    ].join(', '),
    message: "A part's function is camelCase (docs/rules/names.md).",
  },
];

export { ENTRY_SHAPES, PART_SHAPES, SHAPES, UPPER };
export type { Shape };
