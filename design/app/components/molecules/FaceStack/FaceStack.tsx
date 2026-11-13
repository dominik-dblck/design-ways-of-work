/**
 * - `FaceStack` · up to three faces, overlapping, and a count of the rest
 */
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import { Hint } from '../../atoms/Hint/index.ts';
import { PersonFace } from '../../atoms/PersonFace/index.ts';
import { FACE_STACK_SHOWN } from './constants/faceStackConstants.ts';
import type { FaceStackPerson } from './types/faceStackTypes.ts';
import { faceStackSxOf } from './utils/faceStackSxUtils.ts';

/** Faded, the stack reads fainter · people who may hold it, nobody holding it yet. */
export type FaceStackProps = {
  readonly people: readonly FaceStackPerson[];
  readonly faded?: boolean;
  readonly testId?: string;
  readonly faceTestId?: string | undefined;
};

/** Each name on hover · the count's hover names everyone it stands for. */
export function FaceStack({
  people,
  faded = false,
  testId,
  faceTestId,
}: FaceStackProps): React.ReactElement {
  const rest = people
    .slice(FACE_STACK_SHOWN)
    .map((person) => person.name)
    .join(', ');
  return (
    <AvatarGroup
      data-testid={testId}
      max={FACE_STACK_SHOWN + 1}
      total={people.length}
      renderSurplus={(more) => (
        <Hint title={rest}>
          <Box component="span">+{more}</Box>
        </Hint>
      )}
      sx={faceStackSxOf(faded)}
    >
      {people.slice(0, FACE_STACK_SHOWN).map((person) => (
        <Hint key={person.id} title={person.name}>
          <PersonFace
            face={person.face}
            name={person.name}
            describe
            testId={faceTestId}
          />
        </Hint>
      ))}
    </AvatarGroup>
  );
}
