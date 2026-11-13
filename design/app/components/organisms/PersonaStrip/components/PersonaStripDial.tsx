'use client';

/**
 * - `PersonaStripDial` · the reader's face, opening on a click to the roster
 */
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {
  DIAL_FAB_SX,
  DIAL_PLACE_SX,
} from '../constants/personaStripConstants.ts';
import type {
  PersonaStripProps,
  PersonaStripTestIds,
  PersonaStripWords,
} from '../types/personaStripTypes.ts';
import { faceOrInitials } from '../utils/personaStripFaceUtils.tsx';
import { actionSlotsOf } from '../utils/personaStripSlotsUtils.ts';

type PersonaStripDialProps<Id extends string> = Omit<
  PersonaStripProps<Id>,
  'words' | 'testIds'
> & {
  readonly isOpen: boolean;
  readonly onOpenChange: (next: boolean) => void;
  readonly words: PersonaStripWords;
  readonly testIds: PersonaStripTestIds;
};

/** A hover or a focus opens nothing; a mouse leaving closes nothing. */
export function PersonaStripDial<Id extends string>(
  props: PersonaStripDialProps<Id>,
): React.ReactElement {
  const { current, testIds } = props;
  return (
    <SpeedDial
      data-testid={testIds.dial}
      ariaLabel={props.words.dial}
      sx={DIAL_PLACE_SX}
      open={props.isOpen}
      onOpen={(_, reason) => {
        if (reason === 'toggle') props.onOpenChange(true);
      }}
      onClose={(_, reason) => {
        if (reason !== 'mouseLeave') props.onOpenChange(false);
      }}
      icon={faceOrInitials(current)}
      FabProps={{ disabled: props.pending, size: 'medium', sx: DIAL_FAB_SX }}
    >
      {props.people.map((person) => (
        <SpeedDialAction
          key={person.id}
          data-testid={testIds.person(person.id)}
          slotProps={actionSlotsOf({
            label: person.name,
            me: person.id === current.id,
          })}
          icon={faceOrInitials(person)}
          onClick={() => props.onSwitch(person.id)}
        />
      ))}
    </SpeedDial>
  );
}
