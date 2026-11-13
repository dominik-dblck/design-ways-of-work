'use client';

/**
 * - `SideNavPersonTrigger` · the rail's foot: face, name, email; opens the menu
 */
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { Text } from '../../../atoms/Text/index.ts';
import {
  RAIL_EMAIL_SX,
  RAIL_LINES_SX,
  RAIL_NAME_SX,
  TRIGGER_SX,
} from '../constants/sideNavPersonRailConstants.ts';
import { RAIL_LABEL_WIDE } from '../constants/sideNavRailConstants.ts';
import { GLYPH_BOX_SX } from '../constants/sideNavRailSxConstants.ts';
import type { SideNavPerson, SideNavTestIds } from '../types/sideNavTypes.ts';
import { SideNavCollapsible } from './SideNavCollapsible.tsx';
import { SideNavPersonFace } from './SideNavPersonFace.tsx';

type SideNavPersonTriggerProps = {
  readonly person: SideNavPerson;
  readonly collapsed: boolean;
  readonly onOpen: (anchor: HTMLElement) => void;
  readonly testIds: SideNavTestIds;
};

/** A narrow rail keeps the face alone · its name says who. */
export function SideNavPersonTrigger({
  person,
  collapsed,
  onOpen,
  testIds,
}: SideNavPersonTriggerProps): React.ReactElement {
  return (
    <ButtonBase
      data-testid={testIds.trigger}
      onClick={(event) => onOpen(event.currentTarget)}
      aria-haspopup="menu"
      aria-label={person.name}
      sx={TRIGGER_SX}
    >
      <Box sx={GLYPH_BOX_SX}>
        <SideNavPersonFace person={person} />
      </Box>
      <SideNavCollapsible collapsed={collapsed} width={RAIL_LABEL_WIDE}>
        <Box sx={RAIL_LINES_SX}>
          <Text testId={testIds.railName} variant="body2" sx={RAIL_NAME_SX}>
            {person.name}
          </Text>
          {person.email === null ? null : (
            <Text
              testId={testIds.railEmail}
              variant="caption"
              tone="secondary"
              sx={RAIL_EMAIL_SX}
            >
              {person.email}
            </Text>
          )}
        </Box>
      </SideNavCollapsible>
    </ButtonBase>
  );
}
