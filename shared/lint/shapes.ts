/**
 * - `SHAPES` · what `no-restricted-syntax` refuses in every TypeScript file
 * - `REACT_SHAPES` · what it refuses in React code: a colour, a space, raw markup
 * - `ENTRY_SHAPES`, `PART_SHAPES` · a name an entry or a part exports, wrong case
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
];

// a string the code types: a literal, or the text between a template's holes
const typed = (pattern: string): string =>
  `:matches(Literal[value=${pattern}], TemplateElement[value.raw=${pattern}])`;

const SIDES =
  '(?:Top|Bottom|Left|Right|X|Y|Inline(?:Start|End)?|Block(?:Start|End)?)?';
const SPACE_KEYS = `/^(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|rowGap|columnGap|padding${SIDES}|margin${SIDES}|borderRadius)$/`;
// at least one px: a helper handing back the text '0' hands back a count
const A_PX_LENGTH = '/^(?=.*px)(?:0|[\\d.]+px)(?: (?:0|[\\d.]+px)){0,3}$/';
// SVG is drawn inside MUI's `SvgIcon`, never HTML
const SVG =
  'svg|path|g|circle|ellipse|rect|line|polyline|polygon|defs|linearGradient|radialGradient|stop|clipPath|mask|use|symbol|title';

const COLOUR = 'a colour is a palette role read through the theme';
const SPACE = 'a spacing or a radius is in theme units (`p: 1.75`)';
const MARKUP =
  'a page is TSX drawn with MUI, styled in `sx` and the theme (docs/rules/styling.md)';

const REACT_SHAPES: readonly Shape[] = [
  {
    selector: typed('/var\\(\\s*--/'),
    message: `In React code ${COLOUR}, never a token variable (docs/rules/styling.md).`,
  },
  {
    selector: typed('/#[\\da-fA-F]{3,8}\\b|\\b(?:rgba?|hsla?)\\(/'),
    message: `In React code ${COLOUR}, never a typed value (docs/rules/styling.md).`,
  },
  {
    // MUI 9 reads `textSecondary` on a Typography's `color` and drops `text.secondary` without a word
    selector: "JSXAttribute[name.name='color'] Literal[value=/^text\\.\\w+$/]",
    message: `In React code ${COLOUR}: a \`color\` prop takes MUI’s key, never a palette path (docs/rules/styling.md).`,
  },
  {
    // with `cssVariables` on, `theme.palette.x` is the light scheme's value; `theme.vars.palette.x` follows
    selector: [
      "MemberExpression[property.name='palette']:matches([object.name='theme'], [object.property.name='theme'], [object.callee.name='useTheme'])",
      "VariableDeclarator[init.name='theme'] > ObjectPattern > Property[key.name='palette']",
      "JSXAttribute[name.name='sx'] :function > ObjectPattern > Property[key.name='palette']",
    ].join(', '),
    message: `In React code ${COLOUR}: \`theme.vars.palette\`, never \`theme.palette\`, the light value (docs/rules/styling.md).`,
  },
  {
    selector: `Property:matches([key.name=${SPACE_KEYS}], [key.value=${SPACE_KEYS}]) :matches(Literal[value=/\\dpx/], TemplateElement[value.raw=/(?:^|\\d)px/])`,
    message: `In React code ${SPACE}, never a px string (docs/rules/styling.md).`,
  },
  {
    selector: [
      `:matches(ReturnStatement, ArrowFunctionExpression) > Literal[value=${A_PX_LENGTH}]`,
      `:matches(ReturnStatement, ArrowFunctionExpression) > ConditionalExpression > Literal[value=${A_PX_LENGTH}]`,
    ].join(', '),
    message: `In React code ${SPACE}, never a px length a helper hands back (docs/rules/styling.md).`,
  },
  {
    selector: `JSXOpeningElement[name.type='JSXIdentifier'][name.name=/^(?!(?:${SVG})$)[a-z]/]`,
    message: `No HTML element: ${MARKUP}.`,
  },
  {
    selector:
      "JSXAttribute:matches([name.name='style'], [name.name='dangerouslySetInnerHTML'])",
    message: `No inline style and no markup as a string: ${MARKUP}.`,
  },
  {
    selector:
      "TaggedTemplateExpression:matches([tag.name=/^(?:css|keyframes)$/], [tag.object.name='styled'], [tag.callee.name='styled'])",
    message: `No CSS as a string: ${MARKUP}.`,
  },
  {
    selector: 'ImportDeclaration[source.value=/\\.(?:css|scss|less)$/]',
    message: `No stylesheet: ${MARKUP}.`,
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

export { ENTRY_SHAPES, PART_SHAPES, REACT_SHAPES, SHAPES };
export type { Shape };
