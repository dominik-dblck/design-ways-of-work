import {
  BRAND_SHAPE,
  PRODUCTION_SHAPES,
  WORDS_SHAPE,
} from '../../shared/lint/productionShapes.ts';
import { refusal, restrictedSyntax, shapeTester } from './shapeTester.ts';

const SHAPES = [...PRODUCTION_SHAPES, WORDS_SHAPE, BRAND_SHAPE];
const AT = 'app/planted.ts';
const valid = (name: string, code: string) => ({
  name,
  code,
  filename: AT,
  options: SHAPES,
});
const invalid = (
  name: string,
  { code, words }: { readonly code: string; readonly words: readonly string[] },
) => ({
  ...valid(name, code),
  errors: words.map((word) => refusal(SHAPES, word)),
});

shapeTester.run('the shapes production refuses', restrictedSyntax, {
  valid: [
    valid(
      'an env of its own, words read, a card’s brand read',
      "const row = z.strictObject({ id: z.string() });\nconst mode = process.env.NODE_ENV;\nconst title = PLANTED_WORDS.title;\nconst card = { brand: 'visa' };\nconst shown = card.brand;",
    ),
  ],
  invalid: [
    invalid('a test switch by name, by key and as text', {
      code: "const bypass = process.env.E2E_AUTH_BYPASS_COOKIE === 'true';\nconst seeded = process.env['e2e-seed'];\nconst named = 'E2E_FLAG';",
      words: ['test switch', 'test switch', 'test switch'],
    }),
    invalid('a words table declared outside a words file', {
      code: "export const PLANTED_WORDS = { title: 'Planted' } as const;\nexport { ROW_WORDS as rowWords } from './rowWords.ts';",
      words: ['Words.ts'],
    }),
    invalid('a loose schema, a loose object, zod 4’s loose and a passthrough', {
      code: 'const row = z.object({});\nconst wide = z.looseObject({});\nconst more = z.strictObject({}).loose();\nconst rest = z.strictObject({}).passthrough();',
      words: ['strict', 'strict', 'strict', 'strict'],
    }),
    invalid('a brand minted outside its home', {
      code: "const DocumentId = z.string().min(1).brand<'DocumentId'>();",
      words: ['.brand()'],
    }),
  ],
});
