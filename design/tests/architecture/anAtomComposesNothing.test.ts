/**
 * - `docs/rules/components.md`: an atom imports nothing from `app/components/` but its own folder
 * - a component joined with another is a molecule, so the import moves it up a tier
 */
import { describe, expect, it } from 'vitest';
import { componentSources, composedBy, placeOf } from './components.ts';
import type { Source } from './tree.ts';

const BUTTON = 'app/components/atoms/Button/Button.tsx';

const composedIn = (source: Source): readonly string[] =>
  placeOf(source.path)?.tier === 'atoms'
    ? composedBy(source).map(({ to }) => `${source.path} imports ${to}`)
    : [];

describe('an atom composes nothing', () => {
  it('the scan sees an atom, a molecule and an icon, and passes its own folder and a package', () => {
    expect(
      composedIn({
        path: BUTTON,
        text: [
          "import { Why } from '../Why';",
          "import { ButtonGroup } from '../ButtonGroup';",
          "import { Menu } from '../../molecules/Menu';",
          "import { Mark } from '../../icons/Mark';",
          "import { BUTTON_SIZES } from './constants/buttonConstants.ts';",
          "import MuiButton from '@mui/material/Button';",
        ].join('\n'),
      }),
    ).toEqual([
      `${BUTTON} imports app/components/atoms/Why`,
      `${BUTTON} imports app/components/atoms/ButtonGroup`,
      `${BUTTON} imports app/components/molecules/Menu`,
      `${BUTTON} imports app/components/icons/Mark`,
    ]);
  });

  it('no atom imports another component', () => {
    expect(componentSources().flatMap(composedIn)).toEqual([]);
  });
});
