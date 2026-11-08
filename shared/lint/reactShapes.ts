/**
 * - `REACT_SHAPES` · React code's shapes: a colour, a space, raw markup, a loose sx
 * - and a height, a corner, a layer by hand · `MARKUP_SHAPES` · a word, a hover text
 */
import { UPPER } from './shapes.ts';
import type { Shape } from './shapes.ts';

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

// a property by its name, written as a key or a quoted key
const keyed = (pattern: string): string =>
  `Property:matches([key.name=${pattern}], [key.value=${pattern}])`;
// a text the code types whole: a literal, or a template with no hole
const A_WORD = '/[A-Za-z]{2,}/';
const WORDS = `:matches(Literal[value=${A_WORD}], TemplateLiteral[expressions.length=0][quasis.0.value.raw=${A_WORD}])`;
const READ_PROPS =
  '/^(?:label|aria-label|ariaLabel|title|placeholder|alt|primaryLabel|cta|helper|hint|why|subtitle)$/';
const READ = [
  'JSXText',
  ':matches(JSXElement, JSXFragment) > JSXExpressionContainer >',
  ':matches(JSXElement, JSXFragment) > JSXExpressionContainer > ConditionalExpression >',
  `JSXAttribute[name.name=${READ_PROPS}] >`,
  `JSXAttribute[name.name=${READ_PROPS}] > JSXExpressionContainer >`,
  `JSXAttribute[name.name=${READ_PROPS}] > JSXExpressionContainer > ConditionalExpression >`,
];
const A_NUMBER = 'Literal[value=type(number)]';
// a height of a control; zero, a fill and a reset are layout, never this rule's
const A_HEIGHT = '/^(?:min|max)?[Hh]eight$/';
const SCALE = 'is read by name off the theme, never written by hand';
const A_CORNER = '/^border(?:(?:Top|Bottom)(?:Left|Right))?Radius$/';

const LOOK_SHAPES: readonly Shape[] = [
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

const HAND_SHAPES: readonly Shape[] = [
  {
    selector: [
      `VariableDeclarator[id.name=${UPPER}][id.typeAnnotation.typeAnnotation.typeName.name='SxProps'][init.type='ObjectExpression']`,
      `VariableDeclarator[id.name=${UPPER}] > TSSatisfiesExpression.init[expression.type='TSAsExpression'][typeAnnotation.typeName.name='SxProps']`,
    ].join(', '),
    message:
      'In React code an sx object is `as const`, checked where it is read: never typed `SxProps` nor `satisfies` it (docs/rules/styling.md).',
  },
  {
    selector: `${keyed(A_HEIGHT)} > Literal:matches([value>=1], [value=/^[1-9]\\d*px$/])`,
    message:
      'In React code a component writes no height: a control’s height is the theme’s (docs/rules/styling.md).',
  },
  {
    selector: `${keyed('/^(?:zIndex|fontWeight)$/')} :matches(${A_NUMBER}, Literal[value=/^\\d+$/], :function)`,
    message: `In React code a layer and a weight ${SCALE} (docs/rules/styling.md).`,
  },
  {
    selector: `${keyed('/^opacity$/')} :matches(${A_NUMBER}[raw!=/^[01]$/], :function)`,
    message: `In React code a fade ${SCALE}: a literal opacity is 0 or 1 (docs/rules/styling.md).`,
  },
  {
    // a token's role handed to a function is the scale itself
    selector: `${keyed(A_CORNER)} :matches(${A_NUMBER}[raw!='0'], Literal[value=/^(?!50%$)/]:not(CallExpression > Literal), :function)`,
    message: `In React code a corner is a role of the radius scale (\`radiusOf('uiRCard')\`): a literal is square (0) or round ('50%') (docs/rules/styling.md).`,
  },
];

const REACT_SHAPES: readonly Shape[] = [...LOOK_SHAPES, ...HAND_SHAPES];

// what a person reads: the scope names its markup apart, a renderer's look aside
const MARKUP_SHAPES: readonly Shape[] = [
  {
    selector: READ.map((at) =>
      at === 'JSXText' ? `JSXText[value=${A_WORD}]` : `${at} ${WORDS}`,
    ).join(', '),
    message:
      'In React code a word a person reads is a constant of a words file, never a literal in the markup (docs/rules/constants.md).',
  },
  {
    selector:
      "JSXOpeningElement[name.name=/^[a-z]/][name.name!='img'] > JSXAttribute[name.name='title']",
    message:
      'In React code hover text is a tooltip, never the native `title` (docs/rules/components.md).',
  },
];

export { MARKUP_SHAPES, REACT_SHAPES };
