/**
 * - `personHeadOf` · the menu's head: the face and the name
 * - built as the element itself, so the menu's list sees it as its first item
 */
import Box from '@mui/material/Box';
import { Text } from '../../../atoms/Text/index.ts';
import { SideNavPersonFace } from '../components/SideNavPersonFace.tsx';
import {
  PERSON_HEAD_SX,
  PERSON_NAME_SX,
} from '../constants/sideNavPersonMenuConstants.ts';
import type { SideNavPerson } from '../types/sideNavTypes.ts';

export const personHeadOf = (
  person: SideNavPerson,
  testId: string,
): React.ReactElement => (
  <Box sx={PERSON_HEAD_SX}>
    <SideNavPersonFace person={person} />
    <Text testId={testId} variant="body2" sx={PERSON_NAME_SX}>
      {person.name}
    </Text>
  </Box>
);
