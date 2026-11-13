'use client';

/**
 * - `SideNavPersonMenu` · the rail's foot: who is signed in, what they can change
 */
import Menu from '@mui/material/Menu';
import { Divider } from '../../../atoms/Divider/index.ts';
import {
  MENU_ORIGIN,
  MENU_SLOTS,
} from '../constants/sideNavPersonMenuConstants.ts';
import { useSideNavPersonMenu } from '../hooks/useSideNavPersonMenu.ts';
import type {
  SideNavAppearance,
  SideNavPerson,
  SideNavTestIds,
  SideNavWords,
} from '../types/sideNavTypes.ts';
import { personHeadOf } from '../utils/sideNavPersonHeadUtils.tsx';
import { SideNavModePicker } from './SideNavModePicker.tsx';
import { SideNavPersonTrigger } from './SideNavPersonTrigger.tsx';
import { SideNavSignOut } from './SideNavSignOut.tsx';

type SideNavPersonMenuProps = {
  readonly person: SideNavPerson;
  readonly collapsed: boolean;
  readonly appearance: SideNavAppearance | undefined;
  readonly onSignOut: (() => Promise<string | null>) | undefined;
  readonly words: SideNavWords;
  readonly testIds: SideNavTestIds;
};

/** No appearance handed, no APPEARANCE · no sign-out handed, no Sign out. */
export function SideNavPersonMenu(
  props: SideNavPersonMenuProps,
): React.ReactElement {
  const { person, appearance, onSignOut, words, testIds } = props;
  const menu = useSideNavPersonMenu(onSignOut, words.signOutFailed);
  return (
    <>
      <SideNavPersonTrigger
        person={person}
        collapsed={props.collapsed}
        onOpen={menu.open}
        testIds={testIds}
      />
      <Menu
        open={menu.anchor !== null}
        anchorEl={menu.anchor}
        onClose={menu.close}
        anchorOrigin={MENU_ORIGIN.anchor}
        transformOrigin={MENU_ORIGIN.transform}
        slotProps={MENU_SLOTS}
      >
        {personHeadOf(person, testIds.menuName)}
        {appearance && (
          <SideNavModePicker
            appearance={appearance}
            headId={menu.appearanceId}
            words={words}
          />
        )}
        {onSignOut && <Divider />}
        {onSignOut && (
          <SideNavSignOut menu={menu} words={words} testId={testIds.signOut} />
        )}
      </Menu>
    </>
  );
}
