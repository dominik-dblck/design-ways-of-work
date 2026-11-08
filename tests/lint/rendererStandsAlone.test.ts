import path from 'node:path';
import { rendererStandsAlone } from '../../shared/lint/rules/rendererStandsAlone.ts';
import { FIXTURES, ruleTester, typedTester } from './ruleTester.ts';

// the build side's shape: the app's components, and a phone drawn inside the app
const ROOTS = [
  {
    components: ['app/components', 'app/renderers/mobile/components'],
    renderers: [{ folder: 'app/renderers/mobile', app: 'app' }],
  },
] as const;
const ROW = 'app/renderers/mobile/components/molecules/Row/Row.tsx';
const PHONE = 'app/components/molecules/Phone/Phone.tsx';
const at = (filename: string, lines: readonly string[]) => ({
  filename,
  code: lines.join('\n'),
  options: ROOTS,
});
const back = (line: number) => ({ messageId: 'back' as const, line });
const past = (line: number) => ({ messageId: 'past' as const, line });

ruleTester.run('renderer-stands-alone', rendererStandsAlone, {
  valid: [
    {
      name: 'a renderer composes its own components, reads its own styles and a package',
      ...at(ROW, [
        "import { DOT } from '../../atoms/Dot/index.ts';",
        "import { INK } from '../../../styles/mobileInk.ts';",
        "import { useState } from 'react';",
      ]),
    },
    {
      name: 'a renderer reads a package outside its app, as the app reads one',
      ...at(ROW, [
        "import { BRANDS } from '../../../../../../packages/domain/model/brands.ts';",
      ]),
    },
    {
      name: "the app enters a renderer at a component's barrel, whatever its tier, by file or by folder",
      ...at(PHONE, [
        "import { HOME } from '../../../renderers/mobile/components/templates/Home/index.ts';",
        "import { ROW } from '../../../renderers/mobile/components/molecules/Row';",
        "import { MARK } from '../../atoms/Mark/index.ts';",
      ]),
    },
    {
      name: 'no renderer named: nothing is read',
      ...at(ROW, [
        "import { MARK } from '../../../../../components/atoms/Mark/index.ts';",
      ]),
      options: [{ components: ['app/components'], renderers: [] }],
    },
  ],
  invalid: [
    {
      name: "a renderer imports the app's components, styles and hooks",
      ...at(ROW, [
        "import { MARK } from '../../../../../components/atoms/Mark/index.ts';",
        "import { INK } from '../../../../../styles/ink.ts';",
        "import { useBoard } from '../../../../../hooks/useBoard.ts';",
      ]),
      errors: [back(1), back(2), back(3)],
    },
    {
      name: 'a renderer exports from the app, and loads it on demand',
      ...at(ROW, [
        "export { MARK } from '../../../../../components/atoms/Mark/index.ts';",
        "export * from '../../../../../utils/text.ts';",
        "export const load = () => import('../../../../../components/atoms/Mark/index.ts');",
      ]),
      errors: [back(1), back(2), back(3)],
    },
    {
      name: 'another renderer is outside this one too',
      ...at(ROW, [
        "import { DOT } from '../../../../web/components/atoms/Dot/index.ts';",
      ]),
      options: [
        {
          components: [
            'app/components',
            'app/renderers/mobile/components',
            'app/renderers/web/components',
          ],
          renderers: [
            { folder: 'app/renderers/mobile', app: 'app' },
            { folder: 'app/renderers/web', app: 'app' },
          ],
        },
      ],
      errors: [back(1)],
    },
    {
      name: "the app reaches past a barrel, into a component's part, a renderer's styles",
      ...at(PHONE, [
        "import { HOME } from '../../../renderers/mobile/components/templates/Home/Home.tsx';",
        "import { ROWS } from '../../../renderers/mobile/components/molecules/Row/constants/rowConstants.ts';",
        "import { INK } from '../../../renderers/mobile/styles/mobileInk.ts';",
      ]),
      errors: [past(1), past(2), past(3)],
    },
  ],
});

// an alias resolved by the repository's tsconfig: RuleTester lints from `/`
const AT = path.relative('/', FIXTURES);

const RESOLVED = [
  {
    components: [
      `${AT}/app/components`,
      `${AT}/app/renderers/mobile/components`,
    ],
    renderers: [{ folder: `${AT}/app/renderers/mobile`, app: `${AT}/app` }],
  },
] as const;

typedTester.run('renderer-stands-alone, resolved', rendererStandsAlone, {
  valid: [
    {
      name: "an alias to a renderer's component lands on its barrel",
      filename: 'app/components/molecules/Field/Field.ts',
      code: "import { HOME } from '@fixtures/app/renderers/mobile/components/templates/Home';",
      options: RESOLVED,
    },
  ],
  invalid: [
    {
      name: "an alias past a renderer's barrel",
      filename: 'app/components/molecules/Field/Field.ts',
      code: "import { HOME } from '@fixtures/app/renderers/mobile/components/templates/Home/Home.ts';",
      options: RESOLVED,
      errors: [past(1)],
    },
    {
      name: "a renderer's alias into its app is refused, a package's is read",
      filename: 'app/renderers/mobile/components/templates/Home/Home.ts',
      code: "import { BRANDS } from '@fixtures/packages/domain/model/brands.ts';\nimport { MARK } from '@fixtures/app/components/atoms/Mark/index.ts';",
      options: RESOLVED,
      errors: [back(2)],
    },
  ],
});
