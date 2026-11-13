'use client';

/**
 * - `SideNavSignOut` · Sign out, and the line that says why it did not go through
 */
import { Glyph } from '../../../atoms/Glyph/index.ts';
import { ListItem } from '../../../atoms/ListItem/index.ts';
import { Text } from '../../../atoms/Text/index.ts';
import {
  SIGN_OUT_REFUSED_SX,
  SIGN_OUT_SX,
} from '../constants/sideNavPersonMenuConstants.ts';
import type { SideNavPersonMenuState } from '../hooks/useSideNavPersonMenu.ts';
import type { SideNavWords } from '../types/sideNavTypes.ts';

/** Greyed while it goes, so it cannot be pressed twice. */
export function SideNavSignOut({
  menu,
  words,
  testId,
}: {
  readonly menu: SideNavPersonMenuState;
  readonly words: SideNavWords;
  readonly testId?: string | undefined;
}): React.ReactElement {
  return (
    <>
      <ListItem
        dense
        testId={testId}
        onClick={menu.leave}
        disabled={menu.leaving}
        icon={<Glyph name="logOut" size="medium" />}
        sx={SIGN_OUT_SX}
      >
        {menu.leaving ? words.signingOut : words.signOut}
      </ListItem>
      {menu.refused === null ? null : (
        <Text tone="danger" alert sx={SIGN_OUT_REFUSED_SX}>
          {menu.refused}
        </Text>
      )}
    </>
  );
}
