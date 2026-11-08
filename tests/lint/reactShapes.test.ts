import { MARKUP_SHAPES, REACT_SHAPES } from '../../shared/lint/reactShapes.ts';
import { SHAPES } from '../../shared/lint/shapes.ts';
import { refusal, restrictedSyntax, shapeTester } from './shapeTester.ts';

const OPTIONS = [...SHAPES, ...REACT_SHAPES];
const MARKUP = [...MARKUP_SHAPES];
const AT = 'app/planted.tsx';
const refused = (word: string): { readonly message: string } =>
  refusal([...REACT_SHAPES, ...MARKUP_SHAPES], word);
const valid = (name: string, code: string) => ({
  name,
  code,
  filename: AT,
  options: OPTIONS,
});
const invalid = (
  name: string,
  {
    code,
    words,
    options = OPTIONS,
  }: {
    readonly code: string;
    readonly words: readonly string[];
    readonly options?: typeof OPTIONS;
  },
) => ({ ...valid(name, code), options, errors: words.map(refused) });

shapeTester.run('the shapes React code refuses', restrictedSyntax, {
  valid: [
    valid(
      'an sx as const, and a function of the theme typed',
      'const PLAIN_SX = { p: 1 } as const;\nconst MARK_SX: SxProps<Theme> = (theme) => ({ p: theme.spacing(1) });',
    ),
    valid(
      'a layout height, and the scale by name',
      "const ROW_SX = { minHeight: 0, height: '100%', zIndex: 'modal', fontWeight: 'fontWeightBold', opacity: 0, borderRadius: '50%' } as const;",
    ),
    valid(
      'a corner by its role, square or round',
      "const CARD_SX = { borderRadius: radiusOf('uiRCard'), borderTopLeftRadius: lengthOf('uiRTag'), '& img': { borderRadius: 0 }, '& i': { borderRadius: '50%' } } as const;",
    ),
  ],
  invalid: [
    invalid('an sx typed', {
      code: 'const TYPED_SX: SxProps<Theme> = { p: 1 };',
      words: ['as const'],
    }),
    invalid('an sx satisfied', {
      code: 'const SATISFIED_SX = { p: 1 } as const satisfies SxProps<Theme>;',
      words: ['as const'],
    }),
    invalid('a height, as a number and as px', {
      code: "const ROW_SX = { height: 28, minHeight: '40px' } as const;",
      words: ['no height', 'no height'],
    }),
    invalid('a layer and a weight by hand, and the theme read by hand', {
      code: "const TOP_SX = { zIndex: 1300, fontWeight: '600', '& b': { zIndex: (theme) => theme.zIndex.modal } } as const;",
      words: ['a layer', 'a layer', 'a layer'],
    }),
    invalid('a fade between the two', {
      code: 'const DIM_SX = { opacity: 0.5 } as const;',
      words: ['a fade'],
    }),
    invalid('a corner by number, by word and by the theme read by hand', {
      code: "const CARD_SX = { borderRadius: 2, '& img': { borderRadius: 'inherit' }, '& b': { borderTopLeftRadius: (theme) => theme.shape.borderRadius } } as const;",
      words: ['a corner', 'a corner', 'a corner'],
    }),
  ],
});

shapeTester.run('the shapes markup refuses', restrictedSyntax, {
  valid: [
    {
      ...valid(
        'words read off a constant, a mark, and a tooltip',
        "const Planted = () => <Tooltip title={HINT}><Button label={WORDS.save}>{WORDS.title}{'·'}</Button></Tooltip>;",
      ),
      options: MARKUP,
    },
  ],
  invalid: [
    invalid('text, a string child and a ternary of two', {
      code: "const Planted = () => <Box>Save the draft{'Save'}{isOpen ? 'Hide' : 'Show'}</Box>;",
      options: MARKUP,
      words: ['a word', 'a word', 'a word', 'a word'],
    }),
    invalid('a prop a person reads', {
      code: 'const Planted = () => <Field label="Name" placeholder={isNew ? \'Type\' : WORDS.edit} />;',
      options: MARKUP,
      words: ['a word', 'a word'],
    }),
    invalid('a native hover text', {
      code: 'const Planted = () => <svg title={MARK} />;',
      options: MARKUP,
      words: ['hover text'],
    }),
  ],
});
