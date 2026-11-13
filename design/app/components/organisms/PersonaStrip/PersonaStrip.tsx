'use client';

/**
 * - `PersonaStrip` · a floating dial to be anyone on the roster it is handed
 * - a pick closes the dial and goes to the caller; nobody handed, nothing drawn
 */
import { useState } from 'react';
import { PersonaStripDial } from './components/PersonaStripDial.tsx';
import { PERSONA_STRIP_TEST_IDS } from './constants/personaStripIdConstants.ts';
import { PERSONA_STRIP_WORDS } from './constants/personaStripWords.ts';
import type { PersonaStripProps } from './types/personaStripTypes.ts';

/** The dial's fold is its own · who reads and who they may be are the caller's. */
export function PersonaStrip<Id extends string>({
  people,
  current,
  onSwitch,
  pending = false,
  words = PERSONA_STRIP_WORDS,
  testIds = PERSONA_STRIP_TEST_IDS,
}: PersonaStripProps<Id>): React.ReactElement | null {
  const [isOpen, setIsOpen] = useState(false);
  if (people.length === 0) return null;
  return (
    <PersonaStripDial
      people={people}
      current={current}
      pending={pending}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onSwitch={(id) => {
        setIsOpen(false);
        onSwitch(id);
      }}
      words={words}
      testIds={testIds}
    />
  );
}
