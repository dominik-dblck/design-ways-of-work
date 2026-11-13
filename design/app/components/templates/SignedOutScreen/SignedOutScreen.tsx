/**
 * - `SignedOutScreen` · a signed-out page: the card it is handed, centred
 */
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { SIGNED_OUT_SCREEN_SX } from './constants/signedOutScreenConstants.ts';

export type SignedOutScreenProps = {
  readonly children: ReactNode;
};

export function SignedOutScreen({
  children,
}: SignedOutScreenProps): React.ReactElement {
  return <Box sx={SIGNED_OUT_SCREEN_SX}>{children}</Box>;
}
