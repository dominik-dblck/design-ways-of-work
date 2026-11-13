/**
 * - `faceOrInitials` · what a fab shows: the face, or the initials
 */
import { PersonFace } from '../../../atoms/PersonFace/index.ts';
import { FACE_FILL_SX } from '../constants/personaStripConstants.ts';
import type { PersonaStripPerson } from '../types/personaStripTypes.ts';

/** Returned, not rendered, so the main button and the roster's fabs ask one question. */
export const faceOrInitials = <Id extends string>(
  person: PersonaStripPerson<Id>,
): React.ReactElement | string =>
  person.face ? (
    // described here, unlike the rail, where the name beside it would be said twice
    <PersonFace
      face={person.face}
      name={person.initials}
      describe
      sx={FACE_FILL_SX}
    />
  ) : (
    // bare text, so the fab's own surface is the face
    person.initials
  );
