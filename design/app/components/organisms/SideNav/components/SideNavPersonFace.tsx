'use client';

/**
 * - `SideNavPersonFace` · the signed-in person's face, a control tall
 */
import { PersonFace } from '../../../atoms/PersonFace/index.ts';
import { FACE_SX } from '../constants/sideNavPersonMenuConstants.ts';
import type { SideNavPerson } from '../types/sideNavTypes.ts';

/** The same face on the rail and at the head of the menu. */
export function SideNavPersonFace({
  person,
}: {
  readonly person: SideNavPerson;
}): React.ReactElement {
  return (
    <PersonFace
      face={person.image}
      name={person.initials}
      describe={false}
      sx={FACE_SX}
    />
  );
}
