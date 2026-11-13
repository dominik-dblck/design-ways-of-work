import fs from 'node:fs';
import path from 'node:path';
import { oneHomePerName } from '../../shared/lint/rules/oneHomePerName.ts';
import { FIXTURES, typedTester } from './ruleTester.ts';

// RuleTester lints from the filesystem's root: its cwd is `/`
const AT = path.relative('/', FIXTURES);
const OPTIONS = [
  {
    files: [`${AT}/**/*.ts`],
    ignores: [],
    entries: [`${AT}/sheet/words.ts`],
    families: [
      { files: `${AT}/docs/rules/*.ts`, names: ['rules'] },
      { files: `${AT}/docs/skills/*.ts`, names: ['skill'] },
    ],
  },
] as const;
const fixture = (file: string) => ({
  filename: file,
  code: fs.readFileSync(path.join(FIXTURES, file), 'utf8'),
  options: OPTIONS,
});
const twice = (name: string, other: string) => ({
  messageId: 'twice' as const,
  data: { name, other: `${AT}/${other}` },
});

typedTester.run('one-home-per-name', oneHomePerName, {
  valid: [
    {
      name: "an entry's API name beside a part's",
      ...fixture('sheet/words.ts'),
    },
    { name: "a family's one name", ...fixture('docs/rules/comments.ts') },
  ],
  invalid: [
    {
      name: 'a value two parts declare; a re-export declares nothing',
      ...fixture('sheet/rows/one.ts'),
      errors: [twice('ROWS', 'sheet/rows/two.ts')],
    },
    {
      name: 'a type and a value of one name, in two files',
      ...fixture('app/journeyTypes.ts'),
      errors: [twice('JourneyStep', 'tools/barrel.ts')],
    },
    {
      name: "a family's one name declared again outside it: the family's file sees the other",
      ...fixture('docs/skills/start.ts'),
      errors: [twice('skill', 'tools/skillList.ts')],
    },
    {
      name: "a family's one name declared again outside it: the other file sees the family",
      ...fixture('tools/skillList.ts'),
      errors: [
        {
          messageId: 'twice' as const,
          data: { name: 'skill', other: `family:${AT}/docs/skills/*.ts` },
        },
      ],
    },
  ],
});
